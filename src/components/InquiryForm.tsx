"use client";

import { useActionState } from "react";
import { submitInquiry } from "@/app/actions/inquiry";
import type { FormState } from "@/lib/inquiry";
import { partnershipTypes } from "@/lib/site";

const initial: FormState = { ok: false, message: "" };

type Props = {
  kind: "partnership" | "interest" | "contact";
  /** Fixed topic (e.g. the service the visitor is interested in) */
  topic?: string;
  submitLabel: string;
  messageLabel?: string;
};

export function InquiryForm({ kind, topic, submitLabel, messageLabel = "Мессеж" }: Props) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const err = state.errors ?? {};

  if (state.ok) {
    return (
      <div role="status" className="rounded-2xl border border-green-600/30 bg-green-100 p-6 text-green-900">
        <p className="font-serif text-xl font-semibold">Хүсэлт илгээгдлээ</p>
        <p className="mt-2">{state.message}</p>
      </div>
    );
  }

  const partner = kind === "partnership";

  return (
    <form action={action} noValidate className="space-y-5" aria-describedby={state.message ? "form-msg" : undefined}>
      <input type="hidden" name="kind" value={kind} />
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Вэбсайт
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {partner && (
        <Field label="Байгууллагын нэр" error={err.orgName}>
          <input name="orgName" required autoComplete="organization" className="field" />
        </Field>
      )}
      <Field label={partner ? "Холбоо барих хүний нэр" : "Таны нэр"} error={err.contactName}>
        <input name="contactName" required autoComplete="name" className="field" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Утас" error={err.phone}>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field" />
        </Field>
        <Field label="Имэйл" error={err.email}>
          <input name="email" type="email" autoComplete="email" className="field" />
        </Field>
      </div>
      <p className="-mt-2 text-xs text-muted">Утас эсвэл имэйлийн аль нэгийг заавал оруулна уу.</p>

      {partner ? (
        <Field label="Хамтын ажиллагааны төрөл" error={err.topic}>
          <select name="topic" required defaultValue="" className="field">
            <option value="" disabled>Сонгоно уу</option>
            {partnershipTypes.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      ) : (
        topic && <input type="hidden" name="topic" value={topic} />
      )}

      <Field label={messageLabel} error={err.message}>
        <textarea name="message" required={partner || kind === "contact"} className="field" />
      </Field>

      {state.message && (
        <p id="form-msg" role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className="btn btn-primary w-full sm:w-auto disabled:opacity-60">
        {pending ? "Илгээж байна…" : submitLabel}
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-green-900">{label}</span>
      {children}
      {error && <span className="mt-1 block text-sm text-red-700">{error}</span>}
    </label>
  );
}
