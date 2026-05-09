import { LeadForm } from "@/components/lead-form";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#02050f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(66,92,160,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(66,92,160,0.2)_1px,transparent_1px)] bg-[size:48px_48px] opacity-90 [mask-image:radial-gradient(760px_460px_at_50%_34%,#000_0%,#000_44%,rgba(0,0,0,0.45)_68%,transparent_88%)] [-webkit-mask-image:radial-gradient(760px_460px_at_50%_34%,#000_0%,#000_44%,rgba(0,0,0,0.45)_68%,transparent_88%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[18%] h-[760px] w-[920px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(30,200,95,0.26)_0%,rgba(30,200,95,0.13)_30%,rgba(38,166,255,0.08)_52%,rgba(0,0,0,0)_72%)] blur-[56px]" />

      <div className="pointer-events-none absolute left-1/2 top-0 z-0 w-[1200px] max-w-[92vw] -translate-x-1/2 pt-5">
        <h1 className="text-center text-[clamp(54.4px,8.5vw,136px)] font-semibold leading-none tracking-tight">
          <span className="text-[#1ec85f] [text-shadow:0_0_8px_rgba(30,200,95,0.52),0_0_20px_rgba(30,200,95,0.36),0_0_38px_rgba(30,200,95,0.22)]">
            Lees
          </span>
          <span className="text-slate-300 [text-shadow:0_0_22px_rgba(148,163,184,0.3)]">
            neel
          </span>
        </h1>
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-4 pb-10 pt-[6.75rem] sm:px-6">
        <p className="mt-24 mb-8 inline-flex items-center gap-3 rounded-full border border-[#2a385a] bg-[#080d1a]/85 px-5 py-1.5 text-[11px] uppercase tracking-[0.28em] text-slate-300/90">
          <span className="h-2.5 w-2.5 rounded-full bg-[#1ec85f] shadow-[0_0_12px_rgba(30,200,95,0.9)]" />
          <span>Открыт сбор заявок на получение раннего доступа</span>
        </p>

        <h1 className="mx-auto flex w-full max-w-4xl flex-col items-center text-center text-[clamp(0.8125rem,calc(3.75vw+0.48rem),3.75rem)] font-semibold leading-[1.12] tracking-tight sm:text-[clamp(1.05rem,calc(5.8vw+0.65rem),3.75rem)]">
          <span className="w-full text-balance lg:w-auto lg:whitespace-nowrap">
            Дисциплина ребенка-спортсмена,
          </span>
          <span className="w-full text-balance bg-[linear-gradient(90deg,#43d07c_0%,#3ed682_10%,#40cf89_20%,#44ca95_30%,#47c59e_40%,#4bbda5_50%,#4abcae_60%,#4ab4b5_70%,#4fafc0_80%,#4ea9c8_90%,#4c9bc5_100%)] bg-clip-text text-transparent lg:w-auto lg:whitespace-nowrap">
            финансовая грамотность и
          </span>
          <span className="w-full text-balance lg:w-auto lg:whitespace-nowrap">
            бизнес-мышление в одной семье
          </span>
        </h1>

        <p className="mt-8 max-w-2xl text-center text-base leading-relaxed text-white sm:text-xl">
          Приложение для семей, где детский спорт превратится в фундамент
          будущего предпринимателя
        </p>

        <section className="mt-10 w-full max-w-[480px] rounded-2xl border border-[#2a385a]/80 bg-[#070c1a]/70 p-4 shadow-[0_0_35px_rgba(8,32,58,0.75)] backdrop-blur sm:p-5">
          <LeadForm />
        </section>

        <section className="mx-auto mt-10 w-full max-w-[520px] rounded-[24px] border border-[#2a385a]/70 bg-[#070c1a]/70 px-6 py-4 text-center shadow-[inset_0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur">
          <p className="text-[10px] uppercase tracking-[0.36em] text-slate-500">
            По всем вопросам
          </p>
          <div className="mt-3 w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="mx-auto flex w-max max-w-none flex-nowrap items-center gap-x-2 text-[clamp(10px,3.4vw,15px)] text-slate-300 sm:gap-x-3">
              <a
                href="https://instagram.com/hryhorii.sportvisible"
                target="_blank"
                rel="noreferrer"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-[hsl(142_71%_45%)]"
              >
                Instagram @hryhorii.sportvisible
              </a>
              <span aria-hidden="true" className="inline shrink-0 px-px text-slate-600">
                ·
              </span>
              <a
                href="mailto:hryhorii@sportvisible.com"
                className="shrink-0 whitespace-nowrap transition-colors hover:text-[hsl(142_71%_45%)]"
              >
                Email hryhorii@sportvisible.com
              </a>
            </div>
          </div>
        </section>

        <p className="mt-8 text-center text-[10px] uppercase tracking-[0.38em] text-slate-600">
          Leesneel скоро • от базовых атлетов для базовых атлетов с любовью
        </p>
      </main>
    </div>
  );
}
