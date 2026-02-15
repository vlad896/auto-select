import {
  ShieldCheck,
  Landmark,
  Scale,
  FileSearch,
  Globe,
  ScanBarcode,
  Camera,
  AlertTriangle,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

// ============================================================
// LegalCheck — dark theme
// ============================================================

function CheckItem({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-600/15 text-primary-400">
        <Icon className="h-4.5 w-4.5" aria-hidden="true" />
      </div>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-neutral-400">
          {children}
        </p>
      </div>
    </div>
  );
}

export function LegalCheck() {
  return (
    <section
      id="legal"
      className="section-padding bg-surface-950"
      aria-labelledby="legal-heading"
    >
      <Container>
        <SectionHeading
          label="Юридическая безопасность"
          subtitle="Техническое состояние — это лишь половина дела. Риски купить «проблемное» в правовом поле авто выросли из-за серых схем ввоза."
          align="left"
        >
          <span id="legal-heading">
            Юридическая чистота и верификация VIN-номера
          </span>
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* === Column 1 === */}
          <AnimateOnScroll variant="slideLeft">
          <div className="rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/20">
                <ShieldCheck className="h-5 w-5 text-primary-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl">Проверка по базам ГАИ и реестрам</h3>
            </div>

            <p className="mb-6 text-sm text-neutral-400 leading-relaxed">
              Мы не просто смотрим техпаспорт. Система двойной проверки исключает
              любые сюрпризы после передачи денег.
            </p>

            <div className="space-y-5">
              <CheckItem icon={Landmark} title="Реестр залогового имущества">
                Проверяем, не является ли машина обеспечением по кредиту. Залог
                следует за вещью — банк может изъять авто.
              </CheckItem>
              <CheckItem icon={Scale} title="Исполнительные производства">
                Проверяем продавца на наличие долгов. Запрет на рег. действия = вы
                не поставите машину на учёт.
              </CheckItem>
              <CheckItem icon={AlertTriangle} title="История ДТП">
                Доступ к базам страховых компаний: характер повреждений и суммы
                выплат.
              </CheckItem>
            </div>
          </div>
          </AnimateOnScroll>

          {/* === Column 2 === */}
          <AnimateOnScroll variant="slideRight" delay={0.15}>
          <div className="rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/20">
                <FileSearch className="h-5 w-5 text-primary-400" aria-hidden="true" />
              </div>
              <h3 className="text-lg sm:text-xl">История обслуживания и ДТП</h3>
            </div>

            <p className="mb-6 text-sm text-neutral-400 leading-relaxed">
              Для авто из Европы или США проводим глубокий аудит по VIN-номеру:
            </p>

            <div className="space-y-5">
              <CheckItem icon={Camera} title="Аукционные отчёты (Copart, IAAI)">
                Поиск архивных фото «битков» из Штатов. Если машина была «salvage» —
                мы это найдём.
              </CheckItem>
              <CheckItem icon={Globe} title="Европейские базы данных">
                Проверка истории техосмотров в ЕС, где фиксируется реальный пробег.
              </CheckItem>
              <CheckItem icon={ScanBarcode} title="Сверка маркировок VIN">
                Проверяем не только основной VIN, но и скрытые дублирующие
                наклейки и лазерную маркировку.
              </CheckItem>
            </div>
          </div>
          </AnimateOnScroll>
        </div>

        {/* Summary callout */}
        <div className="mt-10 rounded-2xl border border-primary-600/20 bg-primary-950/30 p-5 sm:mt-12 sm:p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-600/20">
              <ShieldCheck className="h-5 w-5 text-primary-400" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold text-white">
                Двойная защита: техническая + юридическая
              </p>
              <p className="mt-1 text-sm text-neutral-400">
                Каждый автомобиль проходит комплексную проверку по обеим линиям.
                Результаты фиксируются в диагностической карте — фундамент для
                торга и вашей юридической защитой.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
