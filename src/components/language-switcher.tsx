"use client";

import { LOCALES, type Locale } from "@/lib/i18n";
import { useLocale } from "@/contexts/locale-context";

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <select
      id="lang-switcher"
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="absolute right-4 top-4 z-20 cursor-pointer rounded-lg border border-[#2a385a]/90 bg-[#070c1a]/90 px-2.5 py-1.5 text-xs font-medium uppercase tracking-wider text-slate-200 outline-none transition hover:border-[#1ec85f]/50 focus-visible:ring-2 focus-visible:ring-[#1ec85f]/30 sm:right-6 sm:top-5"
      aria-label="Language"
    >
      {LOCALES.map(({ value, label }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
