import { LeadSource } from "@/lib/db";

function escapeTelegram(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function notifyLead(input: {
  source: LeadSource;
  name: string | null;
  phone: string;
  pageUrl: string | null;
}): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chatId) return;

  const lines = [
    "Новая заявка",
    `Источник: ${input.source}`,
    `Телефон: ${input.phone}`,
    `Имя: ${input.name ?? "—"}`,
    `Страница: ${input.pageUrl ?? "—"}`,
  ];
  const text = escapeTelegram(lines.join("\n"));

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "MarkdownV2",
      }),
      cache: "no-store",
    });
  } catch (err) {
    console.error("[leads] telegram notify failed", err);
  }
}

