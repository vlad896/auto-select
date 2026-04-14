"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addLeadNote, LeadStatus, updateLeadStatus } from "@/lib/db";
import { isAdminAuthorized } from "@/lib/admin-auth";

async function ensureAdmin(): Promise<void> {
  const ok = await isAdminAuthorized();
  if (!ok) {
    redirect("/offline/");
  }
}

export async function updateLeadStatusAction(formData: FormData): Promise<void> {
  await ensureAdmin();
  const leadId = Number(formData.get("leadId"));
  const status = String(formData.get("status")) as LeadStatus;

  const allowed: LeadStatus[] = ["new", "in_progress", "won", "lost"];
  if (!Number.isFinite(leadId) || !allowed.includes(status)) {
    return;
  }

  await updateLeadStatus({ leadId, status, actor: "admin" });
  revalidatePath("/admin/leads");
}

export async function addLeadNoteAction(formData: FormData): Promise<void> {
  await ensureAdmin();
  const leadId = Number(formData.get("leadId"));
  const note = String(formData.get("note") ?? "");

  if (!Number.isFinite(leadId) || note.trim().length < 2) {
    return;
  }

  await addLeadNote({ leadId, note, author: "admin" });
  revalidatePath("/admin/leads");
}

