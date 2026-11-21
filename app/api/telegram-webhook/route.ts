import { NextResponse } from 'next/server';
import db from '@/lib/db';

export async function POST(request: Request) {
  const update = await request.json();

  // 1. ПОДТВЕРЖДЕНИЕ ПЕРЕД ОПЛАТОЙ
  if (update.pre_checkout_query) {
    const query = update.pre_checkout_query;
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerPreCheckoutQuery`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pre_checkout_query_id: query.id, ok: true }),
    });
    return NextResponse.json({ ok: true });
  }

  // 2. УСПЕШНАЯ ОПЛАТА
  if (update.message?.successful_payment) {
    const payment = update.message.successful_payment;
    const payload = JSON.parse(payment.invoice_payload);
    const telegramId = update.message.from.id.toString();
    const username = update.message.from.username || "";
    const firstName = update.message.from.first_name || "";

    // Считаем, на сколько дней продлить подписку
    let daysToAdd = 30;
    if (payload.planId === "3m") daysToAdd = 90;
    if (payload.planId === "12m") daysToAdd = 365;

    try {
      // Записываем платеж
      const insertPayment = db.prepare(`
        INSERT INTO payments (telegram_id, plan_id, amount, currency, charge_id)
        VALUES (?, ?, ?, ?, ?)
      `);
      insertPayment.run(telegramId, payload.planId, payment.total_amount, payment.currency, payment.telegram_payment_charge_id);

      // Проверяем, есть ли пользователь в базе
      const user = db.prepare(`SELECT * FROM users WHERE telegram_id = ?`).get(telegramId);
      
      const now = new Date();
      let newDate = new Date();

      if (user && user.subscription_until) {
        // Если подписка уже есть, прибавляем дни к текущей дате
        const currentSub = new Date(user.subscription_until);
        if (currentSub > now) {
          newDate = currentSub;
        }
      }
      newDate.setDate(newDate.getDate() + daysToAdd);

      if (user) {
        // Обновляем существующего
        db.prepare(`UPDATE users SET subscription_until = ? WHERE telegram_id = ?`).run(newDate.toISOString(), telegramId);
      } else {
        // Создаем нового
        db.prepare(`
          INSERT INTO users (telegram_id, username, first_name, subscription_until) 
          VALUES (?, ?, ?, ?)
        `).run(telegramId, username, firstName, newDate.toISOString());
      }

      console.log(`✅ Пользователь ${telegramId} оплатил тариф ${payload.planId}. Подписка до ${newDate.toISOString()}`);
    } catch (error) {
      console.error("Ошибка записи в БД:", error);
    }

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ ok: true });
}