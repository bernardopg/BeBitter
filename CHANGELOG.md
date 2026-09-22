# Changelog

## 1.9.6

### Updated

- Updated compatible direct dependencies and refreshed `pnpm-lock.yaml`.
- Kept TypeScript 6.0.3 and Vitest 4.1.11 pinned in `pnpm-workspace.yaml`: TypeScript 7 is not yet supported by the installed `typescript-eslint` version, and Vitest 5 currently breaks the `@testing-library/jest-dom` matcher type augmentation used by the project.
- Retained ESLint 10.11.0. `eslint-plugin-jsx-a11y` has not declared ESLint 10 peer support; lint currently succeeds, but pnpm reports this upstream peer-range warning.

### Validation

- `pnpm ci:check` (lint, typecheck, tests, production build).
- Local validation ran on Node 24.19.0 and reports the repository's Node engine mismatch (`>=22 <23`). Release/deploy workflows run on Node 22 and perform their own checks.
