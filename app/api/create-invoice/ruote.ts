import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { planId, userTelegramId } = await request.json();
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  // 1. Определяем цену на сервере (никогда не доверяйте цене с клиента!)
  const PRICES: Record<string, number> = {
    "1m": 249,
    "3m": 597,
    "12m": 1788,
  };
  const amount = PRICES[planId];
  if (!amount) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

  try {
    // 2. Вызываем Telegram Bot API
    const response = await fetch(`https://api.telegram.org/bot${botToken}/createInvoiceLink`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: `VERA VPN — Подписка (${planId})`,
        description: "Доступ к премиум-серверам и защите",
        payload: JSON.stringify({ planId, userTelegramId }), // Payload вернется при оплате
        provider_token: "", // Для Stars ВСЕГДА пустая строка!
        currency: "XTR",    // Валюта — Telegram Stars
        prices: [{ label: "Подписка", amount }], // Строго один элемент
      }),
    });

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);

    return NextResponse.json({ invoiceLink: data.result });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create invoice" }, { status: 500 });
  }
}