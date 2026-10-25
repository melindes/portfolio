# Melindes · Bindjé — portfolio

Site bilingue (FR / EN) de Mandah Célestin Wilfried Bindjé : **Melindes** (code) et **Bindjé** (écriture).
Construit avec [Astro](https://astro.build), hébergé sur Cloudflare Pages.


## Commandes

| Commande | Effet |
|---|---|
| `npm install` | Installe les dépendances (Node ≥ 22, voir `.nvmrc`) |
| `npm run dev` | Site de développement sur http://localhost:4321 |
| `npm run build` | Construit le site dans `dist/` (exige `PUBLIC_WEB3FORMS_KEY`) |
| `npm run preview` | Sert `dist/` en local |
| `npm run test:unit` | Tests unitaires (Vitest) |
| `npm run test:e2e` | Tests de bout en bout (Playwright ; arrête d'abord tout `astro preview` en cours) |
| `npm run prepare:portrait` | Prépare la photo détourée `assets-source/portrait/photo-detouree.png` (fichier local, non versionné) → `src/assets/portrait-detoure.png` |

Copie `.env.example` en `.env` et renseigne au moins `PUBLIC_WEB3FORMS_KEY` pour construire en local.

## Mettre à jour le contenu

Tout le contenu est dans `src/content/`. Une erreur de saisie fait échouer la construction avec un message clair : rien de cassé n'est publié.

- **Avancement du roman** — `src/content/romans/fr/les-larmes-du-present.md` uniquement : change `chapitres_ecrits` dans `parties`, et `en_cours` pour le chapitre en cours. La version anglaise reprend automatiquement ces chiffres ; les livres se remplissent tout seuls.
- **Pitch d'un roman à venir** — ajoute `genres`, `resume` (et `couverture`) dans `src/content/romans/fr/<roman>.md`. Pour la version anglaise, crée le même fichier dans `en/` ; sans lui, la page anglaise affiche le français avec « Translation coming soon ».
- **Extrait** — champ `extrait` (une ligne par paragraphe). Sans extrait, la section disparaît.
- **TutorLink** — complète `src/content/projets/fr/tutorlink.md` (problème, solution, technos, crédit du binôme) **après l'accord de ton binôme**, puis passe `publie: true`.
- **My Life sur Google Play** — dans `src/content/projets/fr/my-life.md` (et `en/`) : `statut: disponible` et `lien_play_store: https://play.google.com/…`. Le bouton devient « Disponible sur Google Play ».
- **Compétences et badges ● ◐ ○** — `src/content/site/competences.yml` (`badge: realise | en-cours | a-venir`).
- **Textes de l'accueil** — `src/content/site/fr/accueil.yml` et `en/accueil.yml`.
- **Textes d'interface** (menus, boutons, formulaire) — `src/i18n/ui.fr.json` et `ui.en.json`.
- **Nouvelle photo** — détoure-la (fond transparent, PNG), enregistre-la sous `assets-source/portrait/photo-detouree.png`, puis `npm run prepare:portrait`.

Après chaque modification : `git add`, `git commit`, `git push` → Cloudflare publie le site en ~1 minute.

## Déploiement (Cloudflare Workers)

Le fichier `wrangler.jsonc` sert le dossier `dist/` comme site statique. Son champ `name` doit être identique au nom du projet dans Cloudflare.

1. Sur [web3forms.com](https://web3forms.com), crée une clé d'accès liée à ton email (gratuit).
2. Cloudflare → **Workers & Pages** → le projet relié au dépôt `melindes/portfolio` → **Settings** → **Build** :
   - Build command : `npm run build`
   - Deploy command : `npx wrangler deploy`
   - Branche de production : `main`
3. Toujours dans **Settings → Build**, section **Variables and secrets** (variables de *construction*, type Text) :
   - `PUBLIC_WEB3FORMS_KEY` = ta clé Web3Forms
   - `SITE_URL` = l'adresse du site, ex. `https://portfolio.<ton-sous-domaine>.workers.dev`
   - `NODE_VERSION` = `24`
   - `PUBLIC_CONTACT_EMAIL` = *(facultatif)* email affiché si l'envoi du formulaire échoue
4. Fusionne la branche dans `main` (ou relance le dernier déploiement) : Cloudflare construit puis publie.
5. Ouvre le site et envoie-toi un message de test depuis `/fr/contact`.

Un nom de domaine pourra être branché plus tard (*Settings → Domains & Routes*) ; pense alors à mettre à jour `SITE_URL`.
