import { Container } from "@/components/ui/Container";
import { SITE } from "@/lib/constants";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata({
  path: "/privacy/",
  title: "Политика конфиденциальности",
  description:
    "Обработка персональных данных, cookies и аналитика на сайте. Узнайте, как мы храним данные и используем Яндекс.Метрику на сайте.",
});

export default function PrivacyPage() {
  return (
    <main
      id="main-content"
      className="min-h-screen"
      style={{ paddingTop: "calc(4rem + var(--promo-h, 0px))" }}
    >
      <Container className="section-padding">
        <h1 className="mb-8 text-3xl font-bold text-white font-[family-name:var(--font-heading)]">
          Политика конфиденциальности
        </h1>

        <div className="prose prose-invert max-w-none space-y-8 text-neutral-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Общие положения</h2>
            <p>
              {SITE.name} ({SITE.url}) соблюдает требования законодательства в области персональных данных
              и информирует пользователей о порядке сбора, хранения и использования информации на сайте.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Использование cookies</h2>
            <p>
              Сайт использует файлы cookie — небольшие текстовые файлы, сохраняемые на устройстве пользователя.
              Они необходимы для корректной работы сайта, запоминания настроек и анализа посещаемости.
            </p>
            <p>
              Мы используем аналитику <strong>Яндекс.Метрика</strong> для понимания того, как посетители
              пользуются сайтом (трафик, конверсии, настройка рекламы). Счётчик метрики и связанные cookies
              (_ym_uid, _ym_d и др.) могут загружаться при посещении сайта для сбора обезличенной статистики
              и оценки эффективности страниц.
            </p>
            <p>
              Если вы не хотите, чтобы такие данные учитывались, вы можете ограничить cookies и трекинг
              в настройках браузера или воспользоваться инструментами блокировки аналитики.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Обработка персональных данных</h2>
            <p>
              Персональные данные (имя, телефон, сообщение), указанные в формах обратной связи и заявках,
              используются исключительно для связи с вами и оказания услуг. Мы не передаём их третьим лицам
              в маркетинговых целях. Обработка осуществляется на основании вашего согласия при отправке формы.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Контакты</h2>
            <p>
              По вопросам политики конфиденциальности и использования данных можно связаться с нами по
              телефону <a href={`tel:${SITE.phone}`} className="text-primary-400 hover:text-primary-300">{SITE.phoneDisplay}</a> или
              через мессенджеры, указанные на сайте.
            </p>
          </section>

          <p className="text-sm text-neutral-500 pt-4">
            Дата последнего обновления: {new Date().toLocaleDateString("ru-BY", { year: "numeric", month: "long", day: "numeric" })}.
          </p>
        </div>
      </Container>
    </main>
  );
}
