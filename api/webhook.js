export default async function handler(req, res) {
  // Auto-register webhook on first ping to prevent manual browser errors
  const token = "8620931331:AAGglluk7iNp_P177gWOH0Zpn774EqAYUwk";
  const appUrl = "https://yum-tasty-app.vercel.app";

  if (req.method === 'GET') {
    const setupRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${appUrl}/api/webhook`);
    const data = await setupRes.json();
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { message } = req.body;
    
    if (message && message.text === '/start') {
      const chatId = message.chat.id;

      const payload = {
        chat_id: chatId,
        text: "⚡ *Welcome to Yum Tasty !!*\n\nThe ultimate gamified task platform on Telegram.\n\n💎 Complete tasks, invite friends, and earn real crypto rewards!\n\nTap the button below to launch your dashboard.",
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: "Open Yum Tasty !!",
                web_app: { url: appUrl }
              }
            ]
          ]
        }
      };

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }

    return res.status(200).json({ status: 'ok' });
  }
}
