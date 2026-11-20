@AGENTS.md

# McDonald Exterminators website: guide for Claude

This is the website for McDonald Exterminators, a family owned pest control company in Bartow, Florida (Polk County), in business since 1959. It is live at https://mcdonald-exterminators-kappa.vercel.app (the real domain switch is still to come). `README.md` has the full reference: environment variables, feature flags, image slots, design decisions, and the owner's open questions. This file is about how to work here.

## Who you are helping

Most requests come from **someone who is not a developer**: the business owner or a staff member changing prices, adding a press item, fixing a phone number. So:

- **Explain in plain words.** Say what changed on the site and where a visitor will see it, not which component you touched. Skip jargon, or explain it in one short phrase.
- **Show before you publish.** For anything visual, run the site locally and take a screenshot (phone width and desktop), or describe exactly what will change. Push only when they ask for it ("push it", "make it live", "publish").
- **Ask when the business facts are unclear.** Prices, guarantees, licenses, review counts, and claims about safety must come from the owner. Never invent them. If something is unknown, leave the existing `TODO(owner)` pattern in place and tell them.
- **Keep the scope to what was asked.** A small copy change should be a small diff.

## The rules that matter most

1. **Never bypass the tests.** No `--no-verify`, no deleting or loosening a test just to get a push through. If a test fails, either the edit is wrong or the rule the test guards has really changed. In the second case, confirm with the person first, then update the test and say so.
2. **One time prices only.** The owner's rule: no monthly fees, no "/mo", anywhere. `tests/unit/content.test.ts` enforces it.
3. **Copy style:** short and plain. No em dashes or en dashes, no hyphens in visible text (write "family owned", "same day", "one time"). Never "comprehensive", "cutting edge", "solutions", or "elevate".
4. **Reviews are real and word for word** (`content/reviews.ts`). Never write or edit a review.
5. **Secrets stay secret.** `.env.local` is gitignored; never commit it, print it, or paste a key into chat or code. The GoHighLevel key (`GHL_CONTACT_FORM_API_KEY`) is read only on the server in `lib/ghl.ts`; never give it a `NEXT_PUBLIC_` prefix or reference it from a client component.
6. **`IS_DEMO` in `content/site.ts` stays `true`** until the owner says the site is launching on the real domain. While it is true, search engines are told not to index the site.

## How a change goes live

```
edit → git commit → git push → GitHub → Vercel builds → Vercel waits for tests → live
```

- **On commit**, a git hook runs `npm run check`: type check, lint, and the unit tests. A few seconds.
- **On push**, a git hook runs `npm run verify`: all of the above, a production build, and the browser tests at desktop and phone width. About a minute. If anything fails, the push is stopped.
- **On GitHub**, the `Tests` workflow (`.github/workflows/ci.yml`) runs `npm run verify` again. This catches edits made on github.com, which skip the local hooks.
- **On Vercel**, every push to `main` builds a production deployment, but a Deployment Check named "Tests" holds the live site until the GitHub `test` job passes. If the tests fail, the old version stays live.

**Cloud sessions (claude.ai/code)** are how the editor usually works: no installs, and each session works on its own branch. The flow there is: make the change, run `npm run check`, open a pull request, wait for the GitHub `Tests` check to pass, then merge into `main`. If the session has no test browser, the pre-push hook runs the fast checks and leaves the browser tests to GitHub. Walk the editor through the pull request step if they are unsure, and never tell them to merge while `Tests` is red.

To confirm a change is live: `vercel ls mcdonald-exterminators --prod` shows the newest deployment as Ready, and `curl -s https://mcdonald-exterminators-kappa.vercel.app/<page>` contains the new text. Run `vercel whoami` first; it should print `vpsciences`.

If something broke after going live, `vercel rollback` puts the previous deployment back immediately. Then fix the cause and push again.

## Where things live

All copy and business data is in typed files under `content/`. There is no CMS. Pages for services, pests, and towns are generated from these files, so adding an entry creates its page, its links, and its sitemap entry.

| They want to... | Edit |
| --- | --- |
| Change the phone, email, address, hours, or social links | `content/site.ts` (`site`). Change `phone` and `phoneHref` together. The `telephone` value in `lib/seo.tsx` must match too; a test checks this. |
| Update the Google rating or review count | `GOOGLE_RATING` in `content/site.ts` (value, count, and countLabel). Shown in the hero, trust wall, homepage map card, and structured data. |
| Change a coupon price, its questions, or add a coupon | `content/pricing.ts`. Each coupon needs a headline amount, a description, and at least one question. `pests` and `services` decide which pest and service pages also show it. |
| Change the intro offer ("$50 off") | `OFFER` and `SHOW_OFFER` in `content/site.ts` |
| Add or edit an FAQ | `content/faq.ts` (site wide) or the `faqs` on a coupon in `content/pricing.ts` |
| Add a press feature or award | `content/press.ts`. Newest first. Put the image in `public/images/` and import it at the top of the file. |
| Edit a town page or add a town | `content/areas.ts`. `pests` must use slugs that exist in `content/pests.ts`; `coords` is latitude, longitude. |
| Edit a pest or service page | `content/pests.ts`, `content/services.ts` |
| Add or change a team member | `content/team.ts` (photos in `public/images/team/`) |
| Change the top menu | `mainNav` in `content/site.ts` |
| Google Analytics or other tracking tags | `GA_MEASUREMENT_ID` (Google Analytics 4, loaded directly) and `GTM_ID` (Tag Manager, for other tags) in `content/site.ts`. Never add an Analytics tag inside Tag Manager too, or visits count twice. |
| Redirect an old URL | `redirects()` in `next.config.ts` |
| Swap a photo | `lib/images.ts` slots, or the static `import` in the component that uses it. Use WebP or JPG, and give every image real alt text. |

