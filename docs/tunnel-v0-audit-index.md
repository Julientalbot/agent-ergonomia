# tunnel v0 — index d’audit

Date de référence : 2026-04-29
Campagne : `audit_ia_travail_reel_v0`
Objectif : vérifier si “vérifier votre premier cas IA” déclenche des conversations commerciales qualifiées.

## architecture

```text
post → CTA → Cal.com → appel → proposition → score
```

## 1. offre / hypothèse

- fichier local : `/Users/ergonomia_mac_mini/Projects/agent-ergonomia/docs/audit-pre-agent-v0.md`
- GitHub : https://github.com/Julientalbot/agent-ergonomia/blob/e7b652a92d255f05a1a466e2fd713f42fa9ef150/docs/audit-pre-agent-v0.md
- lignes clés :
  - L1 : titre du tunnel
  - L11 : architecture
  - L15 : lien Cal.com
  - L36 : hypothèse testée

## 2. CTA / liens UTM

- fichier local : `/Users/ergonomia_mac_mini/Projects/agent-ergonomia/templates/audit-pre-agent-cta.md`
- GitHub : https://github.com/Julientalbot/agent-ergonomia/blob/e7b652a92d255f05a1a466e2fd713f42fa9ef150/templates/audit-pre-agent-cta.md
- lignes clés :
  - L11 : lien post LinkedIn
  - L29 : lien commentaire LinkedIn
  - L36 : lien DM

## 3. proposition après appel

- fichier local : `/Users/ergonomia_mac_mini/Projects/agent-ergonomia/templates/audit-pre-agent-proposition.md`
- GitHub : https://github.com/Julientalbot/agent-ergonomia/blob/e7b652a92d255f05a1a466e2fd713f42fa9ef150/templates/audit-pre-agent-proposition.md
- usage : base courte à adapter après un vrai appel, pas à envoyer automatiquement.

## 4. site / routeur public

- site public : https://agent.ergonomia.re
- fichier local : `/Users/ergonomia_mac_mini/Projects/agent-ergonomia/src/app/page.tsx`
- GitHub : https://github.com/Julientalbot/agent-ergonomia/blob/e7b652a92d255f05a1a466e2fd713f42fa9ef150/src/app/page.tsx
- lignes clés :
  - L110 : URL Cal.com avec UTM `agent_site/router_card/audit_ia_travail_reel_v0`
  - L554 : CTA `Vérifier votre premier cas IA →`
- vérification production : les marqueurs `premier-cas-ia`, `Vérifier votre premier cas IA`, `audit_ia_travail_reel_v0` sont présents dans le HTML de production.

## 5. Cal.com

- lien public : https://cal.com/julien-talbot-ergonome/premier-cas-ia
- event type API : `5531081`
- titre : `Vérifier votre premier cas IA`
- slug : `premier-cas-ia`
- visio : Google Meet
- questions obligatoires :
  1. `Quel travail voulez-vous mieux comprendre avant de déployer de l’IA ?`
  2. `Aujourd’hui, qu’est-ce qui coince le plus dans ce travail ?`
  3. `Sur quel exemple réel pourrions-nous nous appuyer pendant l’appel ?`

Note : le HTML public Cal.com est hydraté en JavaScript. Les questions peuvent ne pas apparaître dans le HTML brut, mais elles sont présentes côté API.

## 6. post test programmé

- Typefully draft : https://typefully.com/?d=8900406&a=270848
- draft id : `8900406`
- statut : `scheduled`
- publication : `2026-04-30T11:30:00Z` = jeudi 30 avril 2026, 15h30 Réunion
- plateformes :
  - LinkedIn : 1 post
  - X : post + réponse avec lien Cal.com
- record local : `/Users/ergonomia_mac_mini/clawd/content-machine/scheduled/2026-04-30_1530_mauvais-premier-cas-ia.json`

## 7. commentaire LinkedIn post-publication

- cron : `linkedin-comment-mauvais-premier-cas-ia`
- job id : `3ba6856b1e61`
- exécution : `2026-04-30T11:45:00Z` = jeudi 30 avril 2026, 15h45 Réunion
- rôle : ajouter le commentaire Cal.com sous le post LinkedIn après publication.

