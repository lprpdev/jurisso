# JURISSO

Plateforme SaaS de recherche juridique française.

## Stack technique

- **Frontend** : Next.js 15.2, TypeScript, CSS Modules
- **Backend** : NestJS 10, TypeORM, PostgreSQL 16, Redis 7
- **Auth** : JWT + Refresh Tokens, 2FA TOTP, argon2
- **Sources** : Légifrance (DILA), Judilibre (Cour de cassation)

## Structure

```
jurisso/
├── apps/
│   ├── frontend/          # Next.js 15.2 (App Router, SSR)
│   └── backend/           # NestJS 10
├── packages/
│   └── shared/            # Types TypeScript partagés
├── docker-compose.yml
└── .env.example
```

## Démarrage

```bash
# 1. Installer les dépendances
pnpm install

# 2. Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos valeurs

# 3. Lancer les migrations
pnpm db:migrate

# 4. Démarrer en développement
pnpm dev
```

## Docker

```bash
docker compose up --build
```

- Frontend : http://localhost:3000
- Backend : http://localhost:3001
- API Docs : http://localhost:3001/api/docs

## Licence

Propriétaire — JURISSO SAS. Tous droits réservés.
