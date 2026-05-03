"use client";

/* eslint-disable react/no-unescaped-entities, @next/next/no-img-element */

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
function FAQItem({ q, a, initiallyOpen = false }: { q: string; a: string; initiallyOpen?: boolean }) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <div className="border-b border-border-strong">
      <button
        aria-expanded={open}
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

/* ─── Utility components ─── */
function Step({ n }: { n: string }) {
  return (
    <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase">
      {n}
    </span>
  );
}

function AgentProofPanel() {
  const rows = [
    ["07:42", "Mail client détecté", "réponse préparée, validation requise"],
    ["08:05", "Échéance vendredi", "rappel ajouté, aucun envoi automatique"],
    ["08:18", "Dossier incomplet", "question posée avant action"],
  ];

  return (
    <aside className="proof-panel" aria-label="Exemple de routine agent cadrée">
      <div className="flex items-center justify-between gap-4 border-b border-dark-border px-5 py-4">
        <div>
          <p className="font-mono text-[0.68rem] tracking-[0.18em] uppercase text-accent-light">
            Routine cadrée
          </p>
          <p className="mt-1 text-card font-medium">Relance client avec validation humaine</p>
        </div>
        <span className="status-dot" aria-hidden="true" />
      </div>
      <div className="divide-y divide-dark-border">
        {rows.map(([time, event, result]) => (
          <div key={time} className="proof-row">
            <span className="font-mono text-xs text-accent-light">{time}</span>
            <div>
              <p className="text-card">{event}</p>
              <p className="text-sm text-dark-muted">{result}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-dark-border bg-black/15 px-5 py-4">
        <p className="text-sm text-dark-muted">
          L’agent ne remplace pas votre jugement. Il prépare, signale et s’arrête quand le cadre n’est pas assez clair.
        </p>
      </div>
    </aside>
  );
}

function ValidationFlow() {
  const steps = [
    ["Mémoire utile", "clients, dossiers, routines, préférences"],
    ["Brouillon", "l’agent prépare sans envoyer"],
    ["Validation", "vous décidez ce qui part"],
    ["Trace", "action retrouvable et récupérable"],
  ];

  return (
    <div className="validation-flow" aria-label="Cadre de validation de l'agent">
      {steps.map(([title, text], index) => (
        <div key={title} className="validation-step">
          <span className="font-mono text-xs text-accent">0{index + 1}</span>
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted">{text}</p>
          </div>
        </div>
      ))}
    </div>
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

const AUDIT_IA_TRAVAIL_REEL_PAGE_URL = "/audit-ia-travail-reel";

/* ─── JSON-LD Structured Data ─── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://agent.ergonomia.re/#business",
      name: "Ergonomia",
      alternateName: "Agent IA sur-mesure — brique avancée Ergonomia",
      description:
        "Brique avancée pour organisations dont le travail réel est déjà assez compris : agent IA configuré par un ergonome, avec cadre d’action, validation et traçabilité.",
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
      serviceType: "Agent IA sur-mesure — brique avancée",
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
      <header className="site-header">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <a href="#top" className="font-mono text-xs tracking-[0.18em] uppercase text-foreground">
            Ergonomia · IA dans le travail réel
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted">
            <a href="#methode" className="hover:text-accent transition-colors">Méthode</a>
            <a href="#agent" className="hover:text-accent transition-colors">Agent</a>
            <a href="#securite" className="hover:text-accent transition-colors">Sécurité</a>
            <a href="#tarifs" className="hover:text-accent transition-colors">Tarifs</a>
          </nav>
          <a href="#booking" className="hidden sm:inline-block btn-outline !py-2 !px-4">Appel découverte →</a>
        </div>
      </header>

      <main id="top">
      {/* ─── HERO ─── */}
      <section className="relative pt-20 pb-24 md:pt-32 md:pb-32 grain overflow-hidden">
        <div className="hero-grid max-w-6xl mx-auto px-6">
          <div>
            <Reveal>
              <p className="section-kicker">Agent IA cadré</p>
            </Reveal>

            <Reveal>
              <h1
                className="font-serif font-medium leading-[1.04] tracking-tight"
                style={{ fontSize: "clamp(2.35rem, 1.2rem + 5vw, 5rem)" }}
              >
                Un agent IA devient utile quand le travail est cadré.
              </h1>
            </Reveal>

            <Reveal>
              <p className="mt-7 text-lg md:text-xl text-muted leading-relaxed max-w-2xl" style={{ lineHeight: "1.68" }}>
                Je configure des agents qui préparent, surveillent, relancent et alertent dans vos routines réelles, avec des règles visibles et des points de validation là où votre jugement compte.
              </p>
            </Reveal>

            <Reveal>
              <div className="mt-8 flex flex-wrap gap-2 text-xs font-mono uppercase tracking-[0.12em] text-muted">
                <span className="trust-pill">Routine d’abord</span>
                <span className="trust-pill">Validation humaine</span>
                <span className="trust-pill">Actions traçables</span>
              </div>
            </Reveal>

            <Reveal>
              <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
                <a href="#booking" className="btn-primary text-center">
                  Vérifier si mon cas est prêt →
                </a>
                <a href="#agent" className="btn-outline text-center">
                  Voir l’agent en action
                </a>
              </div>
              <p className="mt-4 text-sm text-muted-light">30 min · Gratuit · Sans carte bancaire</p>
            </Reveal>
          </div>

          <Reveal>
            <div className="hero-side">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-card-alt border border-border-strong flex items-center justify-center overflow-hidden shadow-sm">
                  <img src="/julien-portrait.jpg" className="w-full h-full object-cover" alt="Julien Talbot" />
                </div>
                <div>
                  <p className="font-medium">Julien Talbot</p>
                  <p className="text-sm text-muted">Ergonome · La Réunion</p>
                </div>
              </div>
              <AgentProofPanel />
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
              Les projets IA se coincent rarement sur le modèle.
              <br />
              <span className="text-dark-muted">Ils se coincent quand le travail à déléguer n’est pas défini.</span>
            </h2>
          </Reveal>

          <div className="mt-16 space-y-10 stagger-1">
            {[
              {
                num: "01",
                title: "L’abonnement IA qui dort",
                text: "L’outil est là. Il pourrait servir. Mais aucun cas précis n’a été choisi, donc personne ne sait quand l’ouvrir.",
              },
              {
                num: "02",
                title: "L’assistant qui ne connaît pas votre métier",
                text: "Vous lui demandez une tâche simple. Il répond sans vos règles, vos clients, vos exceptions. La correction prend plus de temps que le gain.",
              },
              {
                num: "03",
                title: "La démo qui reste une démo",
                text: "Quelque chose a été installé. Ça a fonctionné une fois en réunion. Sans routine propriétaire, personne ne sait comment l’intégrer au travail quotidien.",
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
      <section id="methode" className="relative py-28 md:py-36">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              La méthode
            </p>
            <h2
              className="font-serif font-medium leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              Un agent seulement après compréhension du travail
            </h2>
          </Reveal>

          <div className="mt-16 space-y-0 divide-y divide-border stagger-1">
            {[
              {
                step: "Étape 01",
                title: "Entretien",
                text: "J’observe votre travail réel : tâches, outils, irritants, exceptions, validations et limites. Si le cas est trop flou, on commence par l’audit IA du travail réel.",
              },
              {
                step: "Étape 02",
                title: "Configuration & proactivité",
                text: "Je configure seulement les routines qui ont un cadre clair : rappel, préparation, classement, surveillance, brouillon, alerte. Les actions sensibles restent validables.",
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

      {/* ─── AGENT MATERIALISÉ ─── */}
      <section id="agent" className="relative py-28 md:py-36 bg-card border-y border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-16 items-start">
            <div>
              <Reveal>
                <p className="section-kicker">Brique agent, concrètement</p>
                <h2
                  className="font-serif font-medium leading-[1.12] tracking-tight"
                  style={{ fontSize: "clamp(1.8rem, 1rem + 3vw, 3.6rem)" }}
                >
                  Pas un collègue magique. Un système d’action avec des bornes.
                </h2>
              </Reveal>

              <Reveal>
                <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
                  L’agent devient utile quand une routine a un déclencheur, une source fiable, une action attendue et une règle d’arrêt. Sans ce cadre, il reste un générateur de brouillons.
                </p>
              </Reveal>

              <Reveal>
                <div className="mt-10 space-y-4">
                  {[
                    ["Il prépare", "réponses, comptes-rendus, relances, classements"],
                    ["Il surveille", "échéances, messages, changements, signaux faibles"],
                    ["Il bloque", "quand le contexte manque ou que l’action devient sensible"],
                  ].map(([title, text]) => (
                    <div key={title} className="quiet-card">
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-muted mt-1">{text}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal>
              <div className="agent-operating-card">
                <div className="flex items-start justify-between gap-6 border-b border-dark-border px-6 py-5">
                  <div>
                    <p className="font-mono text-xs tracking-[0.18em] uppercase text-accent-light">
                      Exemple de cadre
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-card">Relancer un devis sans perdre la main</h3>
                  </div>
                  <span className="rounded-full border border-accent-light/35 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-accent-light">
                    validable
                  </span>
                </div>

                <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-dark-border">
                  <div className="p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-light mb-4">Règles</p>
                    <ul className="space-y-4 text-dark-muted">
                      <li>Déclencheur : devis sans réponse après 5 jours ouvrés.</li>
                      <li>Source : dossier client, dernier échange, tarif validé.</li>
                      <li>Action : brouillon de relance dans votre ton.</li>
                      <li>Arrêt : question humaine si montant, délai ou contexte divergent.</li>
                    </ul>
                  </div>
                  <div className="p-6">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent-light mb-4">Sortie</p>
                    <div className="rounded-xl border border-dark-border bg-black/20 p-4">
                      <p className="text-card">Brouillon prêt</p>
                      <p className="mt-2 text-sm text-dark-muted">
                        “Bonjour Madame Payet, je reviens vers vous concernant le devis transmis mardi dernier…”
                      </p>
                      <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-accent-light">
                        En attente de validation
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
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
              Ce que l’agent peut faire quand le cadre est clair
            </h2>
          </Reveal>

          <Reveal>
            <div className="mt-14 action-log" aria-label="Exemple de journal d'actions de l'agent">
              {[
                ["08:03", "3 devis sans réponse depuis 5 jours", "brouillons de relance préparés"],
                ["08:12", "mail client avec pièce manquante", "question de clarification proposée"],
                ["08:21", "réunion d'hier retrouvée", "compte-rendu classé dans le bon dossier"],
                ["08:27", "demande inhabituelle détectée", "action bloquée avant validation"],
                ["08:31", "échéance administrative vendredi", "rappel ajouté à votre matinée"],
              ].map(([time, event, result], i) => (
                <div key={i} className="action-row">
                  <span className="font-mono text-xs text-accent-light">{time}</span>
                  <div>
                    <p className="text-card">{event}</p>
                    <p className="text-dark-muted text-sm mt-1">{result}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <p className="mt-14 text-card leading-relaxed max-w-xl text-lg" style={{ lineHeight: "1.7" }}>
              Pas de magie. Pas de promesse générale.
              <br />
              <span className="text-accent-light font-medium">L'agent agit seulement là où le travail, les limites et la validation ont été cadrés.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── SÉCURITÉ ─── */}
      <section id="securite" className="relative py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-start">
            <div>
              <Reveal>
                <p className="section-kicker">Sécurité et contrôle</p>
                <h2
                  className="font-serif font-medium leading-[1.12] tracking-tight"
                  style={{ fontSize: "clamp(1.8rem, 1rem + 3vw, 3.6rem)" }}
                >
                  L’agent agit dans un cadre. Vous gardez la prise.
                </h2>
              </Reveal>

              <Reveal>
                <p className="mt-6 text-lg text-muted leading-relaxed">
                  La sécurité n’est pas un paragraphe juridique en bas de page. Elle se construit dans le périmètre d’action : accès limités, validation humaine, traces et reprise possible.
                </p>
              </Reveal>
            </div>

            <Reveal>
              <ValidationFlow />
            </Reveal>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-4 stagger-1">
            {[
              ["Accès limités", "L’agent ne reçoit que les outils nécessaires à la routine cadrée. Pas d’accès large par confort technique."],
              ["Actions validables", "Les envois, décisions et changements sensibles peuvent rester en brouillon jusqu’à votre accord."],
              ["Traçabilité", "Chaque action doit pouvoir être comprise après coup : source, raison, statut et possibilité de reprise."],
            ].map(([title, text], i) => (
              <Reveal key={i}>
                <div className="control-card">
                  <p className="font-mono text-xs tracking-[0.16em] uppercase text-accent mb-3">{title}</p>
                  <p className="text-muted leading-relaxed">{text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-10 rounded-2xl border border-accent/30 bg-accent-subtle p-6 md:p-8">
              <p className="font-serif text-xl mb-2">Option souveraine</p>
              <p className="text-muted leading-relaxed">
                Pour les situations sensibles : installation sur Mac Mini dédié chez vous. Plus cher, mais maximale maîtrise de l'environnement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── ROUTEUR ─── */}
      <section className="relative py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-4xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              Quelle entrée choisir ?
            </p>
            <h2
              className="font-serif font-medium leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              L’agent est l’étape avancée. L’audit vient avant si le cas est flou.
            </h2>
          </Reveal>

          <div className="mt-12 grid md:grid-cols-3 gap-4 stagger-1">
            {[
              {
                title: "Vous préparez un usage IA ou un agent IA",
                text: "Commencez par observer ce que cela va déplacer dans le travail réel : vérification, qualité, responsabilités, supervision et reprise en main.",
                cta: "Vérifier votre premier cas IA →",
                href: AUDIT_IA_TRAVAIL_REEL_PAGE_URL,
              },
              {
                title: "Vous avez une routine précise à déléguer",
                text: "Relancer, classer, surveiller, préparer, alerter : l’agent devient utile quand le cadre d’action est déjà clair.",
                cta: "Rester sur l’agent →",
                href: "#tarifs",
              },
              {
                title: "Vous n’êtes pas sûr du bon point d’entrée",
                text: "Un appel de cadrage suffit souvent à distinguer audit IA du travail réel, agent, automatisation ou simple règle d’usage.",
                cta: "Appel de cadrage →",
                href: "#booking",
              },
            ].map((item, i) => (
              <Reveal key={i}>
                <div className="capability-card flex flex-col">
                  <h3 className="font-serif text-xl mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed flex-1">{item.text}</p>
                  <a href={item.href} className="mt-6 text-sm font-medium text-accent hover:text-accent-hover transition-colors">
                    {item.cta}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section id="tarifs" className="relative py-28 md:py-36 bg-card">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <p className="section-kicker">Tarifs</p>
            <h2
              className="font-serif font-medium leading-[1.12] tracking-tight max-w-3xl"
              style={{ fontSize: "clamp(1.8rem, 1rem + 3vw, 3.6rem)" }}
            >
              Une offre early adopter pour installer un premier agent sans construire une usine à gaz.
            </h2>
          </Reveal>

          <div className="price-grid mt-12">
            <Reveal>
              <div className="price-card">
                <div className="flex flex-wrap items-center gap-3 mb-8" aria-label={`${EARLY_ADOPTER_LEFT} places restantes sur ${EARLY_ADOPTER_TOTAL}`}>
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

                <p className="font-mono text-xs tracking-[0.18em] uppercase text-accent mb-4">
                  Early Adopter
                </p>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                  <span className="text-5xl font-serif font-medium text-foreground">
                    0&nbsp;€
                  </span>
                  <span className="text-muted">
                    d&apos;installation <span className="line-through text-muted-lighter">497&nbsp;€</span>
                  </span>
                </div>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-4xl font-serif font-medium text-foreground">
                    97&nbsp;€
                  </span>
                  <span className="text-muted">/mois</span>
                </div>

                <a href="#booking" className="btn-primary">
                  Vérifier si mon cas est prêt →
                </a>

                <p className="mt-5 text-sm text-muted-light">
                  Tarif normal après les 10 premières places : 497&nbsp;€ installation + 197&nbsp;€/mois.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="price-explainer">
                <p className="font-mono text-xs tracking-[0.18em] uppercase text-accent mb-5">
                  Ce que le tarif couvre
                </p>
                <ul className="included-list">
                  {[
                    ["Cadrage du cas", "On vérifie que la routine mérite un agent plutôt qu’une simple règle d’organisation."],
                    ["Configuration agent", "Mémoire, outils, limites, règles d’arrêt et validation."],
                    ["Routine utile", "Relancer, classer, surveiller, préparer ou alerter dans un périmètre précis."],
                    ["Ajustement mensuel", "Le travail change : l’agent doit être surveillé, corrigé et amélioré."],
                    ["Option Mac Mini", "+1 500 € si vous voulez un environnement dédié chez vous."],
                  ].map(([title, text]) => (
                    <li key={title}>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-muted mt-1">{text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-28 md:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16 items-start">
            <Reveal>
              <div>
                <p className="section-kicker">Questions fréquentes</p>
                <h2
                  className="font-serif font-medium leading-[1.12] tracking-tight"
                  style={{ fontSize: "clamp(1.8rem, 1rem + 3vw, 3.2rem)" }}
                >
                  Ce qui doit être clair avant de confier une routine à un agent.
                </h2>
                <div className="mt-8 space-y-4">
                  <div className="quiet-card">
                    <p className="font-medium">L’agent ne décide pas à votre place.</p>
                    <p className="mt-1 text-sm text-muted">Il prépare, surveille et s’arrête quand le cadre manque.</p>
                  </div>
                  <div className="quiet-card">
                    <p className="font-medium">Le bon premier livrable est une routine vérifiable.</p>
                    <p className="mt-1 text-sm text-muted">Un déclencheur, une source, une action attendue, une règle d’arrêt.</p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="faq-panel">
                <FAQItem
                  initiallyOpen
                  q="Qu’est-ce qu’un agent IA, concrètement ?"
                  a="Une brique avancée connectée à certains outils, avec une mémoire utile de votre activité et des routines définies avec vous : relancer, préparer, surveiller, classer, alerter. Elle n’est utile que si le travail à déléguer est assez compris."
                />
                <FAQItem
                  initiallyOpen
                  q="En quoi est-ce différent de ChatGPT ou Copilot ?"
                  a="ChatGPT ou Copilot répondent surtout à une demande. L’agent surveille un contexte, applique des règles de travail et prépare ou exécute des actions dans un périmètre défini. C’est un niveau plus avancé, pas le point de départ obligatoire."
                />
                <FAQItem
                  q="Est-ce que l’agent remplace quelqu’un ?"
                  a="Non. Il ne porte ni le jugement métier ni la responsabilité. Il prend en charge une routine bornée, prépare des décisions et agit dans un cadre construit avec vous."
                />
                <FAQItem
                  q="Qui garde la main si l’agent se trompe ?"
                  a="Vous. Les actions sensibles doivent rester validables. Le dispositif est conçu pour garder une trace, rendre l’erreur visible et permettre une récupération rapide."
                />
                <FAQItem
                  q="Combien de temps avant que ce soit utile ?"
                  a="Dès la première semaine si la routine est claire. Si le cas d’usage est flou, il faut d’abord passer par un cadrage ou par l’Audit IA du travail réel."
                />
                <FAQItem
                  q="Mes données sont-elles en sécurité ?"
                  a="La règle de départ est l’accès minimum : l’agent ne reçoit que les outils nécessaires à la routine cadrée. Vos données restent les vôtres et les accès peuvent être retirés."
                />
                <FAQItem
                  q="Pourquoi un abonnement mensuel ?"
                  a="Parce que le travail change. Le prix couvre l’hébergement, la maintenance, les ajustements et l’amélioration continue des routines de votre agent."
                />
              </div>
            </Reveal>
          </div>
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
              Julien Talbot — Ergonome de l’activité, IA dans le travail réel
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
              Vérifier une première routine agent
            </h2>
          </Reveal>

          <Reveal>
            <p className="mt-4 text-dark-muted text-lg" style={{ lineHeight: "1.7" }}>
              30 minutes pour partir d’une situation réelle, vérifier si elle mérite un agent, et définir ce qui doit rester validé par vous.
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
