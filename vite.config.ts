import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

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
                const { message, history, systemInstruction } = JSON.parse(body);

                const contents = [
                  ...(history || []).map((msg: { role: string; text: string }) => ({
                    role: msg.role === 'user' ? 'user' : 'model',
                    parts: [{ text: msg.text }],
                  })),
                  { role: 'user', parts: [{ text: message }] },
                ];

                const geminiRes = await fetch(
                  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                  {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      system_instruction: systemInstruction
                        ? { parts: [{ text: systemInstruction }] }
                        : undefined,
                      contents,
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
