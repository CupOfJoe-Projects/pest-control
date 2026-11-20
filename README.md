# McDonald Exterminators

Demo redesign of [mcdonaldexterminators.com](https://www.mcdonaldexterminators.com/) for McDonald Exterminators, a family owned pest control company in Polk County, FL since 1959.

Mobile first, statically generated, built to load fast on a phone.

**Stack:** Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · shadcn/ui (Base UI) · lucide-react · zod

## Run locally

Requires Node 20.9+.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run lint
```

> If a CSS change does not show up in `npm run build`, delete `.next` and build again. Turbopack can cache stale Tailwind output.

## Environment variables

Copy `.env.example` to `.env.local`. All are optional for the demo.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for sitemap, robots, Open Graph, and JSON-LD. On Vercel it falls back to the production domain. |
| `GHL_CONTACT_FORM_API_KEY` | GoHighLevel Private Integration token (contacts.write scope). Each quote request is upserted as a contact, tagged `website lead`, with a note holding the details (`lib/ghl.ts`). GHL workflows on that tag send the team and customer texts. Unset: leads are only logged. |
| `GHL_LOCATION_ID` | The GHL sub-account's Location ID. |
| `RESEND_API_KEY` | Email delivery for quote requests. Not wired up yet. |
| `QUOTE_TO_EMAIL` | Inbox that receives quote requests. Not wired up yet. |

Quote submissions are validated with zod and logged to the server console, which shows up in Vercel function logs. The Resend code is stubbed in `app/api/quote/route.ts`.

## Editing content

All copy lives in typed files under `/content`. There is no CMS.

| File | What is in it |
| --- | --- |
| `content/site.ts` | Business name, phone, address, email, text line, nav, **feature flags**, and **rating placeholders** |
| `content/services.ts` | Service pages: name, short line, description, bullets, icon, pests covered |
| `content/pests.ts` | Pest library: signs, why they show up in Florida, prevention tips, when to call |
| `content/areas.ts` | City pages: blurb, local intro (written differently per city), common pests, map coordinates |
| `content/reviews.ts` | Reviews for the trust wall marquee. Real 5 star Google reviews, word for word |
| `content/plans.ts` | Plan cards (One Time, Quarterly, Commercial). Prices are placeholders |
| `content/affiliations.ts` | "Certified. Trusted. Proven." logos from the current site |
| `content/faq.ts` | FAQ answers, also published as `FAQPage` JSON-LD |
| `lib/images.ts` | Image slots. Each renders a placeholder until its file is imported |

Pages for every service, pest, and area are generated from these files with `generateStaticParams`. Add an entry and the page and links appear automatically (and the sitemap entry, once `IS_DEMO` is off).

**Copy rules:** short and plain, no em dashes, no hyphens in visible copy (write "family owned", "same day"), no "comprehensive", "cutting edge", "solutions", or "elevate".

### Flags (`content/site.ts`)

| Flag | Default | Effect |
| --- | --- | --- |
| `SHOW_TERMITES` | `true` | Shows the termite service and termite pest page everywhere |
| `SHOW_OFFER` | `true` | Shows the intro offer bar and offer callouts |
| `IS_DEMO` | `true` | **Demo guardrail.** robots.txt disallows everything, every page is `noindex, nofollow`, the sitemap is empty. Set to `false` at launch |
| `GOOGLE_RATING` | `{ 5.0, 202 }` (real, checked Nov 16, 2026) | Rating shown in the hero, trust wall, and JSON-LD. Set to `null` to hide it everywhere |
| `SECOND_RATING` | `null` (hidden) | Second rating badge on the trust wall. `null` hides it |
| `SHOW_PRICING` | `true` | Shows the price line ("Free estimate") on the plan cards |
| `NO_LONG_CONTRACTS_CONFIRMED` | `false` | Shows the contracts row in the local vs national table |

### Images

Image slots live in `lib/images.ts`.

To add one: export it as WebP into `/public/images`, `import` it at the top of `lib/images.ts`, and set `src` on its slot. The static import gives `next/image` the dimensions and the blur placeholder.

| Slot | File | Size | Used in |
| --- | --- | --- | --- |
| `hero` | `hero.webp` ✅ | 1672x940 | Homepage hero, desktop (send a 2400px+ version for sharper retina) |
| `heroMobile` | `hero-mobile.webp` ✅ | 752x940 | Homepage hero, phones (4:5 crop of the same photo) |
| `familyHome` | `family-home.webp` ✅ | 1600x900 | Guarantee section |
| `techCutout` | `tech-cutout.webp` | ~900x1100, transparent | Optional: appears in the orange closing band when present |
| `inspection` | `inspection.webp` | 1200x900 | Homeowner service page |
| `yard` | `yard.webp` | 1200x900 | Mosquito service page |
| `commercial` | `commercial.webp` | 1200x900 | Commercial service page |

A slot with no file renders nothing, and every section that uses one has a designed fallback (icon tile, seal, or timeline). The demo never shows a placeholder box.

**These are AI demo images.** Keep captions generic. Never present them as the McDonald family, staff, or trucks, and no generated truck should carry a name or logo. Replace with real photos before launch.

Pest icons: `npm run icons` exports every pest icon to `/public/icons/pests/*.svg` (2px stroke, brand green). The site renders the same icons inline, so it makes no extra requests.

## Project layout

```
app/                    Routes (home, services, pests, areas, about, contact, legal, api/quote)
  sitemap.ts robots.ts  SEO files
  opengraph-image.tsx   Share image for texts and social posts
components/home/        Homepage only sections (hero and quote starter, problem picker, plans, guarantee, comparison, story, final CTA)
components/site/        Shared sections (header, offer bar, footer, trust wall, FAQ, quote form, visit steps, map)
components/icons.tsx    Custom pest icons on lucide's grid, plus the icon map
components/ui/          shadcn/ui primitives
content/                All site copy and data
lib/                    SEO helpers, quote schema, image slots, utilities
public/icons/pests/     Exported pest icon SVGs (npm run icons)
scripts/                Icon export script
```

## Decisions worth knowing

- **Mobile first.** A sticky bottom bar on phones (Call, Text, Quote) keeps the phone number one tap away on every screen. All tap targets are at least 48px.
- **Native `<select>` for the pest picker.** Phones open their own picker, and it avoids shipping a popup library.
- **Mobile menu loads on demand.** The menu sheet's code downloads on first tap, not on page load.
- **Orange buttons use dark text.** White on `#E8701A` fails WCAG AA (3.1:1). Near black on orange passes (5.6:1).
- **Light theme only.** `dark:` utilities only apply under a `.dark` class, so phones in dark mode get the designed look.
- **Fonts use `display: optional`** so text never repaints after load, which keeps mobile LCP down.
- **Map is a hand drawn SVG**, not a Google Maps embed, to keep the page fast.
- **The top bar is static.** It was a scrolling ticker, but with the moving reviews that was too much motion.
- **Marquees are pure CSS.** The server sends each row once; a tiny client component clones the second copy that makes the loop seamless. They pause on hover, focus, and touch, swipe on phones, and become a static scrollable row for reduced motion.
- **Hero is the full bleed photo.** On phones the photo is a 4:5 block with the headline over the trees and the rest of the hero on deep green below, so the tech stays visible and the headline, rating, and Call button fit above the fold at 390x844. The photo is preloaded per breakpoint (next/image cannot preload `<picture>` art direction).
- **Demo wordmark** (`components/site/logo.tsx`): the 1959 seal mark, "McDonald" in Bricolage, "EXTERMINATORS" in tracked Inter. Used in the header, footer, and OG image.
- **Scroll reveal never hides what is on screen.** Only elements that start below the fold get `data-pending`, and they reveal at 10% visibility.
- **`buttonVariants()` merges its classes.** Links use it directly, and without the merge `border-transparent` beat the outline colors by CSS order.
- **Ratings render as text stars**, not SVGs, to keep the HTML small.
- **Font stacks end in a generic sans serif.** Without it, text fell back to a serif in environments with no Arial (headless Linux). Bricolage (headings) is preloaded; Inter (body) loads right after the CSS so it does not compete with the hero photo.
- **Unknown slugs** (for example `/pests/termites` while the flag is off) return a real 404 on Vercel. Locally, `next start` can answer 200 with the not found page and a `noindex` tag, which is harmless.

## Deploy

Hosted on Vercel: project `mcdonald-exterminators` in the **Validated Peptides' projects** team, connected to `CupOfJoe-Projects/pest-control`.

- Pushes to `main` deploy to production. Other branches and PRs get preview deployments.
- Manual deploys from this folder: `vercel deploy` (preview) or `vercel deploy --prod`. Run `vercel whoami` first and confirm the account.
- Preview URLs are behind Vercel Authentication. Share the production URL with people outside the team.

## Tests

Git hooks run the tests automatically, so a broken edit cannot reach the live site:

- **On commit** (a few seconds): `npm run check` runs the type check, lint, and unit tests.
- **On push** (about a minute): `npm run verify` runs everything above, then a production build and the browser tests. If anything fails, the push is stopped and nothing deploys.
- **On GitHub**: `.github/workflows/ci.yml` runs the same `npm run verify` for every push to `main`, which covers edits made on github.com.

| Command | What it runs |
| --- | --- |
| `npm test` | Unit tests (`tests/unit`, Vitest) |
| `npm run test:e2e` | Production build, then browser tests (`tests/e2e`, Playwright, desktop and phone widths) |
| `npm run verify` | Everything; what the pre-push hook runs |

What they cover:

- **Content guard rails** (`tests/unit/content.test.ts`): unique URL slugs, area and coupon pest links that point to real pages, coupons with questions, no monthly prices, phone number matches the tap to call link, social links without tracking codes.
- **SEO** (`tests/unit/seo.test.ts`, `tests/e2e/seo.spec.ts`): every page is server rendered with one `<h1>`, title, description, canonical, and Open Graph tags; LocalBusiness and FAQ structured data; robots and sitemap follow `IS_DEMO`; old site URLs redirect.
- **Quote forms and GoHighLevel** (`tests/unit/quote-route.test.ts`, `tests/unit/ghl.test.ts`, `tests/e2e/quote-forms.spec.ts`): validation, honeypot, coupon tagging, the GHL contact, tags, and note, and the "please call us" fallback when GHL fails. Tests never contact the real GHL account.
- **Chat widget** (`tests/e2e/chat-widget.spec.ts`): loads with the right widget ID, and on phones sits above the Call / Text / Quote bar. The GHL loader is faked in tests.
- **Links and layout** (`tests/e2e/links.spec.ts`, `tests/e2e/layout.spec.ts`): no broken internal links, no sideways scrolling.

First time on a new computer: `npm install` sets up the hooks, and `npx playwright install chromium` downloads the test browser.

## Checks run before handoff

- Lighthouse mobile on the live Vercel site (V2): Performance 95 to 97, Accessibility 100, Best Practices 100. SEO shows 69 only because `IS_DEMO` sets `noindex`; it was 100 before the flag and returns when it is turned off
- No horizontal scroll at 375px and 768px
- Hero quote starter and full quote form: client validation, server validation, honeypot, success state, plan preselect from the plan cards
- All 40 pages crawled from the homepage, 0 broken internal links, every `<img>` has alt text
- Visible copy scanned for hyphens, dashes, and banned words: 0 found

## Confirm with owner

Every item below is marked with a `TODO(owner)` comment in the code.

- [x] Google rating and review count (`GOOGLE_RATING` in `content/site.ts`)
- [x] Termite service offered (`SHOW_TERMITES`, from the old site)
- [ ] Current intro offer (`SHOW_OFFER`, `OFFER`)
- [x] Real reviews from the Google Business Profile (`content/reviews.ts`)
- [ ] Set `IS_DEMO` to `false` at launch
- [ ] Which second review platform they use, and its real rating (`SECOND_RATING`)
- [ ] Original files for the affiliation logos (BusinessRate, FPMA, NPMA, Lakeland Chamber, BNI), pulled from the old site at web resolution (`content/affiliations.ts`)
- [x] Guarantee wording (from the old site)
- [x] Contract terms: no contract required (owner, November 2026). Shown in the FAQ and the comparison table.
- [x] FAQ answers: pet safety, response time, being home (from the old site, plus contracts)
- [x] Same day policy ("Call before 2 PM") and service reports (from the old site)
- [ ] Techs live in Polk County
- [ ] Real photos to replace every AI demo image, plus the early days photo on `/about` (`lib/images.ts`, `PhotoPlaceholder`)
- [x] Original logo files (`public/brand/logo.png` red and black, `public/brand/logo-black-white.png` one color)
- [x] Google Business Profile linked (`site.googleBusiness`): reviews links, address links, footer, and JSON-LD `sameAs`
- [ ] More real reviews, ideally ones that name a pest or a town (`content/reviews.ts`)
- [ ] Founder name, family history, and timeline milestones (`TIMELINE` in `content/site.ts`)
- [x] FDACS licenses: business JB3680, certified operator JF9080 (`FDACS_LICENSE`, `CERTIFIED_OPERATOR_LICENSE`)
- [ ] Years with the company for each team member (`content/team.ts`, shows "TBD" for now)
- [x] Call back time: 15 minutes in office hours (`CALLBACK_MINUTES`)
- [x] Starting prices (`content/pricing.ts`, `/pricing`, plan cards, cost FAQ)
- [ ] Open pricing questions marked TODO in `content/pricing.ts` (one time scope, bundle startup charge, Platinum mouse coverage, what the $45/month plans cover, fire ant terms)
- [ ] GoHighLevel API token and Location ID for quote delivery (`GHL_CONTACT_FORM_API_KEY`, `GHL_LOCATION_ID`), plus a GHL workflow on the `website lead` tag
- [x] Hero availability card (`HERO_AVAILABILITY`, now their same day policy)
- [x] Pet and family safe claim (from the old site)
- [x] Privacy policy and terms (carried over from the old site)
- [ ] Lakeland or Bartow as the founding city (old site says both; `foundingCity`)
- [ ] Working text line (the old trustco.ai link is dead; `textUrl`)
