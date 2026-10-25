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
| `npm run crop:portrait` | Recadre `assets-source/portrait/photo-originale.jpg` (fichier local, non versionné) → `src/assets/portrait.jpg` |

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
- **Nouvelle photo** — remplace `assets-source/portrait/photo-originale.jpg`, ajuste la zone dans `scripts/crop-portrait.mjs` si besoin, puis `npm run crop:portrait`.

Après chaque modification : `git add`, `git commit`, `git push` → Cloudflare publie le site en ~1 minute.

## Déploiement (Cloudflare Workers)

Le fichier  sert le dossier  comme site statique. Son champ  doit être identique au nom du projet dans Cloudflare.

1. Sur [web3forms.com](https://web3forms.com), crée une clé d'accès liée à ton email (gratuit).
2. Cloudflare → **Workers & Pages** → le projet relié au dépôt  → **Settings** → **Build** :
   - Build command :    - Deploy command : 
╭─────────────────────────────────╮
│ Did you mean "wrangler deploy"? │
╰─────────────────────────────────╯

wrangler

COMMANDS
  wrangler docs [search..]        📚 Open Wrangler's command documentation in your browser
  wrangler complete [shell]       ⌨️ Generate and handle shell completions

  wrangler email                  Manage Cloudflare Email services [open beta]

ACCOUNT
  wrangler auth                   🔐 Manage authentication
  wrangler login                  🔓 Login to Cloudflare
  wrangler logout                 🚪 Logout from Cloudflare
  wrangler whoami                 🕵️ Retrieve your user information

COMPUTE & AI
  wrangler agent-memory           🧠 Manage Agent Memory namespaces [private beta]
  wrangler ai                     🤖 Manage AI models
  wrangler ai-search              🔍 Manage AI Search instances [open beta]
  wrangler browser                🌐 Manage Browser Run sessions [open beta]
  wrangler containers             📦 Manage Containers
  wrangler delete [name]          🗑️ Delete a Worker from Cloudflare
  wrangler deploy [path]          🆙 Deploy a Worker to Cloudflare
  wrangler deployments            🚢 List and view the current and past deployments for your Worker
  wrangler dev [script]           👂 Start a local server for developing your Worker
  wrangler dispatch-namespace     🏗️ Manage dispatch namespaces
  wrangler flagship               🚩 Manage Flagship apps and feature flags [open beta]
  wrangler init [name]            📥 Initialize a basic Worker
  wrangler pages                  ⚡️ Configure Cloudflare Pages
  wrangler preview [script]       👀 Create a Preview deployment of the current Worker [open beta]
  wrangler queues                 📬 Manage Workers Queues
  wrangler rollback [version-id]  🔙 Rollback a deployment for a Worker
  wrangler secret                 🤫 Generate a secret that can be referenced in a Worker
  wrangler setup                  🪄 Setup a project to work on Cloudflare
  wrangler tail [worker]          🦚 Start a log tailing session for a Worker
  wrangler triggers               🎯 Updates the triggers of your current deployment [experimental]
  wrangler types [path]           📝 Generate types from your Worker configuration
  wrangler versions               🫧 List, view, upload and deploy Versions of your Worker to Cloudflare
  wrangler vpc                    🌐 Manage VPC [open beta]
  wrangler workflows              🔁 Manage Workflows

STORAGE & DATABASES
  wrangler artifacts              🧱 Manage Artifacts namespaces and repos [open beta]
  wrangler basin                  🏞️ Manage Basin products
  wrangler d1                     🗄️ Manage Workers D1 databases
  wrangler hyperdrive             🚀 Manage Hyperdrive databases
  wrangler k2                     ⛰️ Manage K2 streams [open beta]
  wrangler kv                     🗂️ Manage Workers KV Namespaces
  wrangler r2                     📦 Manage R2 buckets & objects
  wrangler secrets-store          🔐 Manage the Secrets Store [open beta]
  wrangler vectorize              🧮 Manage Vectorize indexes

NETWORKING & SECURITY
  wrangler cert                   🪪 Manage client mTLS certificates and CA certificate chains used for secured connections [open beta]
  wrangler mtls-certificate       🪪 Manage certificates used for mTLS connections
  wrangler tunnel                 🚇 Manage Cloudflare Tunnels [experimental]
  wrangler turnstile              🛡️ Manage Turnstile widgets [alpha]

GLOBAL FLAGS
  -c, --config          Path to Wrangler configuration file  [string]
      --cwd             Run as if Wrangler was started in the specified directory instead of the current working directory  [string]
  -e, --env             Environment to use for operations, and for selecting .env and .dev.vars files  [string]
      --env-file        Path to an .env file to load - can be specified multiple times - values from earlier files are overridden by values in later files  [array]
  -h, --help            Show help  [boolean]
      --install-skills  Install Cloudflare skills for detected AI coding agents before running the command  [boolean] [default: false]
      --profile         Use a specific auth profile  [string]
  -v, --version         Show version number  [boolean]

Please report any issues to https://github.com/cloudflare/workers-sdk/issues/new/choose
   - Branche de production : 3. Toujours dans **Settings → Build**, section **Variables and secrets** (variables de *construction*, type Text) :
   -  = ta clé Web3Forms
   -  = l'adresse du site, ex.    -  =    -  = *(facultatif)* email affiché si l'envoi du formulaire échoue
4. Fusionne la branche dans  (ou relance le dernier déploiement) : Cloudflare construit puis publie.
5. Ouvre le site et envoie-toi un message de test depuis .

Un nom de domaine pourra être branché plus tard (*Settings → Domains & Routes*) ; pense alors à mettre à jour .
