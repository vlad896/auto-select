import { addLeadNoteAction, updateLeadStatusAction } from "./actions";
import { getLeadById, listLeads, LeadStatus } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/admin-auth";

const statusOptions: Array<{ value: LeadStatus; label: string }> = [
  { value: "new", label: "Новая" },
  { value: "in_progress", label: "В работе" },
  { value: "won", label: "Закрыта (успех)" },
  { value: "lost", label: "Закрыта (отказ)" },
];

function statusLabel(value: LeadStatus): string {
  return statusOptions.find((opt) => opt.value === value)?.label ?? value;
}

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const authorized = await isAdminAuthorized();
  if (!authorized) {
    return (
      <main className="mx-auto max-w-3xl p-6 text-white">
        <h1 className="text-2xl font-bold">Admin Leads</h1>
        <p className="mt-2 text-neutral-300">
          Требуется Basic Auth. Добавьте `ADMIN_BASIC_USER` и `ADMIN_BASIC_PASSWORD`,
          затем откройте страницу с логином/паролем.
        </p>
      </main>
    );
  }

  const leads = await listLeads(200);
  const params = await searchParams;
  const selectedId = Number(params.id);
  const fallbackId = leads[0]?.id ?? 0;
  const activeLeadId =
    Number.isFinite(selectedId) && selectedId > 0 ? selectedId : fallbackId;
  const lead = activeLeadId ? await getLeadById(activeLeadId) : null;

  return (
    <main className="mx-auto max-w-7xl p-6 text-white">
      <h1 className="text-2xl font-bold">Заявки</h1>
      <p className="mt-2 text-sm text-neutral-300">
        Лёгкая админка для старта: список лидов, смена статуса и заметки.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[380px_1fr]">
        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          <h2 className="mb-3 text-lg font-semibold">Последние лиды</h2>
          <ul className="space-y-2">
            {leads.map((item) => (
              <li key={item.id}>
                <a
                  href={`/admin/leads?id=${item.id}`}
                  className={`block rounded-lg border px-3 py-2 text-sm transition ${
                    item.id === activeLeadId
                      ? "border-primary-500 bg-primary-500/10"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div className="font-semibold">#{item.id} {item.phone}</div>
                  <div className="text-xs text-neutral-300">
                    {item.source} • {statusLabel(item.status)}
                  </div>
                  <div className="text-xs text-neutral-400">{item.createdAt}</div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-4">
          {!lead ? (
            <p className="text-neutral-300">Заявки не найдены.</p>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Лид #{lead.id}</h2>
              <div className="mt-3 grid gap-2 text-sm text-neutral-200 sm:grid-cols-2">
                <p><span className="text-neutral-400">Телефон:</span> {lead.phone}</p>
                <p><span className="text-neutral-400">Источник:</span> {lead.source}</p>
                <p><span className="text-neutral-400">Имя:</span> {lead.name ?? "—"}</p>
                <p><span className="text-neutral-400">Создано:</span> {lead.createdAt}</p>
                <p className="sm:col-span-2">
                  <span className="text-neutral-400">Страница:</span> {lead.pageUrl ?? "—"}
                </p>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <form action={updateLeadStatusAction} className="space-y-2">
                  <input type="hidden" name="leadId" value={lead.id} />
                  <label className="text-sm text-neutral-300" htmlFor="status">
                    Статус
                  </label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={lead.status}
                    className="w-full rounded border border-white/20 bg-surface-100 px-3 py-2 text-sm"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="rounded bg-primary-600 px-4 py-2 text-sm font-semibold hover:bg-primary-500"
                  >
                    Обновить статус
                  </button>
                </form>

                <form action={addLeadNoteAction} className="space-y-2">
                  <input type="hidden" name="leadId" value={lead.id} />
                  <label className="text-sm text-neutral-300" htmlFor="note">
                    Заметка
                  </label>
                  <textarea
                    id="note"
                    name="note"
                    required
                    minLength={2}
                    rows={4}
                    className="w-full rounded border border-white/20 bg-surface-100 px-3 py-2 text-sm"
                    placeholder="Что важно по этому лиду?"
                  />
                  <button
                    type="submit"
                    className="rounded bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/20"
                  >
                    Добавить заметку
                  </button>
                </form>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h3 className="mb-2 font-semibold">Заметки</h3>
                  <ul className="space-y-2 text-sm">
                    {lead.notes.length === 0 ? (
                      <li className="text-neutral-400">Пока нет заметок.</li>
                    ) : (
                      lead.notes.map((note) => (
                        <li key={note.id} className="rounded border border-white/10 p-2">
                          <p>{note.note}</p>
                          <p className="mt-1 text-xs text-neutral-400">
                            {note.author ?? "admin"} • {note.createdAt}
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>

                <div>
                  <h3 className="mb-2 font-semibold">События</h3>
                  <ul className="space-y-2 text-sm">
                    {lead.events.map((event) => (
                      <li key={event.id} className="rounded border border-white/10 p-2">
                        <p className="font-medium">{event.eventType}</p>
                        <p className="text-xs text-neutral-400">
                          {event.actor ?? "system"} • {event.createdAt}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}

