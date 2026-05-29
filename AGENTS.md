---
# Codebase Best Practices

This project uses **Next.js 16**, **React 19**, **Tailwind CSS v4**, **Prisma 7 + PostgreSQL**, **TypeScript 5**, and **Framer Motion**. These rules apply to all code changes.
---

## Next.js

- Default to **Server Components**. Only add `"use client"` when the component needs browser APIs, event handlers, or hooks like `useState`/`useEffect`.
- Fetch data directly in Server Components using `async/await` — do not use `useEffect` + `fetch` for data that can be fetched server-side.
- Use the **App Router** conventions: `page.tsx`, `layout.tsx`, `route.ts`, `loading.tsx`, `error.tsx`. Never mix Pages Router patterns.
- Co-locate route-specific components inside `app/` subdirectories. Only promote a component to `components/` if it is reused across two or more routes.
- API routes live in `app/api/**/route.ts` and must export named HTTP methods (`GET`, `POST`, etc.) — not a default export handler.
- Use `next/font` for all fonts (already set up with Inter and Space Grotesk). Never load fonts via `<link>` tags.
- Use `next/image` for all `<img>` elements. Always provide `width`, `height`, and meaningful `alt` text.
- Use `next/link` for all internal navigation. Never use bare `<a>` tags for internal routes.
- Metadata goes in `export const metadata` or `generateMetadata()` in `layout.tsx` / `page.tsx`. Never use `<Head>` from `next/head`.
- Read `node_modules/next/dist/docs/` before using any Next.js API to confirm the current signature.

---

## React

- Prefer **composition over inheritance**. Build UIs by combining small, focused components.
- Keep components **pure**: given the same props, return the same JSX. Side effects belong in event handlers or Server Actions, not during render.
- Extract repeated UI patterns into their own components once duplicated a second time — not before.
- Prop drilling beyond two levels is a signal to use React Context or co-locate state closer to where it's used.
- Avoid `useEffect` for derived state — compute it during render instead.
- Memoize with `useMemo`/`useCallback` only when a measurable performance problem exists, not preemptively.
- Always key list items with a stable, unique identifier — never the array index.
- Prefer controlled components for forms. Uncontrolled refs are acceptable for non-reactive DOM interactions (e.g., focus management).

### SOLID applied to React

- **Single Responsibility**: each component does one thing. A `<BlogCard>` renders a card; a separate `useBlogData` hook fetches data.
- **Open/Closed**: accept a `className` or `children` prop to extend appearance without modifying the component.
- **Liskov**: a specialized component (e.g. `<PrimaryButton>`) must remain a valid drop-in wherever its base (`<Button>`) is used.
- **Interface Segregation**: pass only the props a component actually needs. Avoid god-object prop bags.
- **Dependency Inversion**: depend on abstractions. Pass data-fetching functions as props or use hooks rather than hardcoding `fetch('/api/...')` inside a component.

---

## Tailwind CSS v4

- **Tailwind v4 uses CSS-first configuration** — there is no `tailwind.config.js`. All theme customization lives in `app/globals.css` using `@theme`.
- Use utility classes exclusively. Do not write custom CSS unless you are defining a design token in `@theme` or a base style in `@layer base`.
- Follow a consistent class order: layout (display, position) → box model (size, spacing) → typography → visual (color, border, shadow) → motion → state variants.
- Use `cn()` from `lib/utils.ts` (backed by `tailwind-merge` + `clsx`) to conditionally join class strings. Never string-concatenate class names manually.
- Dark mode: use the `dark:` variant. The project uses `ThemeProvider` with a class strategy — do not change this approach.
- Responsive design: mobile-first. Default styles target mobile; use `sm:`, `md:`, `lg:`, `xl:` to layer up.
- Avoid magic numbers inline. If a value repeats or has semantic meaning (brand color, section spacing), define it as a CSS variable in `@theme`.

---

## Prisma + PostgreSQL

- The Prisma client singleton is in `lib/prisma.ts`. Always import from there — never instantiate `new PrismaClient()` elsewhere.
- All database access belongs in **`lib/`** (e.g., `lib/blog.ts`) or in Server Actions / API route handlers. Never import Prisma in a Client Component.
- Schema changes require a migration: run `npm run db:migrate` (maps to `prisma migrate dev`). Never edit the database directly.
- When adding a new model or field, update `prisma/schema.prisma` first, then run the migration, then update the seed in `prisma/seed.ts`.
- Use `select` to fetch only the columns a query actually needs — avoid selecting `*` on large text columns (e.g., `content`) when only metadata is needed.
- Wrap multi-step writes in a transaction (`prisma.$transaction()`).
- Never store secrets in the schema. `DATABASE_URL` comes from environment variables only.
- For PostgreSQL-specific features (arrays, `jsonb`, full-text search), use Prisma's native type annotations and raw queries (`prisma.$queryRaw`) with tagged template literals to prevent SQL injection.

