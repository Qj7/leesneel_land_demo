export type Locale = "ru" | "en" | "uk";

export const LOCALES: { value: Locale; label: string }[] = [
  { value: "ru", label: "ru" },
  { value: "en", label: "eng" },
  { value: "uk", label: "ukr" },
];

export const LOCALE_STORAGE_KEY = "leesneel-locale";

function isLocale(value: string | null): value is Locale {
  return value === "ru" || value === "en" || value === "uk";
}

export function getPreferredLocale(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) return stored;
  } catch {
    /* ignore */
  }
  const lang = (navigator.language || "").toLowerCase();
  if (lang.startsWith("ru")) return "ru";
  if (lang.startsWith("uk")) return "uk";
  return "en";
}

export type Messages = {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  heroLine1: string;
  heroLine2: string;
  heroLine3: string;
  subtitle: string;
  contactLabel: string;
  footerTagline: string;
  formNamePlaceholder: string;
  formNameSr: string;
  formEmailSr: string;
  formSportPlaceholder: string;
  formSportSr: string;
  formSubmit: string;
  formSubmitting: string;
  formPromo: string;
  formSuccess: string;
  formError: string;
};

export const messages: Record<Locale, Messages> = {
  ru: {
    metaTitle: "Leesneel | Ранний доступ",
    metaDescription:
      "Лендинг раннего доступа Leesneel для семей, где спорт, финансовая грамотность и бизнес-мышление идут вместе.",
    badge: "Открыт сбор заявок на получение раннего доступа",
    heroLine1: "Дисциплина ребенка-спортсмена,",
    heroLine2: "финансовая грамотность и",
    heroLine3: "бизнес-мышление в одной семье",
    subtitle:
      "Приложение для семей, где детский спорт превратится в фундамент будущего предпринимателя",
    contactLabel: "По всем вопросам",
    footerTagline:
      "Leesneel скоро • от базовых атлетов для базовых атлетов с любовью",
    formNamePlaceholder: "Как к вам обращаться",
    formNameSr: "Как к вам обращаться",
    formEmailSr: "Email",
    formSportPlaceholder: "Вид спорта ребенка",
    formSportSr: "Вид спорта ребенка",
    formSubmit: "Хочу ранний доступ",
    formSubmitting: "Отправка...",
    formPromo: "ПЕРВЫЕ 50 СЕМЕЙ ПОЛУЧАТ БЕСПЛАТНЫЙ ДОСТУП НАВСЕГДА",
    formSuccess: "Заявка отправлена. Скоро свяжемся с вами.",
    formError: "Ошибка отправки. Попробуйте еще раз.",
  },
  en: {
    metaTitle: "Leesneel | Early access",
    metaDescription:
      "Leesneel early access landing page for families where sport, financial literacy, and business thinking go hand in hand.",
    badge: "Now accepting applications for early access",
    heroLine1: "Discipline for your young athlete,",
    heroLine2: "financial literacy, and",
    heroLine3: "an entrepreneurial mindset — in one family",
    subtitle:
      "An app for families turning youth sports into the foundation of a future entrepreneur",
    contactLabel: "Get in touch",
    footerTagline:
      "Leesneel is coming soon • from everyday athletes to everyday athletes, with love",
    formNamePlaceholder: "How should we address you",
    formNameSr: "How should we address you",
    formEmailSr: "Email",
    formSportPlaceholder: "Your child’s sport",
    formSportSr: "Your child’s sport",
    formSubmit: "I want early access",
    formSubmitting: "Sending...",
    formPromo: "THE FIRST 50 FAMILIES GET FREE ACCESS — FOREVER",
    formSuccess: "Request sent. We’ll be in touch soon.",
    formError: "Something went wrong. Please try again.",
  },
  uk: {
    metaTitle: "Leesneel | Ранній доступ",
    metaDescription:
      "Лендинг раннього доступу Leesneel для родин, де спорт, фінансова грамотність і бізнес-мислення йдуть поруч.",
    badge: "Відкрито збір заявок на ранній доступ",
    heroLine1: "Дисципліна дитини-спортсмена,",
    heroLine2: "фінансова грамотність і",
    heroLine3: "бізнес-мислення в одній родині",
    subtitle:
      "Застосунок для родин, де дитячий спорт стане фундаментом майбутнього підприємця",
    contactLabel: "З усіх питань",
    footerTagline:
      "Leesneel незабаром • від базових атлетів для базових атлетів із любов’ю",
    formNamePlaceholder: "Як до вас звертатися",
    formNameSr: "Як до вас звертатися",
    formEmailSr: "Email",
    formSportPlaceholder: "Вид спорту дитини",
    formSportSr: "Вид спорту дитини",
    formSubmit: "Хочу ранній доступ",
    formSubmitting: "Надсилання...",
    formPromo: "ПЕРШІ 50 РОДИН ОТРИМАЮТЬ БЕЗКОШТОВНИЙ ДОСТУП НАЗАВЖДИ",
    formSuccess: "Заявку надіслано. Незабаром зв’яжемося з вами.",
    formError: "Помилка надсилання. Спробуйте ще раз.",
  },
};
