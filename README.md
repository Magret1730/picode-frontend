# picode-frontend

Frontend for **Picode** — a kid-friendly learning platform where students complete lessons, write code in a browser editor, submit for friendly feedback, and earn XP.

## Project overview

This Next.js app provides:

- Landing page + student dashboard
- Course/lesson browsing
- Classwork + assignment coding playground (Monaco editor)
- Progress page (API-first with offline fallback)
- MVP admin pages (`/admin/*`) for managing content

## Tech stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS variable theme tokens (light/dark mode)
- **Editor**: Monaco (`@monaco-editor/react`)
- **Theme**: `next-themes`
- **API**: `fetch` wrapper with offline-first fallback

## Folder structure

High-level layout:

```
src/
  app/                     # routes (App Router)
    admin/                 # MVP admin pages (server actions)
    assignments/[id]/      # assignment coding page
    classworks/[id]/       # classwork coding page
    courses/               # course list + detail
    lessons/[lessonId]/    # lesson detail by UUID
    progress/              # XP/badges/progress UI
  components/
    playground/            # CodePlayground (Monaco + submit)
    site/                  # Navbar, Footer, ThemeToggle
    ui/                    # Button/Card/Badge/etc
  lib/
    api/                   # API client + endpoint wrappers
    admin/                 # server-only admin API helper
    mock-data.ts           # offline mock data (MVP)
```

## Requirements

- Node.js **18+**

## Environment variables

Copy the example env file:

```bash
cp .env.example .env.local
```

### Required

- **`NEXT_PUBLIC_API_URL`**: backend base URL
  - local example: `http://localhost:3001`

### Admin (optional, MVP)

Admin pages call backend admin APIs from the server (so keys stay server-side):

- **`ADMIN_KEY`**: must match backend `ADMIN_KEY` (defaults to `dev-admin`)

## Install

```bash
cd picode-frontend
npm install
```

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000`.

## Connect the backend

1. Start the backend API (see `picode-backend/README.md`)
2. Set `NEXT_PUBLIC_API_URL` in `.env.local`

Example:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Notes:

- The UI is **API-first**. If the backend is unreachable, many pages fall back to mock data.
- Classwork/assignment submissions require the backend to be online (and real UUID content IDs).

## Monaco Editor (CodePlayground)

The coding playground lives in:

- `src/components/playground/CodePlayground.tsx`

Key behaviors:

- Uses Monaco via `@monaco-editor/react` (client-only, dynamically imported).
- The editor `value` is bound to React state, so **Submit** sends the latest code.
- “Run code” previews HTML/CSS in a sandboxed `<iframe>`.
- For MVP, student JavaScript is stripped from preview and sanitized on the backend runner.

## Deploy to Vercel

1. Push your repo to GitHub
2. Create a new Vercel project pointing to `picode-frontend`
3. Set environment variables in Vercel:
   - `NEXT_PUBLIC_API_URL` = your backend URL
   - `ADMIN_KEY` (optional) if you want to use `/admin/*`
4. Build settings:
   - **Install**: `npm install`
   - **Build**: `npm run build`
   - **Output**: Next.js (auto-detected)

## Deploy to Netlify

Netlify supports Next.js via its Next runtime/plugin.

1. Create a new Netlify site from GitHub
2. Set the base directory to `picode-frontend` (if using a monorepo)
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next` (Netlify Next runtime handles this)
4. Add environment variables:
   - `NEXT_PUBLIC_API_URL`
   - `ADMIN_KEY` (optional)

If you see server-rendering issues on Netlify, verify the Next runtime is enabled and you’re not forcing a static export.

## Branching workflow (simple)

- **`main`**: stable / releasable
- **`dev`**: active development

Suggested flow:

1. Create a feature branch off `dev`
2. Open a PR into `dev`
3. Merge `dev` → `main` for releases

## Commit workflow

Keep commits small and descriptive. A simple convention:

- `feat(scope): ...` for new features
- `fix(scope): ...` for bug fixes
- `refactor(scope): ...` for internal changes
- `docs: ...` for documentation updates
