"use client";

import { useEffect, useRef, useState } from "react";
import {
  site,
  now,
  highlights,
  caseStudies,
  experience,
  education,
  contact,
  type CaseStudy,
} from "@/data/content";

// ─── Theme Toggle ────────────────────────────────────────────────────────────

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <button
      onClick={toggle}
      className="rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-text)] transition-colors"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

// ─── Scroll observer hook ────────────────────────────────────────────────────

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ─── Navigation ──────────────────────────────────────────────────────────────

const navLinks = [
  { href: "#case-studies", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#contact", label: "Contact" },
];

function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="font-mono text-lg font-semibold text-[var(--color-accent)]">
          {site.displayName}
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            className="text-[var(--color-text-secondary)]"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-6 py-4 md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)]"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      <div className="max-w-3xl text-center">
        <p className="mb-4 font-mono text-sm text-[var(--color-accent)]">
          {site.keywords.join(" · ")}
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          {site.title}
        </h1>
        <p className="mb-8 text-lg text-[var(--color-text-secondary)]">
          {site.displayName} — Software developer building autonomous systems,
          developer tools, and AI-powered workflows.
        </p>
        <a
          href="#case-studies"
          className="inline-flex items-center gap-2 rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          See my work
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

// ─── Now ─────────────────────────────────────────────────────────────────────

function Now() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className={`px-6 py-16 ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
      <div className="mx-auto max-w-3xl rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-8">
        <h2 className="mb-3 font-mono text-sm font-semibold uppercase tracking-wider text-[var(--color-accent)]">
          {now.heading}
        </h2>
        <p className="text-[var(--color-text-secondary)]">{now.description}</p>
      </div>
    </section>
  );
}

// ─── Impact Highlights ───────────────────────────────────────────────────────

function Highlights() {
  const { ref, inView } = useInView();
  return (
    <section ref={ref} className="px-6 py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {highlights.map((h, i) => (
          <div
            key={i}
            className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 ${
              inView ? `animate-fade-in-up delay-${(i + 1) * 100}` : "opacity-0"
            }`}
          >
            <p className="mb-2 font-mono text-2xl font-bold text-[var(--color-accent)]">
              {h.metric}
            </p>
            <p className="text-sm text-[var(--color-text-secondary)]">{h.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Case Studies ────────────────────────────────────────────────────────────

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={`rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 lg:p-8 ${
        inView ? `animate-fade-in-up delay-${(index + 1) * 100}` : "opacity-0"
      } ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-mono text-xl font-bold text-[var(--color-accent)]">{study.title}</h3>
        {study.status === "coming-soon" && (
          <span className="rounded-full border border-[var(--color-border)] px-3 py-1 text-xs text-[var(--color-text-secondary)]">
            coming soon
          </span>
        )}
      </div>
      <p className="mb-6 text-[var(--color-text-secondary)]">{study.tagline}</p>

      <div className="space-y-4 text-sm">
        <div>
          <p className="mb-1 font-semibold text-[var(--color-text)]">Situation</p>
          <p className="text-[var(--color-text-secondary)]">{study.situation}</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-[var(--color-text)]">Decision</p>
          <p className="text-[var(--color-text-secondary)]">{study.decision}</p>
        </div>
        <div>
          <p className="mb-1 font-semibold text-[var(--color-text)]">Outcome</p>
          <p className="text-[var(--color-text-secondary)]">{study.outcome}</p>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-[var(--color-bg-secondary)] p-4">
        <p className="font-mono text-xs text-[var(--color-accent)]">{study.metric}</p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {study.tech.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--color-border)] px-3 py-1 font-mono text-xs text-[var(--color-text-secondary)]"
          >
            {t}
          </span>
        ))}
      </div>

      {study.github && study.status === "live" && (
        <a
          href={study.github}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:underline"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          View on GitHub
        </a>
      )}
    </div>
  );
}

function CaseStudies() {
  return (
    <section id="case-studies" className="px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-8 text-2xl font-bold">Featured Work</h2>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {caseStudies.map((study, i) => (
            <CaseStudyCard key={study.title} study={study} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ──────────────────────────────────────────────────────────────

function Experience() {
  const { ref, inView } = useInView();
  return (
    <section id="experience" ref={ref} className="px-6 py-16">
      <div className={`mx-auto max-w-3xl ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="mb-8 text-2xl font-bold">Experience</h2>
        <div className="space-y-8">
          {experience.map((exp) => (
            <div
              key={exp.company}
              className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6 lg:p-8"
            >
              <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-bold">{exp.company}</h3>
                  <p className="text-[var(--color-text-secondary)]">
                    {exp.title} · {exp.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-[var(--color-accent)]">{exp.period}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">{exp.type}</p>
                </div>
              </div>

              <ul className="mb-4 space-y-2">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex gap-2 text-sm text-[var(--color-text-secondary)]">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {bullet}
                  </li>
                ))}
              </ul>

              {"recentWork" in exp && exp.recentWork && (
                <div className="rounded-lg border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/5 p-4">
                  <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                    Recent Work
                  </p>
                  <ul className="space-y-1">
                    {exp.recentWork.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-[var(--color-text-secondary)]">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {"awards" in exp && exp.awards && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.awards.map((award) => (
                    <span
                      key={award}
                      className="rounded-full border border-[var(--color-accent)]/30 bg-[var(--color-accent)]/10 px-3 py-1 text-xs text-[var(--color-accent)]"
                    >
                      {award}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Education ───────────────────────────────────────────────────────────────

function Education() {
  const { ref, inView } = useInView();
  return (
    <section id="education" ref={ref} className="px-6 py-16">
      <div className={`mx-auto max-w-3xl ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="mb-8 text-2xl font-bold">Education</h2>
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu.school}
              className="flex items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-card)] p-6"
            >
              <div>
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{edu.school}</p>
              </div>
              <span className="font-mono text-sm text-[var(--color-accent)]">{edu.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  const { ref, inView } = useInView();
  return (
    <section id="contact" ref={ref} className="px-6 py-16">
      <div className={`mx-auto max-w-3xl text-center ${inView ? "animate-fade-in-up" : "opacity-0"}`}>
        <h2 className="mb-4 text-2xl font-bold">{contact.cta}</h2>
        <p className="mb-8 text-[var(--color-text-secondary)]">
          Open to Software Developer and AI Engineer roles. Let&apos;s talk.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--color-border)] px-6 py-3 text-sm hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 text-sm text-[var(--color-text-secondary)] sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="font-mono text-xs">{site.domain}</p>
      </div>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <a
        href="#case-studies"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:rounded-lg focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Navigation />
      <main>
        <Hero />
        <Now />
        <Highlights />
        <CaseStudies />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
