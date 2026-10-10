# space-hero port bundle

Drop-in files for the `feat/space-hero` branch of muskan-g72/portfolio. Paths match your repo layout
(top-level `app/`, `components/`, `public/`; there is no `src/` folder, unlike the prompt).

```
app/page.tsx                          renders only <SpaceHero />, adds title/description
components/space-hero/SpaceHero.tsx   markup + effect + no-WebGL fallback
components/space-hero/scene.ts        REFERENCE script body, createScene(root) => dispose | null
components/space-hero/content.ts      STAGES, PROJECTS, LINKS
components/space-hero/fonts.ts        next/font: Syne 700/800, Instrument Sans 400/500/600, JetBrains Mono 400/500
components/space-hero/space-hero.css  REFERENCE <style>, scoped under .space-hero, plus additions at the bottom
public/resume.pdf                     your resume
public/shots/*.webp                   verigate, orchestrix, rateshield
```

## Steps to apply
```
git clone https://github.com/muskan-g72/portfolio && cd portfolio
git checkout -b feat/space-hero
npm i three@0.128.0 --save-exact
npm i -D @types/three@0.128.0 --save-exact
npm uninstall @react-three/fiber @react-three/drei      # plus any other now-unused 3D package
# copy this bundle over the repo, delete the old R3F / topology components, then:
npx tsc --noEmit && npm run lint && npm run build
```
Header/footer: the hero must be the whole page on `/`. Cleanest way: move the global header/footer out of
`app/layout.tsx` into a route-group layout (e.g. `app/(site)/layout.tsx`) and keep `/` outside that group.
I could not read your layout, so this is not done in the bundle.

## Not done (needs the repo, which I could not reach)
Clone/branch/push/PR, repo summary, package changes, deleting R3F code, hiding header/footer on `/`,
tsc / lint / build, Playwright side-by-side screenshots, StrictMode leak test, Lighthouse, and the
follow-up commit (Django, CampusPro sentence, Experience.tsx contrast, nav background).

## Checked here
- Every numeric literal in the REFERENCE script appears in the port (only 5 extra `0`s from my cleanup code).
- Syntax check with Node type-stripping. The TypeScript is NOT type-checked against @types/three 0.128.

## Changes vs REFERENCE (all deliberate)
- `var` -> `let/const`, types, `catch {}` (lint rules from eslint-config-next/typescript).
- Canvas is created in createScene (not JSX) and removed on dispose: forceContextLoss() poisons a canvas and StrictMode reuses DOM nodes.
- Image paths are `/shots/...`. Keyframe names are `sh-breathe` / `sh-nudge`. Fonts via CSS vars from next/font.
- Removed the duplicate `function mat` (TypeScript rejects duplicates; both were identical).
- Added: frame loop pauses when the tab is hidden, full cleanup, Resume links to /resume.pdf, contact links row, no-WebGL fallback.
- The `a[href^="#"]` preventDefault hack is gone (no `#` links remain).

## Resume vs REFERENCE
All numbers match: 70+ endpoints, 119 pytest tests, ~100 ms P95, 1 admitted / 9 rejected, 1.92 s, ~95 req/s, P95 460 ms,
11K+ requests, 63 -> 481 jobs/s over 1-8 workers (mean of 5 runs). Wording that is not on the resume (kept as is):
1. RateShield: "load tested with real traffic" (resume: Locust load test).
2. Eyebrow "SOFTWARE ENGINEER" and status "OPEN TO SWE INTERNSHIPS" (resume lists a Software Development Intern role and no objective).
3. VeriGate: "AI-assisted" (resume mentions LLM failure root-cause analysis; reasonable but a paraphrase).
4. Email link uses the resume's mailto: mmuskan_be24@thapar.edu (double "m"). Please confirm it is right.

## Things in REFERENCE that look odd (kept)
- Dead code: ringMesh, beadOn, beamTexture/BEAM, tPrev, tmp (kept, lint-silenced).
- `pointerleave` is bound on window, which rarely fires, so the cursor lens can stay where the pointer last was.
- EXPERIENCE and ABOUT show only a generic line, no real content.
- Syne 800 is loaded (per the prompt) but REFERENCE only uses 700.
