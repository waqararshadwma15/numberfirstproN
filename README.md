# Numbers First

Source code for [numberfirst.pro](https://numberfirst.pro), the bilingual (English and Arabic) website of Numbers First, which provides bookkeeping and financial advisory for small and medium businesses in Saudi Arabia.

The site presents two services, each with its own page, and collects leads through two forms:

- **01 Accounting & Bookkeeping:** a five-step journey, a package selector based on balance-sheet value, and an FAQ.
- **02 Financial Planning & Advisory:** a five-step journey, a business-plan request form, and an FAQ.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) with TypeScript
- React 19 with the React Compiler
- Tailwind CSS v4
- GSAP and ScrollTrigger for animation
- Nodemailer for sending form requests by email
- Lucide for icons

## Getting started

You need Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. You are redirected to `/en` or `/ar`.

The site runs without any environment variables. Until email is configured, the forms ask visitors to send their request on WhatsApp or by email.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm start` | Serves the production build |
| `npm run lint` | Runs ESLint |

The project has no automated test suite. Use `npx tsc --noEmit` to check types.

## Environment variables

Set these in `.env.local` for local work, or in your hosting provider's settings for production. Never commit them: `.gitignore` already excludes `.env*`.

| Variable | Required | Purpose | Default |
| --- | --- | --- | --- |
| `SMTP_PASSWORD` | To send email | Password for the mailbox that sends form requests | None |
| `SMTP_USER` | No | Mailbox login, also used as the sender address | `info@numberfirst.pro` |
| `SMTP_HOST` | No | Mail server | `smtp.hostinger.com` |
| `SMTP_PORT` | No | Mail server port (465 uses TLS) | `465` |
| `LEADS_TO` | No | Inbox that receives form requests | `info@numberfirst.pro` |
| `GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification tag | None |
| `BING_SITE_VERIFICATION` | No | Bing Webmaster Tools verification tag | None |

## Pages

Every page exists in both languages, for example `/en/accounting` and `/ar/accounting`.

| Path | Page |
| --- | --- |
| `/[lang]` | Home: the two services, client logos, sample report, FAQ |
| `/[lang]/accounting` | Accounting journey, packages, FAQ |
| `/[lang]/advisory` | Advisory journey, business-plan form, FAQ |
| `/[lang]/enquire` | Free-assessment form |
| `/[lang]/privacy` | Privacy policy |

Unknown URLs under a language show the translated 404 page, through a catch-all route in `app/[lang]/[...rest]`.

`proxy.ts` redirects URLs without a language to `/en` or `/ar`. It uses the visitor's saved choice (the `nf-lang` cookie) first, then their browser language, and falls back to English.

## Project structure

```text
app/            Routes, layout, global styles, sitemap, robots and manifest
components/     UI, grouped by area (home, accounting, advisory, enquire, sections, layout)
content/        All site copy: en.ts and ar.ts
lib/            Site details, translations, SEO data and the email server action
public/         Images and llms.txt
proxy.ts        Language redirects
next.config.ts  Security headers, www redirect and upload size limit
```

## Common changes

| To change | Edit |
| --- | --- |
| Any text on the site | `content/en.ts` and `content/ar.ts` |
| Package prices and features | `plans` in both content files |
| Phone, email, WhatsApp, social profiles | `lib/site.ts` |
| Client logos and sample reports | `lib/site.ts`, with the image files in `public/assets` |
| Brand colours and fonts | `app/globals.css` (gold is accounting, teal is advisory) |
| Search and AI summary | `public/llms.txt` |

`content/ar.ts` is typed against `content/en.ts`, so a missing Arabic key fails the build.

When page content changes meaningfully, update these dates together:

- `LAST_UPDATED` in `app/sitemap.ts`
- `DATE_MODIFIED` in `lib/seo.ts`
- The "Last updated" line in `public/llms.txt`

## How the request forms work

Both forms call the `sendRequest` server action in `lib/sendRequest.ts`, which emails the request to the business inbox over SMTP.

If email isn't configured, the send fails or the visitor reaches the rate limit, nothing is lost. The visitor sees their prepared request with buttons to send it on WhatsApp, send it by email, or copy it.

- **Validation:** name and a valid phone number are required on both forms. The business-plan form also requires a brief.
- **Attachments:** PDF, Word, Excel and PowerPoint files are accepted up to 10 MB. Files up to 4 MB are attached to the email, because Vercel limits request size. The visitor is asked to send larger files themselves.
- **Spam protection:** a hidden honeypot field catches simple bots, and only the forms' own subject lines are accepted. Each visitor can send 5 requests per 10 minutes.

The rate limit is held in the memory of each server instance, so it slows abuse rather than stopping it completely.

Links can pre-fill the assessment form:

| Parameter | Effect |
| --- | --- |
| `?path=accounting` or `?path=advisory` | Adds the service to the email |
| `?plan=starter`, `standard`, `growth` or `premium` | Selects the matching balance-sheet range |

## Animation

`components/motion/MotionRoot.tsx` animates any element with one of these attributes, so most sections can stay Server Components:

| Attribute | Effect |
| --- | --- |
| `data-reveal` | Fades up when scrolled into view |
| `data-reveal="scale"` | Fades and scales in |
| `data-count="3500"` | Counts up from 0 |
| `data-parallax="0.15"` | Drifts against the scroll |

All motion respects `prefers-reduced-motion`, and content still appears if the script never starts.

## Deployment

The site is hosted on [Vercel](https://vercel.com). Set the environment variables above in the project settings, then send one real test request after deploying to confirm email works.

The Content Security Policy in `next.config.ts` only allows scripts, styles and connections from this site. If you add analytics, a CAPTCHA or another third-party service, add its domain to the policy or the browser will block it.

## Working with this version of Next.js

This project uses features of Next.js 16 that may differ from older tutorials, including `proxy.ts` in place of middleware, Cache Components and root params. The docs for the installed version are in `node_modules/next/dist/docs/`, and `AGENTS.md` asks AI coding tools to read them first.
