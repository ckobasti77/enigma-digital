'use client';

import {
  ArrowUpRight,
  Award,
  Compass,
  Lightbulb,
  Sparkles,
  Target,
  Timer,
  Users,
} from 'lucide-react';

const studioMetrics = [
  { label: 'Vođena lansiranja', value: '48' },
  { label: 'Senior specijalisti', value: '18' },
  { label: 'Pokrivene vremenske zone', value: '5' },
];

const principles = [
  {
    icon: Target,
    title: 'Uticaj ispred output-a',
    copy: 'Every sprint anchors to the commercial bet we’re helping you win. If it doesn’t move a metric, it doesn’t ship.',
  },
  {
    icon: Sparkles,
    title: 'Craft kroz sisteme',
    copy: 'Dizajn jezici, kod standardi i rituali koji se skaliraju sa vašim timom dugo posle lansiranja.',
  },
  {
    icon: Users,
    title: 'Partnerstvo, ne samo predaja',
    copy: 'Radimo uz osnivače i product lidere, obučavamo interne timove i istovremeno isporučujemo zamah.',
  },
];

const studioMilestones = [
  {
    year: '2021',
    heading: 'Studio osnovan u Mančesteru',
    text: 'Enigma Digital počinje kao distribuirani kolektiv za rane venture timove koji traže traction.',
  },
  {
    year: '2022',
    heading: 'Skalirani timovi za Series A brendove',
    text: 'Ugrađeni hibridni timovi isporučuju growth loop-ove i dizajn sisteme za B2B SaaS i travel marketplace-e.',
  },
  {
    year: '2024',
    heading: 'Globalna partnerstva počinju',
    text: 'Isporuka kroz vremenske zone, sa satelitskim timovima u Dubaiju i Barseloni, donosi 24/5 pokrivenost za enterprise innovation lab-ove.',
  },
];

const leadership = [
  {
    name: 'Leah Mercer',
    role: 'Partner, product strategija',
    focus: 'Bivša VP Product u venture-backed SaaS timu, sada arhitektuje product opklade i OKR operativne modele.',
  },
  {
    name: 'Ravi Khanna',
    role: 'Partner, inženjering',
    focus: '15 godina iskustva u fintech-u i infrastrukturi. Zastupa type-safe stack-ove, DevOps zrelost i merljivu pouzdanost.',
  },
  {
    name: 'Zoë Haddad',
    role: 'Partner, dizajn i istraživanje',
    focus: 'Dizajn liderka iza nagrađivanih lansiranja na više tržišta. Fokusirana na pristupačnost i inkluzivnu izradu.',
  },
];