---

## Architecture & Clean Code

- **Folder responsibilities**:
  - `app/` — routing, pages, layouts, API routes, Server Actions
  - `components/` — shared, reusable UI components
  - `lib/` — business logic, data access, utility functions
  - `data/` — static/seed data and content helpers
  - `content/` — markdown/MDX source files
  - `prisma/` — schema, migrations, seed
  - `scripts/` — one-off CLI scripts (not imported by the app)
- Business logic never lives in a component file. Extract it to `lib/`.
- Keep `page.tsx` files thin: they fetch data and pass it to components, but contain no logic of their own.
- Prefer explicit named exports over barrel files (`index.ts`) to keep imports traceable.
- Environment variables: access only via `process.env.VAR_NAME`. Add new variables to `.env.local` (for dev) and document them in `.env.example`.

---

## Error Handling

- Every `async` function that calls an external boundary (database, HTTP API, filesystem, third-party SDK) must be wrapped in `try/catch`. "External boundary" means anything that can fail for reasons outside your control.
- API route handlers (`app/api/**/route.ts`) must catch all errors and return an appropriate HTTP response — never let an unhandled exception reach the framework. Wrap the entire handler body or each distinct async operation.
- Functions in `lib/` that query the database should catch errors, log them with a descriptive prefix (e.g. `[blog] getAllPosts failed:`), and return a safe fallback (`[]`, `null`, `false`) so callers do not need to handle DB failures individually.
- Scripts in `scripts/` should use `.catch()` on the top-level call and `process.exit(1)` on failure so the scheduler/cron can detect errors.
- Use `err instanceof Error ? err.message : String(err)` when logging caught values — never `err.message` directly, because thrown values are not guaranteed to be `Error` instances.
- Do not catch errors silently. Every `catch` block must either log the error, re-throw it, or return an error response. An empty `catch {}` is forbidden.
- Separate error handling by concern: catch network errors, parse errors, and DB errors in distinct blocks with specific messages rather than one monolithic catch.

---

## TypeScript

- `strict` mode is on. Do not use `any` — use `unknown` and narrow, or define a proper interface/type.
- Co-locate types with the code that owns them. Shared types go in `lib/types.ts`.
- Use `type` for object shapes and unions. Use `interface` only when you need declaration merging (rare).
- Avoid type assertions (`as Foo`) except at system boundaries (e.g., parsing API responses).
- Use `satisfies` to validate an object against a type while preserving its literal type.

---

## UX & Accessibility

- Every interactive element must be keyboard-accessible and have a visible focus ring. Do not remove `outline` without replacing it with an equivalent style.
- Buttons must have accessible labels: text content, `aria-label`, or `aria-labelledby`. Icon-only buttons require `aria-label`.
- Color alone must never convey meaning — pair color with text or icon.
- Minimum touch target size is 44×44px (WCAG 2.5.5).
- Animations use `framer-motion`. Respect the user's motion preference: wrap motion components with `AnimatePresence` and check `useReducedMotion()` to disable or reduce animation when set.
- Loading states should be communicated visually and to screen readers (`aria-busy`, skeleton loaders, or spinner with `role="status"`).
- Headings must follow a logical hierarchy: one `<h1>` per page, then `<h2>`, `<h3>` — never skip levels.
- Form inputs require associated `<label>` elements. Error messages must reference the input via `aria-describedby`.
- Use semantic HTML first (`<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`) before reaching for `<div>`.

---

## Git Commit Messages

- Use the imperative mood in the subject line: "Add feature" not "Added feature" or "Adds feature".
- Keep the subject line under 72 characters.
- Use one of these prefixes to categorize the change:
  - `feat:` — new feature
  - `fix:` — bug fix
  - `refactor:` — code change that neither fixes a bug nor adds a feature
  - `style:` — formatting, missing semicolons, etc. (no logic change)
  - `docs:` — documentation only
  - `chore:` — build process, dependency updates, tooling
  - `test:` — adding or updating tests
- Capitalize the first word after the prefix.
- Do not end the subject line with a period.
- If the change needs explanation, add a blank line after the subject and write a short body paragraph explaining the *why*, not the *what*.
- Reference related issues or PRs at the end of the body: `Closes #123`.

**Examples:**
```
feat: Add PostgreSQL blog post storage via Prisma

Replaces filesystem-based markdown reads with a Prisma-backed
PostgreSQL store so posts can be managed without filesystem access.
```
```
fix: Prevent duplicate post seeding on re-run
```
```
chore: Install @prisma/adapter-pg and pg driver
```
