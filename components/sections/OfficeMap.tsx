import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  Car,
} from "lucide-react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

// ============================================================
// OfficeMap — Google Maps embed + contact info (dark theme)
// ============================================================

export function OfficeMap() {
  return (
    <section
      id="contacts"
      className="relative section-padding bg-surface-950 overflow-hidden"
      aria-labelledby="map-heading"
    >
      {/* Background car image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/bg-car-front.jpg"
          alt="" aria-hidden="true"
          fill
          className="object-cover opacity-10"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-950/95 to-surface-950" />
      </div>

      <Container className="relative z-10">
        <SectionHeading
          label="Контакты"
          subtitle="Приезжайте к нам в офис или вызовите эксперта с выездом к продавцу — работаем по всему Минску и минскому району."
        >
          <span id="map-heading">Как нас найти</span>
        </SectionHeading>

        <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
          {/* === Left: Contact info cards === */}
          <div className="lg:col-span-2 space-y-4">
            {/* Address card */}
            <div className="rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/20">
                  <MapPin className="h-5 w-5 text-primary-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">Адрес</h3>
              </div>
              <p className="text-neutral-300 leading-relaxed">
                {SITE.address}
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                Рядом со станцией метро «Михалово»
              </p>
            </div>

            {/* Working hours */}
            <div className="rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/20">
                  <Clock className="h-5 w-5 text-primary-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">Режим работы</h3>
              </div>
              <p className="text-neutral-300">{SITE.workingHours}</p>
              <p className="mt-1 text-sm text-neutral-500">
                Выезд по договорённости — в любой день
              </p>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-white/10 bg-surface-100 p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600/20">
                  <Phone className="h-5 w-5 text-primary-400" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-white">Телефон</h3>
              </div>
              <a
                href={`tel:${SITE.phone}`}
                className="text-lg font-semibold text-primary-400 transition-colors hover:text-primary-300"
              >
                {SITE.phoneDisplay}
              </a>
              <p className="mt-1 text-sm text-neutral-500">
                WhatsApp · Telegram · Viber
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 pt-2">
              <Button href="#quiz" variant="primary" size="md" className="w-full">
                <Car className="h-4 w-4" aria-hidden="true" />
                Вызвать эксперта с выездом
              </Button>
              <Button
                href={`https://www.google.com/maps/dir//${encodeURIComponent(SITE.address)}`}
                variant="secondary"
                size="md"
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Navigation className="h-4 w-4" aria-hidden="true" />
                Построить маршрут
              </Button>
            </div>
          </div>

          {/* === Right: Google Map === */}
          <div className="lg:col-span-3">
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-surface-200/30 shadow-lg shadow-black/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2349.8!2d27.56!3d53.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTPCsDU1JzQ4LjAiTiAyN8KwMzMnMzYuMCJF!5e0!3m2!1sru!2sby!4v1700000000000!5m2!1sru!2sby"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "480px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Местоположение офиса Автоподбор в Минске"
                className="aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
