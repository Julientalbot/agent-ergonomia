"use client";

import { motion } from "framer-motion";
import { useState } from "react";

/* ─── Reveal on scroll ─── */
function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
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
        <span className="font-serif font-medium text-lg pr-6 group-hover:text-accent transition-colors">
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
    <span className="font-mono text-xs tracking-widest text-accent uppercase">
      {n}
    </span>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <main>
      {/* ─── HERO ─── */}
      <section className="pt-20 pb-24 md:pt-32 md:pb-40">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-8">
              Agent IA sur-mesure
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1
              className="font-serif font-medium leading-[1.12] tracking-tight"
              style={{ fontSize: "clamp(1.75rem, 1rem + 3.2vw, 3.2rem)" }}
            >
              Votre agent IA dort dans un coin.
              <br />
              <span className="text-muted">
                Normal&mdash; personne n&apos;a compris votre travail avant de le
                configurer.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 text-lg text-muted leading-relaxed max-w-xl">
              Je suis ergonome. Je comprends votre quotidien, je configure un
              agent qui agit dessus, et il vous aide sans que vous ayez à
              demander.
            </p>
          </Reveal>

          <Reveal delay={0.35}>
            <a
              href="#booking"
              className="inline-block mt-10 px-7 py-3.5 text-sm font-medium tracking-wide rounded-md border border-accent text-accent hover:bg-accent hover:text-card transition-all duration-200"
            >
              Réserver un appel découverte &rarr;
            </a>
          </Reveal>
        </div>
      </section>

      {/* ─── PROBLÈME (dark break) ─── */}
      <section className="bg-dark py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-light mb-4">
              Le problème
            </p>
            <h2
              className="font-serif font-medium leading-[1.15] tracking-tight text-card"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              40 % des projets IA échouent.
              <br />
              <span className="text-dark-muted">Pas à cause de la technologie.</span>
            </h2>
          </Reveal>

          <div className="mt-16 space-y-10">
            {[
              {
                num: "01",
                title: "La page blanche",
                text: "Vous avez installé un outil IA. Mais vous ne savez pas quoi lui demander. Il prend la poussière.",
              },
              {
                num: "02",
                title: "Le parachutage",
                text: "Un agent déposé dans votre quotidien sans comprendre votre métier. Il ne correspond à rien.",
              },
              {
                num: "03",
                title: "Le prototype éternel",
                text: "Ça a marché une fois pour une démo. Puis plus rien. Personne n'ajuste, personne ne suit.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
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
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              La méthode
            </p>
            <h2
              className="font-serif font-medium leading-[1.15] tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              Un ergonome configure votre agent
            </h2>
          </Reveal>

          <div className="mt-16 space-y-0 divide-y divide-border">
            {[
              {
                step: "Étape 01",
                title: "Entretien",
                text: "J'analyse votre travail réel : tâches, outils, irritants, ce que vous oubliez. Pas un questionnaire — un vrai dialogue.",
              },
              {
                step: "Étape 02",
                title: "Configuration",
                text: "Je configure un agent qui comprend VOTRE contexte. Pas un bot générique — un agent qui sait qui vous êtes.",
              },
              {
                step: "Étape 03",
                title: "Proactivité",
                text: "Votre agent n'attend pas que vous demandiez. Il rappelle, suggère, agit — à partir de ce que j'ai compris de vous.",
              },
              {
                step: "Étape 04",
                title: "Ajustement continu",
                text: "Chaque mois, je revois, j'ajuste, j'optimise. L'agent s'améliore au fil de votre travail.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.08}>
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

      {/* ─── PRICING ─── */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              Tarifs
            </p>
            <h2
              className="font-serif font-medium leading-[1.15] tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              Early Adopter
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-10 p-8 md:p-10 rounded-xl border-2 border-accent bg-background">
              <p className="text-muted text-sm mb-6">
                10 premières places
              </p>

              <div className="flex items-baseline gap-3 mb-1">
                <span className="text-5xl font-serif font-medium text-foreground">
                  0&nbsp;&euro;
                </span>
                <span className="text-muted">
                  d&apos;installation{" "}
                  <span className="line-through text-muted-lighter">497&nbsp;&euro;</span>
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-4xl font-serif font-medium text-foreground">
                  97&nbsp;&euro;
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

              <a
                href="#booking"
                className="inline-block px-7 py-3.5 text-sm font-medium tracking-wide rounded-md bg-accent text-card hover:bg-accent-hover transition-colors"
              >
                Prendre ma place &rarr;
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-6 text-sm text-muted-light text-center">
              Option on-site : +1&nbsp;500&nbsp;&euro; (Mac Mini dédié chez vous)
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mt-2 text-xs text-muted-lighter text-center">
              Tarif normal après les 10 premières places : 497&nbsp;&euro; installation + 197&nbsp;&euro;/mois
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-24 md:py-32">
        <div className="max-w-2xl mx-auto px-6">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent mb-4">
              Questions fréquentes
            </p>
          </Reveal>
          <Reveal delay={0.1}>
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
      <section id="booking" className="py-24 md:py-32 bg-dark">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Reveal>
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-light mb-4">
              Sans engagement
            </p>
            <h2
              className="font-serif font-medium leading-[1.15] tracking-tight text-card"
              style={{ fontSize: "clamp(1.5rem, 0.8rem + 2.5vw, 2.4rem)" }}
            >
              Parlons de votre quotidien
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-4 text-dark-muted text-lg">
              30 minutes pour comprendre si un agent peut vous aider.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <a
                href="https://cal.com/julien-talbot-ergonome/decouverte"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-4 bg-accent text-card font-medium rounded-md hover:bg-accent-hover transition-colors text-lg"
              >
                Parlez-moi de votre quotidien &rarr;
              </a>
              <p className="mt-4 text-sm text-dark-muted">
                30 min &middot; Gratuit &middot; Sans engagement
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-12 text-sm text-dark-muted border-t border-dark-border pt-8 max-w-xs mx-auto">
              Julien Talbot
              <br />
              Ergonome, spécialiste IA et conditions de travail
              <br />
              La Réunion
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-10 border-t border-dark-border bg-dark">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3 text-sm text-dark-muted">
          <p>&copy; {new Date().getFullYear()} Ergonomia</p>
          <a
            href="https://www.linkedin.com/in/julientalbot"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-light hover:text-accent transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
