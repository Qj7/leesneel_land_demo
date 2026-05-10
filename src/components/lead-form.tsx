"use client";

import { FormEvent, useState } from "react";
import { useLocale } from "@/contexts/locale-context";

type FormState = {
  name: string;
  email: string;
  sport: string;
};

const INITIAL_FORM: FormState = {
  name: "",
  email: "",
  sport: "",
};

export function LeadForm() {
  const { t } = useLocale();
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block">
        <span className="sr-only">{t.formNameSr}</span>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <input
            required
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
            placeholder={t.formNamePlaceholder}
            className="h-13 w-full rounded-xl border border-[#2a385a]/90 bg-[#050915]/90 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#1ec85f]/70 focus:ring-2 focus:ring-[#1ec85f]/20"
          />
        </div>
      </label>

      <label className="block">
        <span className="sr-only">{t.formEmailSr}</span>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          >
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
            <rect x="2" y="4" width="20" height="16" rx="2" />
          </svg>
          <input
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            placeholder="email@example.com"
            className="h-13 w-full rounded-xl border border-[#2a385a]/90 bg-[#050915]/90 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#1ec85f]/70 focus:ring-2 focus:ring-[#1ec85f]/20"
          />
        </div>
      </label>

      <label className="block">
        <span className="sr-only">{t.formSportSr}</span>
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500"
            aria-hidden="true"
          >
            <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
            <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
            <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
            <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
          </svg>
          <input
            required
            value={form.sport}
            onChange={(event) => setForm({ ...form, sport: event.target.value })}
            placeholder={t.formSportPlaceholder}
            className="h-13 w-full rounded-xl border border-[#2a385a]/90 bg-[#050915]/90 pl-10 pr-4 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-[#1ec85f]/70 focus:ring-2 focus:ring-[#1ec85f]/20"
          />
        </div>
      </label>

      <div className="pt-1">
        <button
          type="submit"
          disabled={status === "loading"}
          className="group relative flex h-13 w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-[hsl(142.3_71.6%_41.4%_/_0.44)] bg-[hsl(142.3_71.6%_41.4%_/_0.08)] font-medium text-[#f2f5f9] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35)] transition duration-200 hover:border-[hsl(142.3_71.6%_41.4%_/_0.52)] hover:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35),0_0_8px_rgba(86,178,97,0.1),0_0_16px_rgba(86,178,97,0.06)] focus-visible:outline-none focus-visible:border-[hsl(142.3_71.6%_41.4%_/_0.56)] focus-visible:shadow-[inset_0_0_0_1px_rgba(0,0,0,0.35),0_0_10px_rgba(86,178,97,0.12),0_0_20px_rgba(86,178,97,0.08)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(43,90,54,0.12)_0%,rgba(17,32,27,0)_22%,rgba(17,32,27,0)_78%,rgba(43,90,54,0.12)_100%)] transition duration-200 group-hover:bg-[linear-gradient(90deg,rgba(86,178,97,0.1)_0%,rgba(17,32,27,0.02)_22%,rgba(17,32,27,0.02)_78%,rgba(86,178,97,0.1)_100%)] group-focus-visible:bg-[linear-gradient(90deg,rgba(86,178,97,0.12)_0%,rgba(17,32,27,0.03)_22%,rgba(17,32,27,0.03)_78%,rgba(86,178,97,0.12)_100%)]" />
          <span className="relative text-sm font-medium tracking-tight text-[#f2f5f9]">
            {status === "loading" ? t.formSubmitting : t.formSubmit}
          </span>
          <span className="relative text-lg leading-none text-[#56b261]">
            →
          </span>
        </button>
        <p className="mx-auto mt-4 w-fit whitespace-nowrap font-[var(--font-jetbrains-mono)] text-[10px] uppercase tracking-[0.25em] text-[hsl(142.3_71.6%_41.4%)] [text-shadow:0_0_12px_hsl(142_71%_45%_/_0.5)]">
          {t.formPromo}
        </p>
      </div>

      {status === "success" && (
        <p className="text-center text-xs text-slate-400">
          {t.formSuccess}
        </p>
      )}
      {status === "error" && (
        <p className="text-center text-xs text-slate-400">
          {t.formError}
        </p>
      )}
    </form>
  );
}
