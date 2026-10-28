"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/admin";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, { ok: false, message: "" });
  return (
    <form action={action} className="space-y-4 rounded-2xl border border-line bg-paper p-6">
      <label className="block">
        <span className="mb-1.5 block text-sm font-semibold">Нууц үг</span>
        <input name="password" type="password" required autoComplete="current-password" className="field" />
      </label>
      {state.message && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{state.message}</p>}
      <button type="submit" disabled={pending} className="btn btn-primary w-full disabled:opacity-60">
        {pending ? "Шалгаж байна…" : "Нэвтрэх"}
      </button>
    </form>
  );
}
