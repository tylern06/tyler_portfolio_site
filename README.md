# Tyler Nguyen — Portfolio

Personal portfolio site built with Next.js 16, React 19, Tailwind CSS v4, Prisma 7, and PostgreSQL. Includes a blog with daily AI-generated posts via OpenRouter.

---

## Prerequisites

- Node.js 20+
- PostgreSQL 14+ (local or hosted, e.g. Supabase, Neon, Railway)

---

## Environment Variables

Copy the values below into `.env` at the project root and fill in each one:

```env
# PostgreSQL connection string
DATABASE_URL=

# Resend — contact form email (https://resend.com)
RESEND_API_KEY=re_...

# OpenRouter — daily blog post generation (https://openrouter.ai)
OPENROUTER_API_KEY=sk-or-...

# Optional: override the default LLM model
# OPENROUTER_MODEL=google/gemini-2.0-flash-001
```

---

## Installation

```bash
npm install
```

---

## Database Setup

Follow these steps once to create and seed the database.

### 1. Create the database

```bash
createdb tyler_portfolio
# or connect to your hosted provider and create the DB there
```

### 2. Generate the Prisma client

```bash
npx prisma generate
```

### 3. Run migrations

Creates all tables from `prisma/schema.prisma`:

```bash
npm run db:migrate
# runs: prisma migrate dev
```

> For production (no prompts, no shadow DB): `npx prisma migrate deploy`

### 4. Seed the initial blog post

Reads all `.md` files from `content/blog/` and upserts them into the database:

```bash
npm run db:seed
# runs: ts-node -P tsconfig.seed.json prisma/seed.ts
```

Run this any time you add a new markdown file to `content/blog/` and want it in the DB.

---

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Blog Post Generation

### Generate a single post manually

Calls OpenRouter, generates a post on a random AI/tech topic, and saves it to the database:

```bash
npm run generate:post
```

### Run the daily scheduler (7 PM Pacific)

Keeps a process alive and fires the generator every day at 7:00 PM Pacific time:

```bash
npm run scheduler
```

> For production, run this as a background service (e.g. `pm2 start scripts/scheduler.js`) or use Vercel Cron Jobs to call a protected API route on the same schedule.

---

## Scripts Reference

| Command                 | Description                                  |
| ----------------------- | -------------------------------------------- |
| `npm run dev`           | Start dev server on :3000                    |
| `npm run build`         | Production build                             |
| `npm run start`         | Start production server                      |
| `npm run db:migrate`    | Run Prisma migrations (`prisma migrate dev`) |
| `npm run db:seed`       | Seed blog posts from `content/blog/*.md`     |
| `npm run generate:post` | Generate one AI blog post via OpenRouter     |
| `npm run scheduler`     | Start the 7 PM daily post scheduler          |

---

## Schema Changes

When you need to add or change a database model:

1. Edit `prisma/schema.prisma`
2. Run `npm run db:migrate` — creates and applies a new migration file
3. Run `npx prisma generate` — regenerates the Prisma client types
4. Update `prisma/seed.ts` if the new model needs seed data

---
