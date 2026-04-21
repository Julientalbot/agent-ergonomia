"use client";

import { useState, useEffect, useRef } from "react";

/* ─── CSS-only Scroll Reveal via IntersectionObserver ─── */
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "-40px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useReveal();
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${className}`}>
      {children}
    </div>
  );
}

/* ─── FAQ accordion ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border-strong">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left cursor-pointer group"
      >
        <span className="font-serif font-medium text-lg pr-6 group-hover:text-accent transition-colors duration-200">
          {q}
        </span>
        <span
          className="text-muted-light text-xl leading-none shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0)" }}
        >
          +
        </span>
      </button>
      <div className={`faq-answer ${open ? "open" : ""}`}>
        <div>
          <p className="pb-5 text-muted leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Step number ─── */
function Step({ n }: { n: string }) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
      {n}
    </span>
  );
}

/* ─── Sticky CTA (mobile) ─── */
function StickyCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-cta ${show ? "show" : ""}`}>
      <a
        href="#booking"
        className="block w-full text-center btn-accent text-base"
      >
        Réserver un appel découverte →
      </a>
    </div>
  );
}

/* ─── Early Adopter — update when slots are taken ─── */
const EARLY_ADOPTER_TOTAL = 10;
const EARLY_ADOPTER_TAKEN = 0; // <-- update this number as clients sign
const EARLY_ADOPTER_LEFT = EARLY_ADOPTER_TOTAL - EARLY_ADOPTER_TAKEN;