## 8. mesure / tracking

- journal local : `/Users/ergonomia_mac_mini/Projects/agent-ergonomia/data/growth_events.jsonl`
- GitHub : https://github.com/Julientalbot/agent-ergonomia/blob/e7b652a92d255f05a1a466e2fd713f42fa9ef150/data/growth_events.jsonl
- script de log : `/Users/ergonomia_mac_mini/Projects/agent-ergonomia/scripts/log_growth_event.py`
- GitHub : https://github.com/Julientalbot/agent-ergonomia/blob/e7b652a92d255f05a1a466e2fd713f42fa9ef150/scripts/log_growth_event.py
- script score : `/Users/ergonomia_mac_mini/Projects/agent-ergonomia/scripts/score.py`
- GitHub : https://github.com/Julientalbot/agent-ergonomia/blob/e7b652a92d255f05a1a466e2fd713f42fa9ef150/scripts/score.py
- rapport : `/Users/ergonomia_mac_mini/Projects/agent-ergonomia/reports/audit-pre-agent-score.md`
- GitHub : https://github.com/Julientalbot/agent-ergonomia/blob/e7b652a92d255f05a1a466e2fd713f42fa9ef150/reports/audit-pre-agent-score.md

Commandes :

```bash
cd /Users/ergonomia_mac_mini/Projects/agent-ergonomia
python3 scripts/log_growth_event.py post_published --channel linkedin --source typefully --notes "post mauvais premier cas ia"
python3 scripts/log_growth_event.py cta_click --channel linkedin --source comment --notes "clic manuel détecté"
python3 scripts/log_growth_event.py cal_booking --channel linkedin --source comment --person "Nom" --company "Entreprise"
python3 scripts/log_growth_event.py call_done --channel cal --source manual --person "Nom" --company "Entreprise"
python3 scripts/log_growth_event.py proposal_sent --channel email --source manual --person "Nom" --company "Entreprise"
python3 scripts/log_growth_event.py proposal_won --channel email --source manual --person "Nom" --company "Entreprise"
python3 scripts/score.py --write-report
```

## 9. queue de contenu existante

- dossier : `/Users/ergonomia_mac_mini/clawd/content-machine/pending/`
- autopilot actif : `jt-auto-pilot-queue`
- publication quotidienne : 8h00 Réunion
- prochain post existant : `/Users/ergonomia_mac_mini/clawd/content-machine/pending/2026-04-30_wef-juniors-ia.json`

## activation continue recommandée

La v0 ne doit pas être “un post”. Elle doit devenir un motif récurrent dans la machine de contenu.

Cycle minimum :

```text
1 post Audit IA du travail réel / semaine sur LinkedIn FR
+ 1 signal labs / jour sur X EN pendant 14 jours
+ Cal.com FR pour entreprises
+ Cal.com EN pour labs
+ score mis à jour après chaque signal
+ décision toutes les 2 semaines
```

Règle de publication :

- garder le post quotidien général ;
- ajouter 1 post tactique Audit IA du travail réel par semaine ;
- ne pas mettre le lien Cal.com dans le corps LinkedIn ;
- mettre le lien en commentaire LinkedIn et en réponse X ;
- varier l’angle, garder la même destination.

Angles à répéter :

1. mauvais premier cas IA ;
2. tâche répétitive qui cache du flou ;
3. IA gadget qui ajoute du travail ;
4. automatiser avant de comprendre ;
5. ce qui doit rester humain ;
6. premier cas IA : avancer / recadrer / ne pas lancer.

Seuils de décision :

- après 4 posts : garder si au moins 1 conversation qualifiée ou 1 réservation ;
- après 8 posts : garder seulement si une proposition est partie ou si plusieurs signaux faibles convergent ;
- si zéro signal après 8 posts : changer l’angle ou l’offre, pas ajouter une landing page.

## ce qui reste volontairement absent

- pas de nouvelle landing page dédiée ;
- pas de CRM ;
- pas de séquence email ;
- pas de pricing public ;
- pas de formulaire long hors Cal.com ;
- pas d’automatisation LinkedIn invasive.

Ces briques ne doivent être ajoutées que si le tunnel produit déjà un signal réel.
