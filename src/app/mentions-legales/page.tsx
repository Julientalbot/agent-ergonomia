export const metadata = {
  title: "Mentions légales — Agent IA sur-mesure | Ergonomia",
  description: "Mentions légales et politique de confidentialité du site agent.ergonomia.re."
};

export default function MentionsLegales() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <h1 className="font-serif font-medium text-3xl mb-12">Mentions légales</h1>

        <section className="mb-10 space-y-4">
          <h2 className="font-serif text-xl mb-4">Éditeur du site</h2>
          <p className="text-muted leading-relaxed">
            Le site <strong>agent.ergonomia.re</strong> est édité par <strong>Julien Talbot</strong>,
            ergonome exerçant en libéral, domicilié à Saint-Denis (97400), La Réunion.
          </p>
          <p className="text-muted leading-relaxed">
            Contact : <a href="mailto:julien.talbot@ergonomia.re" className="text-accent hover:underline">
              julien.talbot@ergonomia.re
            </a>
          </p>
        </section>

        <section className="mb-10 space-y-4">
          <h2 className="font-serif text-xl mb-4">Hébergement</h2>
          <p className="text-muted leading-relaxed">
            Le site est hébergé par <strong>Vercel Inc.</strong>, 340 S Lemon Ave #4133,
            Walnut, CA 91789, États-Unis.
          </p>
        </section>

        <section className="mb-10 space-y-4">
          <h2 className="font-serif text-xl mb-4">Propriété intellectuelle</h2>
          <p className="text-muted leading-relaxed">
            L'ensemble des contenus (textes, images, code, marque Ergonomia) est la propriété
            exclusive de Julien Talbot. Toute reproduction sans autorisation est interdite.
          </p>
        </section>

        <section className="mb-10 space-y-4">
          <h2 className="font-serif text-xl mb-4">Politique de confidentialité</h2>
          <p className="text-muted leading-relaxed">
            Les données collectées via le site (nom, email, entreprise lors d'un appel découverte)
            sont utilisées uniquement dans le cadre de la relation commerciale. Elles ne sont
            jamais revendues ni transmises à des tiers.
          </p>
          <p className="text-muted leading-relaxed">
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
            suppression de vos données. Pour l'exercer, contactez
            <a href="mailto:julien.talbot@ergonomia.re" className="text-accent hover:underline">
              julien.talbot@ergonomia.re
            </a>.
          </p>
        </section>

        <section className="mb-10 space-y-4">
          <h2 className="font-serif text-xl mb-4">Cookies</h2>
          <p className="text-muted leading-relaxed">
            Le site utilise <strong>Plausible Analytics</strong>, un outil de mesure d'audience
            respectueux de la vie privée, qui ne pose aucun cookie et ne collecte aucune donnée
            personnelle identifiable. Aucun bandeau de consentement n'est donc nécessaire.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-xl mb-4">Conditions de service</h2>
          <p className="text-muted leading-relaxed">
            Le service d'agent IA sur-mesure est proposé sous forme d'abonnement mensuel,
            sans engagement de durée minimum après le premier mois. Les conditions générales
            de vente sont communiquées sur demande.
          </p>
        </section>
      </div>
    </main>
  );
}
