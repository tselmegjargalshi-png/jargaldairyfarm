"use client";

import { startTransition, useActionState } from "react";
import { submitInquiry } from "@/app/actions/inquiry";
import type { FormState } from "@/lib/inquiry";
import { dayParts, meetingTypes, partnershipTypes, trainingTopics } from "@/lib/site";

const initial: FormState = { ok: false, message: "" };

type Kind = "partnership" | "interest" | "contact" | "meeting" | "training";

type Props = {
  kind: Kind;
  submitLabel: string;
  messageLabel?: string;
};

const selects: Partial<Record<Kind, { label: string; options: readonly string[] }>> = {
  partnership: { label: "Хамтын ажиллагааны төрөл", options: partnershipTypes },
  meeting: { label: "Уулзалтын төрөл", options: meetingTypes },
  training: { label: "Сонирхсон сургалтын чиглэл", options: trainingTopics },
};

export function InquiryForm({ kind, submitLabel, messageLabel = "Мессеж" }: Props) {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const err = state.errors ?? {};
  const val = (name: string) => state.values?.[name] ?? "";

  if (state.ok) {
    return (
      <div role="status" className="rounded-2xl border border-green-600/30 bg-green-100 p-6 text-green-900">
        <p className="font-serif text-xl font-semibold">Хүсэлт илгээгдлээ</p>
        <p className="mt-2">{state.message}</p>
      </div>
    );
  }

  const partner = kind === "partnership";
  const select = selects[kind];
  const messageRequired = partner || kind === "contact";

  return (
    <form
      // Submit manually: a <form action> is auto-reset by React after the action, which would wipe the visitor's input on validation errors.
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => action(data));
      }}
      noValidate className="space-y-5" aria-describedby={state.message ? "form-msg" : undefined}>
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
          <input name="orgName" required autoComplete="organization" defaultValue={val("orgName")} className="field" />
        </Field>
      )}
      <Field label={partner ? "Холбоо барих хүний нэр" : "Таны нэр"} error={err.contactName}>
        <input name="contactName" required autoComplete="name" defaultValue={val("contactName")} className="field" />
      </Field>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Утас" error={err.phone}>
          <input name="phone" type="tel" inputMode="tel" autoComplete="tel" defaultValue={val("phone")} className="field" />
        </Field>
        <Field label="Имэйл" error={err.email}>
          <input name="email" type="email" autoComplete="email" defaultValue={val("email")} className="field" />
        </Field>
      </div>
      <p className="-mt-2 text-xs text-muted">Утас эсвэл имэйлийн аль нэгийг заавал оруулна уу.</p>

      {select && (
        <Field label={select.label} error={err.topic}>
          <select name="topic" required defaultValue={val("topic")} className="field">
            <option value="" disabled>Сонгоно уу</option>
            {select.options.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </Field>
      )}

      {kind === "meeting" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Тохиромжтой огноо" error={err.preferredDate}>
            <input name="preferredDate" type="date" required defaultValue={val("preferredDate")} className="field" />
          </Field>
          <Field label="Өдрийн аль үе" error={err.preferredPart}>
            <select name="preferredPart" required defaultValue={val("preferredPart")} className="field">
              <option value="" disabled>Сонгоно уу</option>
              {dayParts.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </Field>
        </div>
      )}

      <Field label={messageLabel} error={err.message}>
        <textarea name="message" required={messageRequired} defaultValue={val("message")} className="field" />
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