/* ─── JSON-LD Structured Data ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://agent.ergonomia.re/#business",
      name: "Ergonomia",
      alternateName: "Agent IA sur-mesure — Ergonomia",
      description:
        "Agent IA sur-mesure configuré par un ergonome. Comprend votre travail, agit dessus, et vous aide sans que vous ayez à demander.",
      url: "https://agent.ergonomia.re",
      telephone: "+336****0740",
      image: "https://agent.ergonomia.re/opengraph-image",
      priceRange: "97€–197€/mois",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Saint-Denis",
        addressLocality: "Saint-Denis",
        addressRegion: "La Réunion",
        postalCode: "97400",
        addressCountry: "FR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -20.8823,
        longitude: 55.4504,
      },
      areaServed: {
        "@type": "Place",
        name: "La Réunion (974)",
      },
      sameAs: ["https://www.linkedin.com/in/julien-talbot-ergonome/"],
      founder: {
        "@type": "Person",
        "@id": "https://agent.ergonomia.re/#person",
      },
    },
    {
      "@type": "Person",
      "@id": "https://agent.ergonomia.re/#person",
      name: "Julien Talbot",
      jobTitle: "Ergonome",
      knowsAbout: [
        "Intelligence artificielle",
        "Ergonomie",
        "Conditions de travail",
        "Agents IA",
        "Automatisation",
      ],
      sameAs: ["https://www.linkedin.com/in/julien-talbot-ergonome/"],
    },
    {
      "@type": "Service",
      "@id": "https://agent.ergonomia.re/#service",
      name: "Configuration d'agent IA sur-mesure",
      description:
        "Un ergonome analyse votre travail réel, configure un agent IA personnalisé et proactif, et assure un ajustement continu mensuel.",
      provider: { "@id": "https://agent.ergonomia.re/#business" },
      areaServed: {
        "@type": "Place",
        name: "La Réunion (974)",
      },
      serviceType: "Agent IA sur-mesure",
      offers: [
        {
          "@type": "Offer",
          name: "Early Adopter",
          description:
            "10 premières places : installation gratuite, puis 97€/mois",
          price: "97",
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: 97,
            priceCurrency: "EUR",
            billingDuration: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
          },
          availability: "https://schema.org/LimitedAvailability",
          offerCount: 10,
        },
        {
          "@type": "Offer",
          name: "Tarif normal",
          description: "497€ installation + 197€/mois",
          priceSpecification: [
            {
              "@type": "UnitPriceSpecification",
              price: 497,
              priceCurrency: "EUR",
              billingIncrement: 1,
            },
            {
              "@type": "UnitPriceSpecification",
              price: 197,
              priceCurrency: "EUR",
              billingDuration: {
                "@type": "QuantitativeValue",
                value: 1,
                unitCode: "MON",
              },
            },
          ],
        },
      ],
    },
  ],
};

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
      {/* ─── HERO ─── */}
      <section className="relative pt-24 pb-28 md:pt-36 md:pb-44 grain">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-card-alt border-2 border-accent/20 flex items-center justify-center overflow-hidden shadow-sm mb-6">
                <img src="/julien-portrait.jpg" className="w-full h-full object-cover" alt="Julien Talbot" />
              </div>
              <p className="text-sm text-muted font-medium mb-1">Julien Talbot — Ergonome, La Réunion</p>
            </div>
          </Reveal>

          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-8 text-center">
              Agent IA sur-mesure
            </p>
          </Reveal>

          <Reveal>
            <h1
              className="font-serif font-medium leading-[1.08] tracking-tight text-center"
              style={{ fontSize: "clamp(1.75rem, 1rem + 3.2vw, 3.2rem)" }}
            >
              Votre agent IA dort dans un coin.
              <br />
              <span className="text-muted">
                Normal — personne n&apos;a compris votre travail avant de le
                configurer.
              </span>
            </h1>
          </Reveal>

          <Reveal>
            <p className="mt-8 text-lg text-muted leading-relaxed max-w-xl text-center mx-auto" style={{ lineHeight: "1.7" }}>
              J&apos;observe votre travail, je configure votre agent, il agit à votre place.
            </p>
          </Reveal>

          <Reveal>
            <div className="text-center">
              <a href="#booking" className="inline-block mt-10 btn-outline">
                Réserver un appel découverte →
              </a>
              <p className="mt-3 text-sm text-muted-light">Sans engagement</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── PROBLÈME (dark break) ─── */}
      <section className="relative bg-dark py-28 md:py-36 grain">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-light mb-4">
              Le problème
            </p>
            <h2
              className="font-serif font-medium leading-[1.12] tracking-tight text-card"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              40 % des projets IA échouent.
              <br />
              <span className="text-dark-muted">Pas à cause de la technologie.</span>
            </h2>
          </Reveal>

          <div className="mt-16 space-y-10 stagger-1">
            {[
              {
                num: "01",
                title: "L'abonnement qui prend la poussière",
                text: "Vous payez 20 € par mois un outil IA que vous n'ouvrez plus. Vous savez qu'il pourrait servir. Vous ne savez pas à quoi.",
              },
              {
                num: "02",
                title: "Le bot qui ne connaît pas votre métier",
                text: "Vous lui demandez un truc simple. Il vous répond comme à un inconnu. Vous passez plus de temps à le corriger qu'à faire le travail vous-même.",
              },
              {
                num: "03",
                title: "La démo qui n'a jamais rien donné",
                text: "Un consultant a installé quelque chose il y a six mois. Ça a marché une fois en réunion. Depuis, silence. Personne n'ose l'avouer.",
              },
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="flex gap-6">
                  <div className="shrink-0 w-12">
                    <span className="font-mono text-accent-light text-sm">{item.num}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-xl text-card mb-2">
                      {item.title}
                    </h3>
                    <p className="text-dark-muted leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOLUTION ─── */}
      <section className="relative py-28 md:py-36">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              La méthode
            </p>
            <h2
              className="font-serif font-medium leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              Un ergonome configure votre agent
            </h2>
          </Reveal>

          <div className="mt-16 space-y-0 divide-y divide-border stagger-1">
            {[
              {
                step: "Étape 01",
                title: "Entretien",
                text: "J'analyse votre travail réel : tâches, outils, irritants, ce que vous oubliez. Pas un questionnaire — un vrai dialogue.",
              },
              {
                step: "Étape 02",
                title: "Configuration & proactivité",
                text: "Je configure un agent qui comprend VOTRE contexte. Il rappelle, suggère, agit — et s'améliore chaque mois sans que vous ayez à demander.",
              },
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="py-8 first:pt-0 last:pb-0">
                  <Step n={item.step} />
                  <h3 className="font-serif text-xl mt-2 mb-2">{item.title}</h3>
                  <p className="text-muted leading-relaxed max-w-lg">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONCRÈTEMENT ─── */}
      <section className="relative bg-dark py-28 md:py-36 grain">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-light mb-4">
              Concrètement
            </p>
            <h2
              className="font-serif font-medium leading-[1.12] tracking-tight text-card"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              Un lundi matin sans stress
            </h2>
          </Reveal>

          <div className="mt-16 space-y-8 stagger-1">
            {[
              {
                action: "Vous arrivez, votre agent a déjà relancé les 3 devis en attente.",
                context: "Relances",
              },
              {
                action: "Il a repéré un conflit dans votre agenda de jeudi et proposé un créneau de remplacement.",
                context: "Agenda",
              },
              {
                action: "Le compte-rendu de votre réunion d'hier est prêt, classé dans le bon dossier.",
                context: "Documents",
              },
              {
                action: "Un client vous a écrit à 7h12 — votre agent a préparé une réponse que vous validez en un clic.",
                context: "Email",
              },
              {
                action: "Il vous rappelle que la déclaration URSSAF est due vendredi.",
                context: "Échéances",
              },
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="flex gap-6 items-start">
                  <div className="shrink-0 w-16">
                    <span className="font-mono text-accent-light text-xs tracking-wider">{item.context}</span>
                  </div>
                  <p className="text-dark-muted leading-relaxed text-lg" style={{ lineHeight: "1.7" }}>
                    {item.action}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-14 text-card leading-relaxed max-w-xl text-lg" style={{ lineHeight: "1.7" }}>
              Pas de commande à donner. Pas de prompt à écrire.
              <br />
              <span className="text-accent-light font-medium">L'agent agit parce qu'il vous connaît.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="relative py-28 md:py-36 bg-card">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              Tarifs
            </p>
            <h2
              className="font-serif font-medium leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              Early Adopter
            </h2>
          </Reveal>

          <Reveal>
            <div className="mt-10 p-8 md:p-10 rounded-lg border border-accent bg-background">
              <div className="flex items-center gap-3 mb-6" aria-label={`${EARLY_ADOPTER_LEFT} places restantes sur ${EARLY_ADOPTER_TOTAL}`}>
                <div className="flex gap-1.5">
                  {Array.from({ length: EARLY_ADOPTER_TOTAL }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-2 w-5 rounded-sm ${
                        i < EARLY_ADOPTER_TAKEN ? "bg-muted-lighter" : "bg-accent"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-muted text-sm font-mono">
                  <span className="text-accent font-medium">{EARLY_ADOPTER_LEFT}</span> / {EARLY_ADOPTER_TOTAL} places restantes
                </p>
              </div>

              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-5xl font-serif font-medium text-foreground">
                  0&nbsp;€
                </span>
                <span className="text-muted">
                  d&apos;installation{" "}
                  <span className="line-through text-muted-lighter">497&nbsp;€</span>
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-4xl font-serif font-medium text-foreground">
                  97&nbsp;€
                </span>
                <span className="text-muted">/mois</span>
              </div>

              <ul className="space-y-3 mb-10 text-muted">
                {[
                  "Entretien de compréhension de votre activité",
                  "Agent IA personnalisé et proactif",
                  "Support et ajustement continu",
                  "Hébergement inclus",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="text-accent mt-1.5 shrink-0 text-[8px]">■</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#booking" className="btn-primary">
                Prendre ma place →
              </a>
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-6 text-sm text-muted-light text-center">
              Option on-site : +1&nbsp;500&nbsp;€ (Mac Mini dédié chez vous)
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-2 text-xs text-muted-lighter text-center">
              Tarif normal après les 10 premières places : 497&nbsp;€ installation + 197&nbsp;€/mois
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-28 md:py-36">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              Questions fréquentes
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10">
              <FAQItem
                q="C'est quoi exactement un agent IA ?"
                a="Un assistant IA personnel, connecté à vos outils (email, calendrier, etc.), qui agit de manière proactive à partir d'une compréhension fine de votre travail."
              />
              <FAQItem
                q="En quoi c'est différent de ChatGPT ?"
                a="ChatGPT attend que vous posiez une question. Mon agent connaît votre travail et agit de lui-même."
              />
              <FAQItem
                q="Combien de temps avant que ce soit utile ?"
                a="Dès la première semaine. L'entretien d'intégration identifie des gains rapides immédiatement."
              />
              <FAQItem
                q="Mes données sont-elles en sécurité ?"
                a="Votre agent tourne sur un serveur européen, conforme RGPD. Vos données restent les vôtres."
              />
              <FAQItem
                q="Je peux annuler quand je veux ?"
                a="Oui, sans engagement après le premier mois."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── BOOKING ─── */}
      <section id="booking" className="relative bg-dark py-28 md:py-36 grain">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-black border-2 border-accent/30 flex items-center justify-center overflow-hidden mx-auto mb-6">
              <img src="/julien-portrait.jpg" className="w-full h-full object-cover" alt="Julien Talbot" />
            </div>
            <p className="text-sm text-dark-muted font-medium mb-8">
              Julien Talbot — Ergonome IA, La Réunion
            </p>
          </Reveal>

          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-light mb-4">
              Sans engagement
            </p>
            <h2
              className="font-serif font-medium leading-[1.12] tracking-tight text-card"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              Voir si un agent peut vous aider
            </h2>
          </Reveal>

          <Reveal>
            <p className="mt-4 text-dark-muted text-lg" style={{ lineHeight: "1.7" }}>
              30 minutes d&apos;entretien sans carte bleue demandée. Vous voyez d&apos;abord, vous décidez après.
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-12">
              <a
                href="https://cal.com/julien-talbot-ergonome/decouverte"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent"
              >
                Réserver mon appel découverte →
              </a>
              <p className="mt-4 text-sm text-dark-muted">
                30 min · Gratuit · Sans engagement
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 border-t border-dark-border bg-dark">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm text-dark-muted">
          <div className="flex flex-col gap-1">
            <p>&copy; {new Date().getFullYear()} Ergonomia — Julien Talbot</p>
            <a
              href="mailto:julien.talbot@ergonomia.re"
              className="text-accent-light hover:text-accent transition-colors duration-200"
            >
              julien.talbot@ergonomia.re
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <a
              href="https://www.linkedin.com/in/julien-talbot-ergonome/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light hover:text-accent transition-colors duration-200"
            >
              LinkedIn
            </a>
            <span className="text-dark-border">·</span>
            <a href="/mentions-legales" className="text-dark-muted hover:text-accent transition-colors duration-200">
              Mentions légales
            </a>
          </div>
        </div>
      </footer>
    </main>

    {/* ─── Sticky CTA (mobile only) ─── */}
    <StickyCTA />
    </>
  );
}
