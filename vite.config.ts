import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { SYSTEM_INSTRUCTION, MAX_OUTPUT_TOKENS, MAX_HISTORY_MESSAGES, MAX_MESSAGE_LENGTH } from './api/system-prompt';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
                publicDir: 'assets',
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'gemini-api-proxy',
          configureServer(server) {

            server.middlewares.use('/api/chat', async (req, res) => {
              if (req.method !== 'POST') {
                res.statusCode = 405;
                res.end(JSON.stringify({ error: 'Method not allowed' }));
                return;
              }

              const apiKey = env.GEMINI_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY not set in .env.local' }));
                return;
              }

              let body = '';
              for await (const chunk of req) {
                body += chunk;
              }

              try {
                const { message, history } = JSON.parse(body);
                const sanitizedMessage = (typeof message === 'string' ? message : '').slice(0, MAX_MESSAGE_LENGTH);

                const safeHistory = Array.isArray(history)
                  ? history.slice(-MAX_HISTORY_MESSAGES).map((msg: { role: string; text: string }) => ({
                      role: msg.role === 'user' ? 'user' : 'model',
                      parts: [{ text: typeof msg.text === 'string' ? msg.text.slice(0, MAX_MESSAGE_LENGTH) : '' }],
                    }))
                  : [];

                const contents = [
                  ...safeHistory,
                  { role: 'user', parts: [{ text: sanitizedMessage }] },
                ];

                const geminiRes = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
                      contents,
                      generationConfig: {
                        maxOutputTokens: MAX_OUTPUT_TOKENS,
                        temperature: 0.7,
                      },
                    }),
                  }
                );

                const data = await geminiRes.json();
                if (!geminiRes.ok) {
                  res.statusCode = geminiRes.status;
                  res.end(JSON.stringify({ error: data }));
                  return;
                }

                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ text }));
              } catch (err) {
                console.error('Gemini proxy error:', err);
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Internal server error' }));
              }
            });
          },
        },
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'import.meta.env.VITE_SHEETS_CSV_URL': JSON.stringify(env.VITE_SHEETS_CSV_URL)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
