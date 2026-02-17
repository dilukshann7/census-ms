# Census Management System (`census-ms`)

A SvelteKit-based census data collection and admin review system.

## What This Project Does

- Collects family census submissions from a public form.
- Stores family + person records in PostgreSQL via Drizzle ORM.
- Provides an admin-only console for reviewing pending submissions, approving/rejecting records, editing records, and deleting approved family records.
- Protects admin routes with Better Auth + an email allowlist.

## Tech Stack

- SvelteKit 2 + Svelte 5
- Vite 7
- Tailwind CSS 4
- Better Auth (email/password)
- Drizzle ORM + Drizzle Kit
- Neon PostgreSQL driver (`@neondatabase/serverless`)
- Zod + SvelteKit Superforms

## Prerequisites

- Node.js (LTS)
- npm
- PostgreSQL database (Neon or any compatible Postgres instance)

## Environment Variables

Create a `.env` file in the project root.

### Required

- `DATABASE_URL`: Postgres connection string used by the app and Drizzle.
- `ADMIN_EMAIL` or `ADMIN_EMAILS`: Admin allowlist (`ADMIN_EMAILS` is a comma-separated list).

### Recommended for Better Auth

- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` (or `BETTER_AUTH_BASE_URL`, depending on your deployment setup)

## Installation

```bash
npm install
```

## Database Setup

Apply your current schema to the configured database:

```bash
npm run db:push
```

Other available database commands:

```bash
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Run Locally

```bash
npm run dev
```

Then open:

- Public census form: `http://localhost:5173/`
- Admin login: `http://localhost:5173/login`

## Bootstrapping an Admin Account

Admin sign-up is restricted to emails in `ADMIN_EMAIL`/`ADMIN_EMAILS`.

Create an admin user by sending a POST request to:

- `POST /api/signup`

Payload:

```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "your-strong-password"
}
```

After signup, log in via `/login` with username/email + password.

## Main Routes

- `/` - Public census submission form
- `/login` - Admin login
- `/admin/approval` - Pending submissions queue
- `/admin/approval/[id]` - Review/edit a pending submission
- `/admin/details` - Approved submissions list
- `/admin/details/[id]` - View/edit/delete an approved submission
- `/logout` - Admin sign-out endpoint

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build
- `npm run check` - Type + Svelte checks
- `npm run check:watch` - Checks in watch mode
- `npm run db:push` - Push schema to DB
- `npm run db:generate` - Generate SQL migrations
- `npm run db:migrate` - Apply migrations
- `npm run db:studio` - Open Drizzle Studio

## Notes

- Admin pages are protected by server-side session checks in `src/routes/admin/+layout.server.ts`.
- If no admin allowlist is set, admin login/signup is disabled by design.
