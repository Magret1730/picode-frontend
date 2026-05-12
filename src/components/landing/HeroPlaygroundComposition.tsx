/**
 * Layered hero visual — mini editor + preview + rewards. Static markup (no client JS).
 */
export function HeroPlaygroundComposition() {
  return (
    <div
      className="group/hero relative isolate mx-auto min-h-[200px] w-full max-w-[16.5rem] pb-6 pt-2 sm:min-h-[218px] sm:max-w-[18rem] lg:mx-0 lg:justify-self-end"
      role="img"
      aria-label="Layered coding preview: a small editor, live webpage preview, XP reward, and passed status"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-44 -translate-x-1/2 -translate-y-1/3 rounded-full bg-gradient-to-tr from-brand-blue/14 via-brand-pink/12 to-brand-yellow/10 blur-2xl dark:from-brand-blue/10 dark:via-brand-pink/8 dark:to-brand-yellow/8"
        aria-hidden
      />

      {/* +10 XP */}
      <div
        className="absolute -right-1 top-0 z-30 flex items-center rounded-full bg-brand-pink/22 px-2 py-0.5 text-[10px] font-extrabold text-foreground shadow-soft ring-1 ring-border/60 backdrop-blur-sm dark:bg-brand-pink/16 sm:px-2.5 sm:text-[11px]"
        aria-hidden
      >
        +10 XP
      </div>

      {/* Mini code editor */}
      <div
        className="absolute left-0 top-7 z-[1] w-[90%] max-w-[15.5rem] origin-top-left -rotate-[0.55deg] rounded-xl border border-white/12 bg-gradient-to-b from-[color-mix(in_oklab,#0f172a_94%,var(--brand-blue)_6%)] to-[color-mix(in_oklab,#020617_92%,var(--brand-pink)_4%)] p-2.5 shadow-soft ring-1 ring-black/20 transition duration-300 ease-out will-change-transform [box-shadow:0_8px_24px_rgba(15,23,42,0.35)] group-hover/hero:-translate-y-1 group-hover/hero:-rotate-[0.35deg] group-hover/hero:shadow-[0_12px_32px_rgba(15,23,42,0.28)] dark:border-white/8 dark:from-[color-mix(in_oklab,var(--card)_40%,#020617)] dark:to-[color-mix(in_oklab,#020617_88%,var(--brand-blue)_12%)] dark:ring-white/5 dark:[box-shadow:0_8px_28px_rgba(0,0,0,0.45)] dark:group-hover/hero:shadow-[0_14px_36px_rgba(0,0,0,0.5)] sm:top-8 sm:p-3"
        aria-hidden
      >
        <div className="mb-2 flex items-center gap-2 border-b border-white/10 pb-1.5 dark:border-white/8">
          <div className="flex gap-1">
            <span className="size-1.5 rounded-full bg-[#ff6b7a]/90" />
            <span className="size-1.5 rounded-full bg-[#fbbf24]/90" />
            <span className="size-1.5 rounded-full bg-[#4ade80]/85" />
          </div>
          <span className="truncate font-mono text-[9px] font-medium text-slate-400 sm:text-[10px]">
            about.html
          </span>
        </div>
        <pre className="font-mono text-[9px] leading-relaxed text-slate-300 sm:text-[10px] sm:leading-relaxed">
          <span className="text-brand-pink">&lt;h1&gt;</span>
          <span className="text-slate-100">Mia</span>
          <span className="text-brand-pink">&lt;/h1&gt;</span>
          {"\n"}
          <span className="text-brand-pink">&lt;p&gt;</span>
          <span className="text-slate-100">Hi! I love art.</span>
          <span className="text-brand-pink">&lt;/p&gt;</span>
        </pre>
      </div>

      {/* Mini webpage preview */}
      <div
        className="absolute bottom-11 right-0 z-[2] w-[76%] max-w-[13.5rem] rotate-[0.65deg] rounded-xl border border-border/50 bg-gradient-to-br from-card/95 to-[color-mix(in_oklab,var(--surface-2)_75%,var(--card))] p-2.5 shadow-soft ring-1 ring-black/5 transition duration-300 ease-out [box-shadow:0_10px_28px_rgba(17,24,39,0.12)] will-change-transform group-hover/hero:-translate-y-1.5 group-hover/hero:rotate-[0.4deg] group-hover/hero:shadow-[var(--shadow)] dark:border-border/40 dark:from-card/90 dark:to-[color-mix(in_oklab,var(--surface-2)_50%,var(--card))] dark:ring-white/10 dark:[box-shadow:0_12px_32px_rgba(0,0,0,0.35)] dark:group-hover/hero:shadow-[var(--shadow)] sm:bottom-12 sm:p-3"
        aria-hidden
      >
        <p className="text-[10px] font-extrabold leading-tight text-foreground sm:text-[11px]">
          Hello, I&apos;m Mia! <span className="opacity-90">👋</span>
        </p>
        <div className="mt-1.5 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent opacity-80" />
        <p className="mt-1.5 text-[9px] leading-snug text-muted-foreground sm:text-[10px]">
          Tiny page, big smile.
        </p>
      </div>

      {/* Passed! */}
      <div
        className="absolute bottom-2 left-0 z-[3] flex items-center gap-1 rounded-full border border-brand-green/30 bg-[color-mix(in_oklab,var(--brand-green)_12%,var(--card))] px-2 py-0.5 text-[9px] font-extrabold text-foreground shadow-sm ring-1 ring-brand-green/20 backdrop-blur-sm dark:bg-[color-mix(in_oklab,var(--brand-green)_10%,var(--surface-2))] sm:text-[10px]"
        aria-hidden
      >
        <span className="flex size-3.5 items-center justify-center rounded-full bg-brand-green/25 text-[10px] leading-none text-[color:var(--brand-green)]">
          ✓
        </span>
        Passed!
      </div>
    </div>
  );
}
