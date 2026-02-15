import { WifiOff, RefreshCw, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export const metadata = {
  title: "Нет подключения — АвтоПодбор",
};

export default function OfflinePage() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      <Container className="py-20 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-100 border border-white/10">
          <WifiOff className="h-10 w-10 text-neutral-500" aria-hidden="true" />
        </div>

        <h1 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          Нет подключения к интернету
        </h1>

        <p className="mx-auto mb-8 max-w-md text-neutral-400">
          Страница недоступна без интернета. Проверьте соединение и
          попробуйте обновить страницу. Или позвоните нам напрямую.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button href="/" variant="primary" size="lg">
            <RefreshCw className="h-4 w-4" aria-hidden="true" />
            Обновить страницу
          </Button>

          <Button href={`tel:${SITE.phone}`} variant="secondary" size="lg">
            <Phone className="h-4 w-4" aria-hidden="true" />
            {SITE.phoneDisplay}
          </Button>
        </div>

        <p className="mt-10 text-xs text-neutral-600">
          {SITE.name} &middot; {SITE.address}
        </p>
      </Container>
    </main>
  );
}
