"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// --- Animation wrapper ---
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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// --- FAQ Item ---
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-5 text-left cursor-pointer"
      >
        <span className="text-lg font-medium pr-4">{question}</span>
        <span className="text-muted text-2xl leading-none shrink-0">
          {open ? "\u2212" : "+"}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-muted leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
}

// --- Main Page ---
export default function Home() {
  return (
    <main>
      {/* ============ HERO ============ */}
      <section className="min-h-[85vh] flex items-center">
        <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
          <Reveal>
            <h1 className="text-3xl md:text-5xl font-semibold leading-tight tracking-tight">
              Votre agent IA dort dans un coin. Normal&nbsp;&mdash; personne
              n&rsquo;a compris votre travail avant de le configurer.
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-lg md:text-xl text-muted leading-relaxed max-w-2xl">
              Je suis ergonome. Je comprends votre quotidien professionnel, je
              configure un agent qui agit dessus, et il vous aide sans que vous
              ayez à demander.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <a
              href="#booking"
              className="inline-block mt-10 px-8 py-4 bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-opacity"
            >
              Réserver un appel découverte
            </a>
          </Reveal>
        </div>
      </section>

      {/* ============ LE PROBLEME ============ */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
              Pourquoi 40% des projets IA échouent
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "La page blanche",
                text: "Vous avez installé un outil IA. Mais vous ne savez pas quoi lui demander. Il prend la poussière.",
              },
              {
                title: "Le parachutage",
                text: "Un agent déposé dans votre quotidien sans comprendre votre métier. Il ne correspond à rien.",
              },
              {
                title: "Le prototype éternel",
                text: "Ça a marché une fois pour une démo. Puis plus rien. Personne n\u2019ajuste, personne ne suit.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="p-8 border border-border rounded-lg h-full">
                  <div className="w-10 h-1 bg-accent mb-6" />
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LA SOLUTION ============ */}
      <section className="py-24 md:py-32">
        <div className="max-w-5xl mx-auto px-6">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
              Un ergonome configure votre agent
            </h2>
          </Reveal>
          <div className="mt-16 grid md:grid-cols-2 gap-12">
            {[
              {
                step: "01",
                title: "Entretien",
                text: "J\u2019analyse votre travail réel au quotidien : tâches, outils, irritants, ce que vous oubliez.",
              },
              {
                step: "02",
                title: "Configuration",
                text: "Je configure un agent qui comprend VOTRE contexte spécifique. Pas un bot générique.",
              },
              {
                step: "03",
                title: "Proactivité",
                text: "Votre agent n\u2019attend pas que vous demandiez. Il rappelle, suggère, agit \u2014 à partir de ce que j\u2019ai compris.",
              },
              {
                step: "04",
                title: "Ajustement continu",
                text: "Chaque mois, je revois, j\u2019ajuste, j\u2019optimise. L\u2019agent s\u2019améliore au fil de votre travail.",
              },
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="flex gap-5">
                  <span className="text-accent font-mono text-sm font-semibold mt-1 shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section className="py-24 md:py-32 bg-card">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
              Tarifs
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-12 border-2 border-foreground rounded-lg p-8 md:p-12">
              <div className="flex flex-wrap items-baseline gap-3 mb-8">
                <h3 className="text-2xl font-semibold">Early Adopter</h3>
                <span className="text-muted">&mdash; 10 premières places</span>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-semibold">0&euro;</span>
                  <span className="text-muted">
                    d&rsquo;installation{" "}
                    <span className="line-through">497&euro;</span>
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-semibold">97&euro;</span>
                  <span className="text-muted">/mois</span>
                </div>
              </div>

              <ul className="space-y-3 mb-10 text-muted">
                {[
                  "Entretien de compréhension de votre activité",
                  "Agent IA personnalisé et proactif",
                  "Support et ajustement continu",
                  "Hébergement inclus",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-accent mt-0.5 shrink-0">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                className="inline-block px-8 py-4 bg-foreground text-background font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Réserver un appel découverte
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-8 text-muted text-center">
              Option sur site : +1&nbsp;500&euro; pour un Mac Mini dédié
              installé chez vous
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-4 text-sm text-muted text-center">
              Tarif normal après les 10 premières places : 497&euro;
              d&rsquo;installation + 197&euro;/mois
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="py-24 md:py-32">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight mb-12">
              Questions fréquentes
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <FAQItem
                question="C'est quoi exactement un agent IA ?"
                answer="Un assistant IA personnel, connecté à vos outils (email, calendrier, etc.), qui agit de manière proactive à partir d'une compréhension fine de votre travail."
              />
              <FAQItem
                question="En quoi c'est différent de ChatGPT ?"
                answer="ChatGPT attend que vous posiez une question. Mon agent connaît votre travail et agit de lui-même."
              />
              <FAQItem
                question="Combien de temps avant que ce soit utile ?"
                answer="Dès la première semaine. L'entretien d'intégration identifie des gains rapides immédiatement."
              />
              <FAQItem
                question="Mes données sont-elles en sécurité ?"
                answer="Votre agent tourne sur un serveur européen, conforme RGPD. Vos données restent les vôtres."
              />
              <FAQItem
                question="Je peux annuler quand je veux ?"
                answer="Oui, sans engagement après le premier mois."
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ BOOKING ============ */}
      <section id="booking" className="py-24 md:py-32 bg-card">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <Reveal>
            <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
              Parlons de votre quotidien
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg text-muted">
              30 minutes pour comprendre si un agent peut vous aider. Sans
              engagement.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-12">
              <a
                href="https://cal.com/ergonomia/decouverte"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 bg-foreground text-background text-lg font-medium rounded-md hover:opacity-90 transition-opacity"
              >
                Réserver un appel découverte
              </a>
              <p className="mt-4 text-sm text-muted">
                30 min &middot; Gratuit &middot; Sans engagement
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="py-12 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 text-sm text-muted">
          <div>
            <p className="font-medium text-foreground">
              Julien Talbot &mdash; Ergonome, spécialiste IA et conditions de
              travail
            </p>
            <p className="mt-1">La Réunion</p>
          </div>
          <a
            href="https://www.linkedin.com/in/julientalbot"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
