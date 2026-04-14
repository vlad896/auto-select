export const OPEN_LEAD_POPUP_EVENT = "open-lead-popup";

function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  return pathname.endsWith("/") && pathname !== "/" ? pathname.slice(0, -1) : pathname;
}

export function isQuizHref(href: string): boolean {
  return href === "#quiz" || href.endsWith("#quiz");
}

export function shouldOpenLeadPopup(pathname: string, href: string): boolean {
  if (!isQuizHref(href)) {
    return false;
  }

  return normalizePathname(pathname) !== "/";
}

export function openLeadPopup(): void {
  window.dispatchEvent(new CustomEvent(OPEN_LEAD_POPUP_EVENT));
}
