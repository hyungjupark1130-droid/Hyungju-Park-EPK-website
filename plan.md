# Hyungju Park — Artist Site

Personal site for **Hyungju Park**, musician / producer / engineer (Guildhall School of Music). Acts as portfolio and EPK. Built as a school deliverable, designed to keep working long after.

---

## 1. Design Direction

### Reference
[chrisstapleton.com](https://chrisstapleton.com) — referenced for *feel*, not for layout. Borrowing:
- Music-forward hero treatment (big image, name, no clutter)
- Generous whitespace, serif typography, editorial weight
- Music page as the centerpiece

Removing from the reference:
- Commerce, tour module, news carousel, fan club
- Heavy navigation
- Brand-y "official artist" tone

### Aesthetic
**Monochrome.** Black, white, and grays. No accent color. All visual weight comes from typography, photography, and whitespace.

| | |
|---|---|
| **Palette** | `#0A0A0A` (near-black) · `#FAFAFA` (off-white) · `#6B6B6B` (mid-gray) · `#E5E5E5` (rule lines) |
| **Display type** | A modern serif — *Fraunces*, *Spectral*, or *EB Garamond* (Google Fonts, free) |
| **Body type** | A neutral sans — *Inter* or *Söhne-style* substitute |
| **Hero treatment** | No portrait at launch. Hero is typographic — large serif name, one-line positioning, generous whitespace. Designed so a portrait can drop in later without redesigning the page. |
| **Motion** | Minimal. Fade-in on scroll, smooth scrolling, audio player transitions. No animation for its own sake. |
| **Density** | Low. Lots of air. The work should feel curated, not crammed. |

### Tone
Quiet confidence. Emerging artist, not posing as established. Copy is plain, specific, no hype language.

---

## 2. Site Structure

Four pages:

```
/                  Home
/music             Music (portfolio + EPK works)
/about             About
/contact           Contact
/admin             CMS (hidden, password-gated)
```

### `/` Home
- Typographic hero: large serif name, one-line positioning, monochrome, lots of air. No portrait at launch.
- 2–3 featured works (pulled from CMS where `featured = true`)
- Short bio teaser → "About" link
- Footer with email + socials
- Designed so a portrait image can be added later as either a full-bleed background or an inline block, without rebuilding the section

### `/music`
- Grid of all works, newest first
- Filter chips along the top, generated from existing tags (e.g. *all · jazz · electronic · film · classical · engineering*)
- Each work card: cover image, title, year, type
- Click → detail view (modal or page) with audio player, description, credits, external links

### `/about`
- Portrait (optional — section gracefully hides if no image uploaded; can be added via CMS later)
- Long bio
- "Currently" callout (short, editable, e.g. *Studying at Guildhall, working on…*)
- Credits & Recording — list of engineering work
- CV / Education — list

All fields editable via CMS.

### `/contact`
- Email (clickable `mailto:`)
- Social links (Instagram, SoundCloud, etc.)
- Optional simple inquiry form (Netlify Forms — free, no backend needed)

---

## 3. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| **Framework** | [Astro](https://astro.build) | Static-first, content-collection-native, fast, free to host. Right size for 4 pages + CMS. |
| **CMS** | [Decap CMS](https://decapcms.org) | Free, open source, no separate dashboard. Writes markdown directly to the GitHub repo. Lives at `/admin`, authenticates via GitHub. |
| **Hosting** | Netlify (free tier) | Auto-deploys from GitHub on push or CMS save. Built-in form handling for the contact form. Integrates cleanly with Decap. |
| **Audio hosting** | Self-hosted (files in repo, served via Netlify) | MP3/AAC streamed directly from the site. Streaming only — no downloads. |
| **Auth for CMS** | GitHub OAuth (via Netlify Identity or Decap's built-in flow) | One account, no separate user management. |
| **Domain** | Deferred — Netlify subdomain at launch | Custom domain can be added later with no code changes. |
| **Analytics** | None at launch (optional later: Plausible or Cloudflare) | Keeps the site clean and avoids cookie banners. |

### Why not Sanity / WordPress / Squarespace
- **Sanity** — more powerful but adds a second dashboard, a free-tier limit, and complexity not justified at this scope.
- **WordPress** — heavier, slower, more maintenance, less design control.
- **Squarespace** — fast to launch but recurring cost and ceiling on customization. Worse for a portfolio that's *also* a CV-style deliverable.

---

## 4. Data Model

### `Work` (collection — many entries)

| Field | Type | Notes |
|---|---|---|
| `title` | string, required | |
| `year` | number, required | |
| `type` | select | Original · Production · Arrangement · Engineering · Score |
| `role` | string | e.g. "Producer, Mix Engineer" |
| `description` | markdown | Long-form, supports formatting |
| `cover` | image upload | Required |
| `audio` | file upload | MP3, optional |
| `video_url` | string | YouTube/Vimeo, optional |
| `external_links` | repeatable {label, url} | Spotify, Bandcamp, SoundCloud |
| `credits` | text | Collaborators, performers |
| `featured` | boolean | Shows on homepage |
| `tags` | free-form list | Comma-separated, autocomplete from existing |
| `date` | date | For sorting |

### `About` (singleton — one document)

| Field | Type | Notes |
|---|---|---|
| `short_bio` | markdown | For homepage teaser |
| `long_bio` | markdown | About page main text |
| `portrait` | image upload | |
| `currently` | string | Short editable status line |
| `credits_recording` | repeatable {project, role, year} | Engineering work list |
| `cv` | repeatable {institution, program, years} | Education / CV |

### `Site Settings` (singleton)

| Field | Type | Notes |
|---|---|---|
| `contact_email` | string | |
| `socials` | repeatable {platform, url} | Instagram, SoundCloud, etc. |
| `meta_description` | string | SEO |
| `og_image` | image upload | Social share preview |

---

## 5. Functionality

### Public-facing
- Static HTML/CSS, zero JS where possible. JS only for: audio player, music page filter, mobile menu, form submit.
- Custom audio player (HTML5 `<audio>` styled to match the site — no SoundCloud iframe on the work detail pages).
- Image lazy-loading.
- Responsive: phone → tablet → desktop. Phone is the priority — most press/curators check sites on phones.
- Accessible: semantic HTML, keyboard navigation, alt text on all images, sufficient contrast.
- SEO: per-page meta tags, Open Graph for social sharing, sitemap.xml, robots.txt.

### CMS (admin)
- `/admin` — Decap CMS interface
- Add/edit/delete works
- Edit About page in place
- Edit site settings (contact email, socials)
- Free-form tags with autocomplete (avoids duplicate tags from casing/spelling)
- Image uploads handled by Decap → stored in repo
- Saving triggers a Netlify rebuild → live in ~1 minute

### Out of scope (for v1)
- Newsletter / mailing list
- Comments
- Multilingual (English only at launch — Korean version can come later if needed)
- WAV streaming or downloads (decided: streaming only, MP3/AAC)
- E-commerce
- Live show calendar (can add as a section in About later)

---

## 6. Build Plan (≈1 week)

| Day | Work |
|---|---|
| 1 | Scaffold Astro project. Set up Git repo. Configure Decap CMS schemas (Work, About, Site Settings). |
| 2 | Build page templates: Home, Music, About, Contact. Wire to content collections. |
| 3 | Audio player component. Music page filter logic. Work detail view. |
| 4 | Style pass — typography, layout, monochrome palette, portrait treatment. |
| 5 | Mobile responsiveness. Accessibility audit. SEO meta tags. |
| 6 | Deploy to Netlify. Connect domain. Set up CMS auth. Add first work + about content via admin. |
| 7 | Polish. Contact form. Favicon. Open Graph image. Bug-bash on real devices. |

Buffer beyond day 7 for anything that slips.

---

## 7. Open Items / Need from Hyungju

**Required for v1 launch:**
- [ ] **GitHub account** — required for CMS; create with the email you'll use long-term
- [ ] **At least one finished work** for launch (track + cover image + description)
- [ ] **Contact email** to list publicly
- [ ] **Social links** — Instagram, SoundCloud, etc. (whichever exist)
- [ ] **"Currently" line** — what to display on About when site launches

**Deferred (can add anytime after launch via CMS):**
- Portrait photo
- Custom domain name
- Additional works
- Engineering credits as they accumulate

---

## 8. Decisions Locked

- Monochrome (no accent color)
- Astro + Decap CMS + Netlify
- Self-hosted audio, streaming only (MP3/AAC)
- Editable About page via CMS
- Free-form tags with autocomplete
- 4 pages: Home, Music, About, Contact
- English only at v1
- No e-commerce, no newsletter, no tour module at v1
- No portrait at launch — hero is typographic, portrait can be added later via CMS
- No custom domain at launch — Netlify subdomain for now