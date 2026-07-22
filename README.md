# Charlotte Star Calculator

A GitHub-ready Next.js calculator for the fictional Charlotteverse. It converts CLT and a legal surname into base stellar values, seeded values, current evolution values, spectral classes, luminosity, density, and a local leaderboard score.

## Features

- TEFFB, RadB, MassB, RadSeed, TeffSeed, and MassSeed calculations
- User-requested TEFFB display rounding to three decimal places
- Conditional MassB display precision: six decimals below 1, four from 1 to below 100, and two at 100 or greater
- O1–L0 Seeded-Teff spectral rubric for SpectralB and SpectralC classification
- Radius, effective-temperature, and current-bound-mass evolution multipliers
- Deterministic stage selection across protostar, proto-main-sequence, main-sequence, and later stages
- Current Teff, radius, mass, luminosity, density, stage, path, and SpectralC presentation
- Local leaderboard with saved entries and score, luminosity, or current-mass ranking modes
- Responsive layout for desktop, tablet, and mobile

Leaderboard entries are stored in `localStorage`, so they persist in the current browser without requiring a database. If you want a shared public registry, replace the storage layer with your preferred database or API.

## Source model

The implementation is derived from these user-supplied source files:

- `CHARLOTTEVERSELAW_Rule92_Applied.docx` (revision date 2026-07-22)
- `stellar_evolution_with_redefined_teff_spectral_rubric.xlsx`

The calculator logic is bundled in `app/lib/calculator.ts` so the website can run without a database or server-side API.

User-provided formulas take precedence where they differ from the document. In particular, the application uses the requested seven-term TEFFB formula and displays TEFFB to three decimal places.

## Run locally

Requirements:

- Node.js 20.9 or newer
- pnpm 11

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verify a production build

```bash
pnpm lint
pnpm build
```

## Deploy on Vercel

1. Create a new GitHub repository and push this project.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Keep the detected framework as **Next.js**.
4. Deploy. No environment variables or custom build settings are required.
5. Add your own domain in **Project Settings → Domains**.

Every Git branch or pull request can receive a Vercel preview deployment through the standard Git integration.

## Calculation notes

- Full precision is preserved through base, seed, spectral-weight, checkpoint, and current-value calculations. Rounding is applied only to presentation values.
- RadB always uses unseeded TeffB.
- SpectralB is determined from Seeded Teff only.
- Current luminosity is `R² × (Teff / 5772)⁴` in solar luminosities.
- Current mean density is `1.409822456 × M / R³` in g/cm³.

## Project structure

```text
app/
  globals.css              Interface design
  layout.tsx               Metadata and document shell
  page.tsx                 Calculator and leaderboard UI
  lib/calculator.ts        Formula and evolution engine
```

This is a fictional system and does not alter or describe real-world scientific, legal, medical, social, or personal status.
