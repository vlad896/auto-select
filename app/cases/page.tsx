import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Кейсы проверок",
  description:
    "Реальные примеры проверенных автомобилей: отказ от утопленника, экономия на торге, скрученный пробег. Минск.",
};

export default function CasesPage() {
  return (
    <main
      id="main-content"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
      className="min-h-screen bg-surface-950"
    >
      <Container className="py-12 sm:py-16">
        <nav
          aria-label="Хлебные крошки"
          className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-neutral-400"
        >
          <Link href="/" className="transition-colors hover:text-white">
            Главная
          </Link>
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
          <span className="text-white">Кейсы</span>
        </nav>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Кейсы: примеры проверенных автомобилей
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Здесь будут собраны все реальные кейсы из нашей практики. Пока смотрите примеры на главной странице.
        </p>

        <Button href="/#cases" variant="primary" size="md" className="mt-8">
          Смотреть кейсы на главной
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </Container>
    </main>
  );
}
