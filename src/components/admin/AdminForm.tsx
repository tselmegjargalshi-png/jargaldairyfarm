"use client";

import { useActionState, type ReactNode } from "react";
import type { AdminState } from "@/lib/admin-forms";

export function AdminForm({
  action,
  children,
  submitLabel = "Хадгалах",
}: {
  action: (prev: AdminState, fd: FormData) => Promise<AdminState>;
  children: ReactNode;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, { ok: false, message: "" });
  return (
    <form action={formAction} className="space-y-5">
      {children}
      {state.message && (
        <p role={state.ok ? "status" : "alert"} className={`rounded-lg px-4 py-3 text-sm ${state.ok ? "bg-green-100 text-green-900" : "bg-red-50 text-red-800"}`}>
          {state.message}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
        {pending ? "Хадгалж байна…" : submitLabel}
      </button>
    </form>
  );
}

export function F({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-green-900">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}
