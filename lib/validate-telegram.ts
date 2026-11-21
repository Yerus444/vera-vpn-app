import { validate } from '@tma.js/init-data';

export async function validateTelegramInitData(initDataRaw: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  if (!botToken) throw new Error("Bot token is not configured");

  try {
    // Проверяем подпись и срок действия (по умолчанию 1 час)
    const validatedData = await validate(initDataRaw, botToken, { expiresIn: 3600 });
    return { valid: true, user: validatedData.user };
  } catch (error) {
    console.error("InitData validation failed:", error);
    return { valid: false, user: null };
  }
}