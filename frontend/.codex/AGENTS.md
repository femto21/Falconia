# Repository Guidelines

## Project Structure & Module Organization

This directory is the frontend for the broader `falconia` project. Application code lives in `src/`, with routing in `src/app/App.tsx` and page components in `src/app/pages/`. Shared UI primitives generated from shadcn live in `src/components/ui/`, while app-level components such as `Header` live in `src/components/`. Authentication helpers are in `src/hooks/`, and shared utilities/types are in `src/lib/`. Static assets belong in `public/` or `src/assets/` depending on whether they need bundling.

## Build, Test, and Development Commands

Use `npm run dev` to start the Vite development server. Use `npm run build` to type-check with `tsc -b` and produce a production build in `dist/`. Use `npm run preview` to serve the built app locally. Use `npm run lint` to run ESLint across the frontend. Example: `npm run build` should pass before opening a PR.

## Coding Style & Naming Conventions

Write React components in TypeScript with 2-space indentation and semicolons, matching the existing files. Use PascalCase for components and page files (`Register.tsx`), camelCase for hooks and helpers (`useAuth.ts`), and prefer the `@/` alias for imports from `src/`. Keep shared UI primitives under `src/components/ui/` and avoid mixing feature logic into them. ESLint 9 and TypeScript strict mode are the enforced baseline; fix lint and type issues before submitting changes.

## Testing Guidelines

There is currently no frontend test runner configured in `package.json`. Until one is added, treat `npm run lint` and `npm run build` as the minimum verification steps and document any manual checks in your PR. When tests are introduced, place them next to the feature or under a dedicated `src/__tests__/` directory, using `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines

Git history is not available in this workspace snapshot, so no repository-specific commit convention could be verified. Use short, imperative commit messages such as `Add protected home route` or `Refactor auth context`. PRs should include a concise summary, linked issue if applicable, screenshots for UI changes, and the verification steps you ran.

## Configuration Notes

The frontend uses Vite, React 19, Tailwind CSS 4, and path aliases configured in `vite.config.ts` and `tsconfig.app.json`. Do not commit generated output such as `dist/`, and keep environment-specific values out of source files.


NEVER READ .env files
