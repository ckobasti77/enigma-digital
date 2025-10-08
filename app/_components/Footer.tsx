import Link from "next/link";
import { navLinks } from "@/constants/navLinks";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

const services = navLinks.find((link) => link.dropdownLinks)?.dropdownLinks ?? [];
const primaryLinks = navLinks.filter((link) => !link.dropdownLinks && !link.cta);

export default function Footer() {
  return (
    <footer className="theme-section border-t border-theme px-6 py-16 transition-theme">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.6em] text-cyan-400">
                Enigma Digital
              </span>
              <h2 className="max-w-lg font-aeonik text-3xl font-medium text-theme-primary md:text-4xl">
                Shipping brand-defining experiences with accountable engineering.
              </h2>
              <p className="max-w-xl text-sm leading-relaxed text-theme-muted">
                Strategy, design, and engineering move together so every launch lifts the metrics that matter. We embed squads that plug into your product team and keep momentum high from kickoff to iteration.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-theme hover:opacity-90"
              >
                Start a project
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="mailto:hello@enigma.digital"
                className="inline-flex items-center gap-2 rounded-full border border-theme px-6 py-3 text-sm font-medium text-theme-primary transition-theme hover:bg-muted"
              >
                hello@enigma.digital
              </Link>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-theme-muted">
                Company
              </h3>
              <ul className="space-y-3 text-sm text-theme-muted">
                {primaryLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.to}
                      className="group inline-flex items-center gap-2 transition-theme hover:text-theme-primary"
                    >
                      <span>{link.text}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-theme-muted opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-theme-muted">
                Services
              </h3>
              <ul className="space-y-3 text-sm text-theme-muted">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services/${service.to}`}
                      className="group inline-flex items-center gap-2 transition-theme hover:text-theme-primary"
                    >
                      <span>{service.headline}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 sm:col-span-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-theme-muted">
                Visit & connect
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-2xl border border-theme theme-card p-4 transition-theme hover:-translate-y-1 hover:shadow-theme">
                  <MapPin className="mt-0.5 h-5 w-5 text-cyan-400" aria-hidden="true" />
                  <div className="text-sm text-theme-muted">
                    <p className="font-semibold text-theme-primary">Europe / Remote-first</p>
                    <p>Partnering with teams across EMEA & North America.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-theme theme-card p-4 transition-theme hover:-translate-y-1 hover:shadow-theme">
                  <Phone className="mt-0.5 h-5 w-5 text-cyan-400" aria-hidden="true" />
                  <div className="text-sm text-theme-muted">
                    <p className="font-semibold text-theme-primary">Call</p>
                    <Link href="tel:+442045771943" className="transition-theme hover:text-theme-primary">
                      +44 20 4577 1943
                    </Link>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-2xl border border-theme theme-card p-4 transition-theme hover:-translate-y-1 hover:shadow-theme">
                  <Mail className="mt-0.5 h-5 w-5 text-cyan-400" aria-hidden="true" />
                  <div className="text-sm text-theme-muted">
                    <p className="font-semibold text-theme-primary">Email</p>
                    <Link href="mailto:hello@enigma.digital" className="transition-theme hover:text-theme-primary">
                      hello@enigma.digital
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-theme pt-6 text-sm text-theme-muted md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Enigma Digital. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="transition-theme hover:text-theme-primary">
              Privacy policy
            </Link>
            <Link href="/terms" className="transition-theme hover:text-theme-primary">
              Terms of service
            </Link>
            <Link href="/brand" className="transition-theme hover:text-theme-primary">
              Brand guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

