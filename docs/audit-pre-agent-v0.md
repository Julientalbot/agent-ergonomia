# tunnel v0 — vérifier votre premier cas IA

## décision minimum

nom public provisoire : **vérifier votre premier cas IA**.

nom public : Audit IA du travail réel.
nom interne avancé : audit pré-agent.

tunnel testé :

`post linkedin → CTA direct → Cal.com dédié → appel → proposition → score`

liens Cal.com v0 :

- entreprises FR : `https://cal.com/julien-talbot-ergonome/premier-cas-ia`
- labs EN : `https://cal.com/julien-talbot-ergonome/ai-agents-real-work`

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

## offre v1

**Audit IA du travail réel**

Avant de déployer de l’IA ou un agent IA, vous identifiez ce que cela va vraiment transformer dans l’activité : tâches, arbitrages, responsabilités, charge de vérification, supervision et reprise en main.

L’audit part d’une situation de travail réelle, pas d’une promesse technologique.

Nous regardons :

- ce que les personnes font réellement ;
- ce qu’elles corrigent sans le formaliser ;
- ce qu’elles arbitrent ;
- ce qu’elles vérifient ;
- ce qui pourrait être assisté ou automatisé ;
- ce qui doit rester humain ;
- ce qui doit rester supervisable ;
- ce qu’un agent IA devrait rendre visible ;
- où l’humain doit pouvoir interrompre ou reprendre.

Vous repartez avec :

- une cartographie activité / IA ;
- une lecture des risques de charge invisible ;
- une priorisation des cas d’usage ;
- une recommandation : automatiser, assister, cadrer, ou ne pas lancer ;
- des règles d’usage ;
- des scénarios de supervision ;
- des points de vérification et de reprise humaine.

L’objectif : éviter une IA gadget qui ajoute du travail, ou un agent performant mais ingouvernable dans le travail réel.

## phrase orale

> Je vous aide à vérifier ce que votre premier usage IA va vraiment transformer dans le travail réel : tâches, responsabilités, vérification, supervision et reprise en main.

version plus directe :

> Vous avez une idée d’agent IA. Je vous aide à savoir rapidement si elle tient debout dans le travail réel et si l’humain pourra encore comprendre, vérifier et reprendre.

## CTA v0

bouton site :

> vérifier votre premier cas IA

fin de post :

> si vous préparez un usage IA ou un agent IA dans une équipe, le premier sujet n’est pas l’outil.
>
> c’est le travail qu’il va déplacer : vérification, qualité, responsabilités, supervision et reprise en main.
>
> 30 minutes pour vérifier si votre premier cas IA tient debout dans le travail réel :
> https://cal.com/julien-talbot-ergonome/premier-cas-ia?utm_source=linkedin&utm_medium=post&utm_campaign=audit_ia_travail_reel_v0

## Cal.com v0

### événement entreprises FR

- id : `5531081`
- titre : `Vérifier votre premier cas IA`
- slug : `premier-cas-ia`
- durée : 30 min
- lien : `https://cal.com/julien-talbot-ergonome/premier-cas-ia`
- Google Meet
- invités désactivés

### événement labs EN

- id : `5571666`
- titre : `Make your AI / agents work in real companies`
- slug : `ai-agents-real-work`
- durée : 30 min
- lien : `https://cal.com/julien-talbot-ergonome/ai-agents-real-work`
- Google Meet
- invités désactivés

introduction FR :

> Réservez 30 minutes pour vérifier si votre cas IA tient dans le travail réel : activité concernée, supervision, vérification et reprise en main.

questions supprimées : Cal.com ne sert pas à faire le diagnostic avant l’appel.

champ optionnel FR :

- Si vous voulez, décrivez en une phrase le cas IA que vous voulez examiner.

champ optionnel EN :

- Optional: what AI product, agent or workflow do you want to discuss?

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
- site agent modifié localement : carte routeur “audit” pointe vers Cal.com dédié avec `utm_campaign=audit_ia_travail_reel_v0`.
