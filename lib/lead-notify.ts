import { LeadSource } from "@/lib/db";
import { logError, logWarn, maskPhone } from "@/lib/logger";

function escapeTelegram(text: string): string {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}

export async function notifyLead(input: {
  source: LeadSource;
  name: string | null;
  phone: string;
  pageUrl: string | null;
  requestId?: string;
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
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
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

    if (!response.ok) {
      const body = await response.text();
      logWarn("lead.telegram.notify_failed", {
        requestId: input.requestId,
        source: input.source,
        phone: maskPhone(input.phone),
        pageUrl: input.pageUrl,
        status: response.status,
        responseBody: body.slice(0, 500),
      });
    }
  } catch (err) {
    logError("lead.telegram.notify_error", err, {
      requestId: input.requestId,
      source: input.source,
      phone: maskPhone(input.phone),
      pageUrl: input.pageUrl,
    });
  }
}