Code that rarely needs touching:

- `app/`: routes. `app/page.tsx` lists the homepage sections in order.
- `components/home/`: homepage only sections. `components/site/`: shared ones (header, footer, forms, coupons, map). `components/ui/`: shadcn primitives.
- `app/api/quote/route.ts` + `lib/ghl.ts`: the quote form backend (below).
- `components/site/chat-widget.tsx`: the GoHighLevel chat bubble (below).

## Making an edit, step by step

1. Find the right file in the table above and make the change.
2. Preview it: `npm run dev` and open http://localhost:3000, or `npm run build && npm start` to see the production version. For a quick visual check, screenshot the page at phone width (390px) and desktop.
3. Run `npm run check` (fast) or `npm run verify` (everything) yourself before committing, so failures show up while you are still working.
4. Commit with a message that says what changed for a visitor, for example "Raise the quarterly coupon to $219". End commit messages with the Co-Authored-By line Claude Code gives you.
5. Push only when asked. Then confirm it is live (see above) and tell them what to look at.

## When a test fails

Read the test name and message; they are written to explain themselves. The common ones after a content edit:

| Failure | Usual cause |
| --- | --- |
| `have unique, URL safe slugs` | Two entries share a slug, or a slug has capitals or spaces. Slugs look like `cypress-gardens`. |
| `only list pests that have a pest page` / `only appear on pest and service pages that exist` | A typo in a pest or service slug in `areas.ts`, `services.ts`, or `pricing.ts` |
| `never promise a monthly fee` | A price or answer mentions a monthly charge |
| `has a 10 digit phone number...` / `uses the same phone number...` | `phone`, `phoneHref`, and the JSON-LD `telephone` no longer match |
| `exactly one <h1>` | A page gained or lost its main heading |
| `does not scroll sideways` | Something too wide on a phone: a long unbroken word or URL, an image without a max width, or a `whitespace-nowrap` on long text |
| `internal links all resolve` | A link points to a page that does not exist. The message names the link and the page it is on. |
| `chat bubble does not cover the phone action bar` | GoHighLevel renamed its widget classes, or the offset in `chat-widget.tsx` changed |

Browser test failures save a trace: `npx playwright show-trace test-results/<test>/trace.zip` shows the page step by step. `npx playwright test -g "<part of the name>"` reruns one test (run `npm run build` first; the browser tests serve the production build).

## How the pieces work

**Rendering and SEO.** Every page is rendered on the server (static where possible), so search engines get the full HTML without running JavaScript. Each page sets its title, description, canonical, and social tags through `pageMetadata()` in `lib/seo.tsx`. The homepage has `LocalBusiness` structured data and `/pricing` has offer and FAQ data. `app/robots.ts` and `app/sitemap.ts` follow `IS_DEMO`. Keep new pages on the same pattern: one `<h1>`, `pageMetadata()`, server components by default, and `"use client"` only for interactive parts.

**Quote forms → GoHighLevel.** Two forms post to `/api/quote`: the full form (`components/site/quote-form-client.tsx`, on `/contact` and town pages) and the homepage quote bar (`components/home/quote-starter.tsx`). The route validates with zod (`lib/quote-schema.ts`), then `lib/ghl.ts` upserts the contact in GHL (matched on phone), adds tags (`website lead`, the source, `coupon: …`, `outside polk county`), and adds a note with the details. If GHL fails, the visitor is told to call, so no lead is lost silently. Without the env vars (local dev, tests) leads are only logged. Keys live in Vercel (Production and Preview) and in `.env.local` locally. GHL workflows triggered by the `website lead` tag send the texts; those are configured in GHL, not here.

**Coupon buttons.** "Claim This Coupon" dispatches a `quote:service` browser event (`components/site/price-action.tsx`); the quote bar listens, shows "Coupon: X", and sends it with the lead.

**Chat widget.** `components/site/chat-widget.tsx` loads GHL's chat loader with `next/script` (`lazyOnload`, so it never slows the first paint). The bubble lives in a shadow root that page CSS cannot reach, so the component injects a small style into it on phones to lift the bubble above the Call / Text / Quote bar. Bubble colors and greeting are set in GHL.

**Next.js 16.** This is newer than most training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing framework code (see the AGENTS.md note above). Run `npx next typegen` if TypeScript cannot find `PageProps` or image modules on a fresh checkout; `npm run typecheck` already does this.

## Accounts and access

- **GitHub:** `CupOfJoe-Projects/pest-control`, branch `main` (use the `gh` CLI).
- **Vercel:** project `mcdonald-exterminators` in the Validated Peptides team. Log in as `vpsciences` (`vercel whoami`). Environment variables are managed there (`vercel env ls`).
- **GoHighLevel:** the contact form uses a Private Integration token with the `contacts.write` scope. The chat widget ID is in `chat-widget.tsx`.

## Open items

The owner's open questions are tracked under "Confirm with owner" in `README.md` and as `TODO(owner)` comments in the code. Planned next: SEO blog posts under the press page (`/press/<slug>`), the switch to the real domain (then `IS_DEMO = false`), and real photos in place of the AI demo images.
