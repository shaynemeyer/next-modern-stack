# api

The backend for next-modern-stack: a [NestJS 11](https://nestjs.com) API for managing notes and folders, using [Prisma](https://www.prisma.io) 7 over Postgres. Consumed by the [`web`](../web) Next.js app.

## Requirements

- A Postgres database, with `DATABASE_URL` set (e.g. in `apps/api/.env`)

## Getting started

```bash
bun install
bunx prisma migrate dev   # apply migrations / create the local schema
bun run dev
```

The API listens on port 3001 by default (override with `PORT`). Swagger docs are served at [http://localhost:3001/api-docs](http://localhost:3001/api-docs), and the raw OpenAPI JSON (used by the web app's `orval` codegen) at `/api-docs-json`.

## Scripts

```bash
bun run dev          # nest start --watch
bun run build         # nest build
bun run start:prod    # bun dist/main
bun run test           # jest unit tests
bun run test:e2e       # jest e2e tests
bun run test:cov       # jest with coverage
bun run lint           # biome check
bun run lint:fix        # biome check --unsafe --fix
```

## Structure

- `src/folders`, `src/notes` — feature modules (controller, service, DTOs)
- `src/prisma` — Prisma module/service (injectable `PrismaClient` wrapper)
- `src/generated/prisma` — generated Prisma client (do not edit by hand; regenerate via `prisma generate`)
- `prisma/schema.prisma` — data model: `Folder` (self-referential, for nesting) and `Note` (belongs to a `Folder`)

## Data model

- **Folder**: `id`, `name`, optional `parentId` (self-relation for nested folders), `notes[]`, `createdAt`
- **Note**: `id`, `text`, `folderId` (required), `createdAt`
