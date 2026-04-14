import { headers } from "next/headers";

export async function isAdminAuthorized(): Promise<boolean> {
  const user = process.env.ADMIN_BASIC_USER?.trim();
  const password = process.env.ADMIN_BASIC_PASSWORD ?? "";

  if (!user) {
    return false;
  }

  const authHeader = (await headers()).get("authorization");
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return false;
  }

  const base64 = authHeader.slice("Basic ".length).trim();
  let decoded = "";
  try {
    decoded = Buffer.from(base64, "base64").toString("utf-8");
  } catch {
    return false;
  }

  const separator = decoded.indexOf(":");
  if (separator === -1) {
    return false;
  }

  const inputUser = decoded.slice(0, separator);
  const inputPassword = decoded.slice(separator + 1);
  return inputUser === user && inputPassword === password;
}

