import { privacyPolicy } from "@/constants/privacy-policy";

export default function PrivacyPolicy() {
  return (
    <div className="theme-section transition-theme text-theme-primary">
      <section className="relative px-6 py-24">
        <div className="pointer-events-none absolute inset-x-0 -top-32 h-[420px] bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.2),rgba(168,85,247,0.12)_55%,rgba(15,23,42,0)_85%)] blur-[160px]" aria-hidden />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-12">
          <header className="space-y-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.6em] text-cyan-300">
              Privacy Policy
            </span>
            <h1 className="font-aeonik text-4xl font-medium leading-tight md:text-5xl">
              How Enigma Digital safeguards your data while shipping outcomes
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-theme-muted">
              This Privacy Policy explains what data we collect, why we collect it, and how we protect the individuals and teams who trust us with their projects. It applies to our website, client engagements, and related communications.
            </p>
            <div className="rounded-3xl border border-theme theme-card px-5 py-4 text-sm text-theme-muted transition-theme">
              <span className="font-semibold text-theme-primary">Last updated:</span> October 7, 2025
            </div>
          </header>

          <div className="grid gap-6">
            {privacyPolicy.map((section) => (
              <article
                key={section.title}
                className="group relative overflow-hidden rounded-3xl border border-theme theme-card p-6 transition-theme hover:-translate-y-1 hover:shadow-theme"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(135deg, rgba(56,189,248,0.18), rgba(168,85,247,0.14))',
                    mixBlendMode: 'screen',
                  }}
                />
                <div className="relative space-y-3">
                  <h2 className="text-lg font-semibold text-theme-primary">{section.title}</h2>
                  <p className="text-sm leading-relaxed text-theme-muted">{section.body}</p>
                </div>
              </article>
            ))}
          </div>

          <footer className="rounded-3xl border border-theme theme-card px-6 py-5 text-sm text-theme-muted transition-theme">
            <p>
              Need more detail or want to exercise your data rights? Email{' '}
              <a
                href="mailto:hello@enigma.digital"
                className="font-medium text-theme-primary transition-theme hover:text-cyan-300"
              >
                hello@enigma.digital
              </a>{' '}
              or call{' '}
              <a
                href="tel:+442045771943"
                className="font-medium text-theme-primary transition-theme hover:text-cyan-300"
              >
                +44 20 4577 1943
              </a>. We’ll respond as quickly as possible.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}
