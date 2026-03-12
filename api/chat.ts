import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getSystemInstruction, MAX_OUTPUT_TOKENS, MAX_HISTORY_MESSAGES, MAX_MESSAGE_LENGTH } from './system-prompt';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  // Truncate message length
  const sanitizedMessage = message.slice(0, MAX_MESSAGE_LENGTH);

  // Limit history to prevent abuse
  const safeHistory = Array.isArray(history)
    ? history.slice(-MAX_HISTORY_MESSAGES).map((msg: { role: string; text: string }) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: typeof msg.text === 'string' ? msg.text.slice(0, MAX_MESSAGE_LENGTH) : '' }],
      }))
    : [];

  try {
    const systemInstruction = await getSystemInstruction(process.env.VITE_SHEETS_CSV_URL);

    const contents = [
      ...safeHistory,
      { role: 'user', parts: [{ text: sanitizedMessage }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemInstruction }] },
          contents,
          generationConfig: {
            maxOutputTokens: MAX_OUTPUT_TOKENS,
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ error: errorData });
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
    return res.status(200).json({ text });
  } catch (error) {
    console.error('Gemini proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
