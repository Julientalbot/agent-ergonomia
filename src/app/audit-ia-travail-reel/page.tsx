import type { Metadata } from "next";
import Link from "next/link";

const calUrl =
  "https://cal.com/julien-talbot-ergonome/premier-cas-ia?utm_source=agent_site&utm_medium=audit_page&utm_campaign=audit_ia_travail_reel_v0";

export const metadata: Metadata = {
  title: "Audit IA du travail réel | Ergonomia",
  description:
    "Avant de déployer de l’IA ou un agent IA, identifiez ce que cela transforme vraiment dans l’activité : tâches, arbitrages, vérification, supervision et reprise en main.",
  alternates: {
    canonical: "https://agent.ergonomia.re/audit-ia-travail-reel",
  },
  openGraph: {
    title: "Audit IA du travail réel — Ergonomia",
    description:
      "Vérifier ce que l’IA transforme vraiment dans l’activité avant de déployer, automatiser ou déléguer à un agent.",
    url: "https://agent.ergonomia.re/audit-ia-travail-reel",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Audit IA du travail réel — Ergonomia",
    description:
      "Avant de déployer de l’IA ou un agent IA, vérifiez tâches, arbitrages, vérification, supervision et reprise en main.",
  },
};

const points = [
  "ce que les personnes font réellement",
  "ce qu’elles corrigent sans le formaliser",
  "ce qu’elles arbitrent sous contrainte",
  "ce qu’elles vérifient déjà",
  "ce qui pourrait être assisté ou automatisé",
  "ce qui doit rester humain",
  "ce qui doit rester supervisable",
  "ce qu’un agent IA devrait rendre visible",
  "où l’humain doit pouvoir interrompre ou reprendre",
];

const livrables = [
  "cartographie activité / IA",
  "risques de charge invisible",
  "cas d’usage priorisés",
  "recommandation : automatiser, assister, cadrer ou ne pas lancer",
  "règles d’usage",
  "scénarios de supervision",
  "points de vérification et de reprise humaine",
];

const steps = [
  [
    "01",
    "partir d’une situation réelle",
    "une tâche, un processus, un irritant ou une idée d’agent IA. pas une démonstration d’outil.",
  ],
  [
    "02",
    "observer les déplacements",
    "tâches déplacées, arbitrages, charge de vérification, responsabilités, traces et pertes possibles.",
  ],
  [
    "03",
    "décider du bon niveau",
    "assister, automatiser, cadrer davantage, déléguer à un agent ou ne pas lancer.",
  ],
];

export default function AuditIATravailReelPage() {
  return (
    <main>
      <header className="site-header">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link href="/" className="font-mono text-xs tracking-[0.18em] uppercase text-foreground">
            Ergonomia · IA dans le travail réel
          </Link>
          <a href={calUrl} className="hidden sm:inline-block btn-outline !py-2 !px-4">
            Vérifier un cas IA →
          </a>
        </div>
      </header>

      <section className="relative pt-24 pb-24 md:pt-36 md:pb-32 grain">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-8">
            Audit IA du travail réel
          </p>
          <h1
            className="font-serif font-medium leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2rem, 1.1rem + 4vw, 4rem)" }}
          >
            Avant de déployer de l’IA,
            <br />
            <span className="text-muted">vérifiez le travail qu’elle va déplacer.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
            Une organisation ne met pas de l’IA dans le travail. Elle transforme une activité.
            Cet audit sert à identifier ce que l’IA ou un agent IA va réellement déplacer : tâches,
            arbitrages, responsabilités, charge de vérification, supervision et reprise en main.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:items-center">
            <a href={calUrl} className="btn-primary text-center">
              Vérifier votre premier cas IA →
            </a>
            <p className="text-sm text-muted-light">30 min · premier cadrage · Google Meet</p>
          </div>
        </div>
      </section>

      <section className="relative bg-dark py-24 md:py-32 grain">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-light mb-4">
            Le mauvais départ
          </p>
          <h2
            className="font-serif font-medium leading-[1.12] tracking-tight text-card"
            style={{ fontSize: "clamp(1.6rem, 0.9rem + 2.8vw, 2.8rem)" }}
          >
            demander “quel outil IA choisir ?” arrive souvent trop tard.
          </h2>
          <p className="mt-8 text-dark-muted text-lg leading-relaxed max-w-2xl">
            La question utile est plus simple : quel travail précis va être transformé, qui devra
            vérifier, et où l’humain pourra comprendre, interrompre ou reprendre ?
          </p>
        </div>
      </section>

      <section className="relative py-24 md:py-32">
        <div className="max-w-4xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
            Ce que nous regardons
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-10">
            {steps.map(([num, title, text]) => (
              <div key={num} className="capability-card">
                <p className="font-mono text-xs tracking-[0.16em] uppercase text-accent mb-3">{num}</p>
                <h3 className="font-serif text-xl mb-3">{title}</h3>
                <p className="text-muted leading-relaxed">{text}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="font-serif text-2xl mb-6">L’audit part du travail réel.</h2>
              <ul className="space-y-3 text-muted leading-relaxed">
                {points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="text-accent">→</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <h2 className="font-serif text-2xl mb-6">Vous repartez avec</h2>
              <ul className="space-y-3 text-muted leading-relaxed">
                {livrables.map((livrable) => (
                  <li key={livrable} className="flex gap-3">
                    <span className="text-accent">→</span>
                    <span>{livrable}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 md:py-32 bg-card border-y border-border">
        <div className="max-w-3xl mx-auto px-6">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
            Pour quels cas
          </p>
          <h2
            className="font-serif font-medium leading-[1.12] tracking-tight"
            style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
          >
            quand une équipe prépare un usage IA ou un agent IA, mais que le travail à déplacer reste flou.
          </h2>
          <div className="mt-10 space-y-5 text-muted leading-relaxed">
            <p>
              L’objectif n’est pas de promettre de la productivité. L’objectif est d’éviter une IA gadget
              qui ajoute du travail, ou un agent performant mais ingouvernable dans l’activité réelle.
            </p>
            <p>
              Le bon résultat peut être : lancer un cas simple, modifier le périmètre, ajouter des points
              de supervision, garder une validation humaine, ou ne pas automatiser.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-dark py-24 md:py-32 grain">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-light mb-4">
            Prochaine étape
          </p>
          <h2
            className="font-serif font-medium leading-[1.12] tracking-tight text-card"
            style={{ fontSize: "clamp(1.6rem, 0.9rem + 2.8vw, 2.8rem)" }}
          >
            30 minutes pour vérifier si votre premier cas IA tient debout.
          </h2>
          <p className="mt-6 text-dark-muted leading-relaxed">
            Venez avec une situation réelle : un processus, une tâche, une idée d’agent, un irritant.
            Nous regardons ce que l’IA déplacerait vraiment dans l’activité.
          </p>
          <a href={calUrl} className="inline-block mt-10 btn-accent">
            Réserver le cadrage →
          </a>
        </div>
      </section>
    </main>
  );
}
