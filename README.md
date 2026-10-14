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
| `content/reviews.ts` | Testimonials |

Pages for every service, pest, and area are generated from these files with `generateStaticParams`. Add an entry and the page, sitemap entry, and links appear automatically.

**Copy rules:** short and plain, no em dashes, no hyphens in visible copy (write "family owned", "same day"), no "comprehensive", "cutting edge", "solutions", or "elevate".

### Flags (`content/site.ts`)

| Flag | Default | Effect |
| --- | --- | --- |
| `SHOW_TERMITES` | `false` | Shows the termite service and termite pest page everywhere |
| `SHOW_OFFER` | `true` | Shows the intro offer bar and offer callouts |
| `GOOGLE_RATING` | `{ 4.9, 200+ }` | Rating shown in the hero, reviews, and JSON-LD. Set to `null` to hide it everywhere |

## Project layout

```
app/                    Routes (home, services, pests, areas, about, contact, legal, api/quote)
  sitemap.ts robots.ts  SEO files
  opengraph-image.tsx   Share image for texts and social posts
components/home/        Homepage only sections
components/site/        Shared sections (header, footer, quote form, CTA block, map, reviews)
components/icons.tsx    Custom pest icons on lucide's grid, plus the icon map
components/ui/          shadcn/ui primitives
content/                All site copy and data
lib/                    SEO helpers, quote schema, utilities
```

## Decisions worth knowing

- **Mobile first.** A sticky bottom bar on phones (Call, Text, Quote) keeps the phone number one tap away on every screen. All tap targets are at least 48px.
- **Native `<select>` for the pest picker.** Phones open their own picker, and it avoids shipping a popup library.
- **Mobile menu loads on demand.** The menu sheet's code downloads on first tap, not on page load.
- **Orange buttons use dark text.** White on `#E8701A` fails WCAG AA (3.1:1). Near black on orange passes (5.6:1).
- **Light theme only.** `dark:` utilities only apply under a `.dark` class, so phones in dark mode get the designed look.
- **Fonts use `display: optional`** so text never repaints after load, which keeps mobile LCP down.
- **Map is a hand drawn SVG**, not a Google Maps embed, to keep the page fast.
- **Unknown slugs** (for example `/pests/termites` while the flag is off) return a real 404 on Vercel. Locally, `next start` can answer 200 with the not found page and a `noindex` tag, which is harmless.

## Deploy

Hosted on Vercel: project `mcdonald-exterminators` in the `joseph-barkates-projects` team.

- Live: https://mcdonald-exterminators.vercel.app
- Manual deploys from this folder: `vercel deploy` (preview) or `vercel deploy --prod`
- Preview URLs are behind Vercel Authentication. Share the production URL with people outside the team.
- To deploy on every push, connect the GitHub repo in the Vercel dashboard under Project Settings, Git. Vercel's GitHub app needs access to this private repo first.

## Checks run before handoff

- Lighthouse mobile on the live Vercel site: Performance 95 to 98, Accessibility 100, Best Practices 100, SEO 100
- No horizontal scroll at 375px and 768px
- Quote form: client validation, server validation, honeypot, and success state
- All 40 sitemap pages crawled, 0 broken internal links
- Visible copy scanned for hyphens, dashes, and banned words: 0 found

## Confirm with owner

Every item below is marked with a `TODO(owner)` comment in the code.

- [ ] Google rating and review count (`GOOGLE_RATING` in `content/site.ts`)
- [ ] Termite service offered? (`SHOW_TERMITES`)
- [ ] Current intro offer (`SHOW_OFFER`, `OFFER`)
- [ ] Real photos: trucks, techs, family, early days (every `PhotoPlaceholder`)
- [ ] Logo files, ideally vector (`components/site/logo.tsx`; the current mark is cropped from the old site header)
- [ ] Google Business Profile URL for the reviews link (`GOOGLE_REVIEWS_URL`)
- [ ] Email address for quote form delivery (`QUOTE_TO_EMAIL`), then enable Resend
- [ ] Star ratings for the three existing testimonials, plus more reviews (`content/reviews.ts`)
- [ ] Founder name and family history for the story sections (home and `/about`)
- [ ] Licensed and insured, satisfaction guarantee, and pet safe claims in the trust strip
- [ ] Privacy policy and terms reviewed
