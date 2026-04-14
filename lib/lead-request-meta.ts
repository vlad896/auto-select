import { headers } from "next/headers";

export async function getLeadRequestMeta(): Promise<{
  clientIp: string;
  userAgent: string | null;
  pageUrl: string | null;
}> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for");
  const clientIp =
    forwarded?.split(",")[0]?.trim() ||
    h.get("x-real-ip") ||
    "unknown";

  return {
    clientIp,
    userAgent: h.get("user-agent"),
    pageUrl: h.get("referer"),
  };
}
