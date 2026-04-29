# tunnel v0 — vérifier votre premier cas IA

## décision minimum

nom public provisoire : **vérifier votre premier cas IA**.

nom interne : audit pré-agent.

tunnel testé :

`post linkedin → CTA direct → Cal.com dédié → appel → proposition → score`

lien unique v0 :

`https://cal.com/julien-talbot-ergonome/premier-cas-ia`

## exigences conservées

1. obtenir des conversations commerciales qualifiées ;
2. parler du problème client, pas de notre méthode ;
3. partir du travail réel ;
4. filtrer les curieux IA ;
5. mesurer manuellement avant d’automatiser.

## exigences supprimées

- “cadrer un audit pré-agent” côté prospect ;
- landing page dédiée ;
- CRM ;
- séquence email ;
- pricing affiché ;
- refonte site ;
- scoring complexe ;
- promesse de productivité.

## hypothèse testée

si Julien nomme le problème comme **choisir le bon premier cas IA depuis le travail réel**, alors les prospects qualifiés réservent un appel avec un cas concret à examiner.

## offre v0

**Vérifier votre premier cas IA**

Avant de créer un agent IA, vous vérifiez où il a vraiment du sens.
La mission observe un processus court, le travail réel associé, et les risques de surcharge ou de mauvais usage.
Vous obtenez un tri simple : automatiser, assister, garder humain.
Vous repartez avec un score d’opportunité et une recommandation : avancer, recadrer, ou ne pas lancer.
L’objectif : éviter un agent gadget qui ajoute du travail au lieu d’en retirer.

## phrase orale

> Je vous aide à choisir un premier cas d’usage IA qui part du travail réel, pas d’une envie d’outil.

version plus directe :

> Vous avez une idée d’agent IA. Je vous aide à savoir rapidement si elle tient debout dans le travail réel.

## CTA v0

bouton site :

> vérifier votre premier cas IA

fin de post :

> si vous préparez un agent IA dans une équipe, le premier sujet n’est pas l’outil.
>
> c’est le travail qu’il va déplacer.
>
> 30 minutes pour vérifier si votre premier cas IA tient debout dans le travail réel :
> https://cal.com/julien-talbot-ergonome/premier-cas-ia?utm_source=linkedin&utm_medium=post&utm_campaign=audit_pre_agent_v0

## Cal.com v0

événement créé :

- titre : `Vérifier votre premier cas IA`
- slug : `premier-cas-ia`
- durée : 30 min
- lien : `https://cal.com/julien-talbot-ergonome/premier-cas-ia`
- Google Meet
- invités désactivés

introduction :

> Pour que l’appel soit utile, ces trois questions aident à comprendre le travail réel que vous envisagez de transformer avec l’IA. Répondez simplement avec ce que vous savez déjà : trois minutes suffisent.

questions obligatoires :

1. Quel travail voulez-vous mieux comprendre avant de déployer un agent IA ?
2. Aujourd’hui, qu’est-ce qui coince le plus dans ce travail ?
3. Sur quel exemple réel pourrions-nous nous appuyer pendant l’appel ?

## scoring qualification appel

score sur 6 points :

- travail nommé : 0 vague / 1 domaine général / 2 tâche ou processus précis ;
- problème : 0 aucun / 1 irritant général / 2 plusieurs irritants concrets ;
- exemple réel : 0 aucun / 1 possible mais flou / 2 cas identifiable.

lecture :

- 5-6 : appel prioritaire ;
- 3-4 : appel possible, cadrage fort ;
- 0-2 : curiosité IA, faible priorité.

## métriques

journal : `data/growth_events.jsonl`

événements autorisés :

- `post_published`
- `cta_click`
- `cal_booking`
- `call_done`
- `proposal_sent`
- `proposal_won`
- `proposal_lost`

score :

```bash
python3 scripts/score.py --write-report
```

## règles de décision

après 10 posts ou 14 jours :

- 0 booking → CTA/offre flous ;
- bookings faibles → problème/audience/post à revoir ;
- bookings mais appels faibles → questions Cal.com à durcir ;
- appels qualifiés mais pas proposition → livrable/prix à clarifier ;
- propositions envoyées mais perdues → promesse/livrable/prix à revoir ;
- 1 vente → documenter le cas réel avant d’ajouter une machine.

## vérification actuelle

- repo site : `/Users/ergonomia_mac_mini/Projects/agent-ergonomia`
- site principal agent : `agent.ergonomia.re`
- Cal.com API : accès rétabli avec nouvelle clé ; nécessite User-Agent navigateur sinon erreur 1010.
- événement Cal.com dédié créé et patché : `premier-cas-ia`.
- site agent modifié localement : carte routeur “audit” pointe vers Cal.com dédié avec `utm_campaign=audit_pre_agent_v0`.
