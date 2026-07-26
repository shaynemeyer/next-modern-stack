# next-modern-stack

A Turborepo monorepo with a Next.js frontend and a NestJS API, sharing a Postgres database via Prisma.

## Apps

- [`apps/web`](apps/web) — Next.js 16 app (notes/folders UI)
- [`apps/api`](apps/api) — NestJS 11 API with Prisma + Postgres, Swagger docs

## Requirements

- [Bun](https://bun.com) v1.3+
- A running Postgres instance (for `apps/api`)

## Install

```bash
bun install
```

## Develop

Run both apps together (Turborepo, in a TUI):

```bash
bun run dev
```

Or run one at a time:

```bash
bun run dev:web   # Next.js on http://localhost:3000
bun run dev:api   # NestJS on http://localhost:3001
```

The web app's dev script waits for the API to be listening on port 3001 before starting.

## Other scripts

```bash
bun run lint        # biome check
bun run lint:fix     # biome check --unsafe --fix
bun run format       # biome format --write
bun run generate     # turbo run generate (Prisma client + orval API client)
```

Linting runs automatically on staged files via lefthook on commit.

## Tooling

- **Package manager / runtime:** Bun
- **Monorepo orchestration:** Turborepo
- **Linting/formatting:** Biome
- **Git hooks:** lefthook
