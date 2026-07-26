# web

The frontend for next-modern-stack: a [Next.js 16](https://nextjs.org) app (App Router) for managing notes and folders, backed by the [`api`](../api) NestJS service.

## Getting started

From the repo root, install dependencies and start Postgres/the API first, then:

```bash
bun run dev:web
```

The dev script waits for the API to be reachable on `localhost:3001` before starting `next dev` (see `scripts/wait-for-api.sh`).

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Scripts

```bash
bun run dev        # wait for API, then start Next.js dev server
bun run build       # next build
bun run start        # next start
bun run generate    # orval: regenerate the typed API client from the NestJS Swagger schema
```

`generate` requires the API's dev server to be running (it reads `http://localhost:3001/api-docs-json`) and writes the generated client to `src/generated/api.ts`.

## App structure

- `src/app` — routes: `/` (home), `/notes`, `/notes/[id]`, `/terminal`
- `src/components/notes`, `src/components/terminal`, `src/components/shared` — feature components
- `src/components/ui` — [shadcn/ui](https://ui.shadcn.com) components (Base UI + Tailwind)
- `src/generated` — orval-generated API client (do not edit by hand)
- `src/lib` — shared utilities
- `src/modules` — feature modules

## Stack

- Next.js 16, React 19
- Tailwind CSS v4, shadcn/ui, Base UI, lucide-react icons
- nuqs for URL state, next-themes for theming, sonner for toasts
- orval for generating a typed client from the API's OpenAPI schema

## Notes

This project pins Next.js 16, which has breaking changes vs. earlier versions — see `AGENTS.md` and `node_modules/next/dist/docs/` before assuming APIs from older Next.js docs still apply.