export default function About() {
  return (
    <div className="theme-section transition-theme text-theme-primary">
      <section className="relative overflow-hidden px-6 py-24">
        <div
          className="pointer-events-none absolute inset-x-0 -top-24 h-[420px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),rgba(168,85,247,0.1)_45%,rgba(15,23,42,0)_80%)] blur-[140px]"
          aria-hidden
        />
        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 lg:flex-row">
          <div className="space-y-6 lg:w-3/5">
            <div className="inline-flex items-center gap-2 rounded-full border border-theme px-4 py-2 text-xs uppercase tracking-[0.45em] text-cyan-300">
              <Compass className="h-4 w-4" />
              Naš studio
            </div>
            <h1 className="font-aeonik text-4xl font-medium leading-tight text-theme-primary md:text-5xl">
              Partneri smo timovima koji odbijaju prosečnu isporuku
            </h1>
            <p className="max-w-xl text-base leading-relaxed text-theme-muted">
              Enigma Digital je remote-first tim stratega, dizajnera i inženjera koji gradi proizvode koji radoznalost pretvaraju u zadržavanje korisnika. Vodimo discovery fazu, brzo prototipujemo i timovima ostavljamo playbook-e koje mogu da koriste bez nas.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {studioMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-theme theme-card px-5 py-6 text-center shadow-theme"
                >
                  <div className="text-3xl font-semibold text-theme-primary">{metric.value}</div>
                  <p className="mt-2 text-xs uppercase tracking-[0.28em] text-theme-muted">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex-1 overflow-hidden rounded-3xl border border-theme theme-card p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(168,85,247,0.32),rgba(15,23,42,0)_65%)] opacity-60" />
            <div className="relative space-y-5">
              <h2 className="text-lg font-semibold text-theme-primary">Kako izgleda rad sa nama</h2>
              <ul className="space-y-4 text-sm text-theme-muted">
                <li className="flex items-start gap-3">
                  <Lightbulb className="mt-1 h-5 w-5 text-cyan-300" aria-hidden />
                  Discovery radionice koje već prve nedelje otkrivaju stvarna ograničenja.
                </li>
                <li className="flex items-start gap-3">
                  <Timer className="mt-1 h-5 w-5 text-cyan-300" aria-hidden />
                  Nedeljni demo prikazi, asinhroni snimci i vidljivost kroz board-ove održavaju zamah.
                </li>
                <li className="flex items-start gap-3">
                  <Award className="mt-1 h-5 w-5 text-cyan-300" aria-hidden />
                  Isporučeni materijali - od prezentacija do produkcionog koda - spremni su za skaliranje bez dorade.
                </li>
              </ul>
              <button className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-theme hover:opacity-90">
                Upoznajte partnere <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24">
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] text-cyan-300">Principi</span>
            <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">
              Principi koji svako partnerstvo drže smelim i merljivim
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-theme-muted">
              Product strategiju, istraživanje, dizajn i inženjering spajamo u jedan operativni sistem. Ovi principi nas drže usklađenim sa vašim leadership timom od početka do predaje.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="group relative overflow-hidden rounded-3xl border border-theme theme-card transition-theme card-lift transform-gpu translate-y-0 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-theme"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
                  background: 'linear-gradient(140deg, rgba(56,189,248,0.16), rgba(168,85,247,0.14))',
                  mixBlendMode: 'screen',
                }} />
                <div className="relative space-y-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-theme theme-card text-cyan-200">
                    <principle.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="text-lg font-semibold text-theme-primary">{principle.title}</h3>
                  <p className="text-sm leading-relaxed text-theme-muted">{principle.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 lg:flex-row">
          <div className="max-w-md space-y-6">
            <span className="text-xs uppercase tracking-[0.5em] text-cyan-300">Prekretnice</span>
            <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">
              Od prvog dana građeni za distribuiranu ambiciju
            </h2>
            <p className="text-sm leading-relaxed text-theme-muted">
              Radimo kao produžetak vaše product organizacije. Remote rituali, asinhroni alati i povremena okupljanja drže donosioce odluka usklađenim kroz regione.
            </p>
          </div>
          <div className="flex-1 space-y-8">
            {studioMilestones.map((milestone) => (
              <div key={milestone.year} className="grid gap-4 rounded-3xl border border-theme theme-card p-6 md:grid-cols-[120px_1fr]">
                <div className="flex items-start">
                  <span className="rounded-full border border-theme px-3 py-1 text-xs uppercase tracking-[0.35em] text-cyan-300">
                    {milestone.year}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-theme-primary">{milestone.heading}</h3>
                  <p className="text-sm leading-relaxed text-theme-muted">{milestone.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          <div className="flex flex-col gap-4 text-center">
            <span className="mx-auto text-xs uppercase tracking-[0.5em] text-cyan-300">Leadership krug</span>
            <h2 className="text-3xl font-medium text-theme-primary md:text-4xl">Partneri koji ostaju blizu rada</h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-theme-muted">
              Svaki angažman zajedno vode partneri koji su isporučivali proizvode za venture scaleup-e, globalne travel brendove i regulisani fintech. Ostajemo u ritualima, ne samo na status pozivima.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {leadership.map((leader) => (
              <article
                key={leader.name}
                className="relative overflow-hidden rounded-3xl border border-theme theme-card p-6 text-left"
              >
                <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-theme theme-card-muted text-xs uppercase tracking-[0.4em] text-theme-muted">
                  Mesto za portret tima
                </div>
                <div className="mt-5 space-y-2">
                  <h3 className="text-lg font-semibold text-theme-primary">{leader.name}</h3>
                  <p className="text-sm font-medium text-cyan-300">{leader.role}</p>
                  <p className="text-sm leading-relaxed text-theme-muted">{leader.focus}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}













