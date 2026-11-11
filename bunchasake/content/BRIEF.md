# Bunchasake content brief (read fully before writing)

You are writing pages for **bunchasake.com**. A build script turns your files into static HTML, so the
file format below must be followed exactly. Write only the files you were assigned, in
`/home/user/mora/bunchasake/content/`. Do not touch any other file. Do not run git.

## 1. Who Bunchasake is (the only facts you may state about the company)

- **Bunchasake** is a brand builder and growth partner. Voice is always "we" / "chúng tôi" (never "I", never a named person).
- A Vietnamese studio working between **Vietnam and Italy**, online with clients anywhere. Working languages: **Vietnamese and English**.
- Promise: "You run the business. We grow the brand." / "Bạn lo vận hành. Chúng tôi tăng trưởng thương hiệu."
- Belief: people do not buy a product, they buy the story behind it. "You have the story. We turn it into a brand."
- Who we work with: (1) Vietnamese business owners abroad (nail salons, restaurants, other owner-run businesses), (2) Vietnamese brands that want to go international.
- **Process, six steps, the client approves after each step:**
  1. Listening / Lắng nghe: a 60-minute conversation to hear the founder's story: why they started, what they believe in, which customers the brand wants to reach and what those customers believe in, and what the founder really wants from the business.
  2. Positioning / Định vị: who the brand is, who it is for, how it differs; in-depth competitor analysis to see where the client stands and which direction the brand should take next, always based on the founder's wishes; the brand story every channel will tell.
  3. Identity / Nhận diện: we work directly with the founder and the person in charge of the brand to shape the brand they want (logo, colours, type, voice), agree on each part together, and pack it into guidelines for the long term.
  4. Touchpoints / Điểm chạm: once customers start to recognise the brand, we take it where customers already go: website, social media (Facebook, Instagram, TikTok, YouTube, Threads, LinkedIn, Zalo, Pinterest) and the media channels they follow. If the client already has channels, we read the channel data, customer behaviour and past campaign results, then advise on a strategy for new campaigns.
  5. Community / Cộng đồng: a brand that grows without a community is not yet successful; repeat purchases from a good community save sales and marketing spend. We help the client build their community on the platforms their customers prefer, for a loyal customer base.
  6. Crisis communication / Xử lý khủng hoảng: every brand meets a communication crisis at some point. Our team studies and handles communication crises, keeps the impact and risk to the brand as small as possible, and trains the client's team to respond as communication professionals would.
- **Packages:** Start (new business: lean positioning, logo/colours/type, business card, avatar, post templates), Build (all six steps, brand story and voice, brand guidelines, website and key touchpoints), Refresh (audit the current brand, reposition, refresh identity, update touchpoints in use). The quote comes after the first conversation.
- **Add-on: Social Media Automation, built for you.** We set up the system; the client's own team runs Facebook, TikTok and Instagram with it. Five parts: (1) your own AI assistant trained on the brand voice, (2) a 30-day content calendar, (3) AI drafts, you approve, (4) posts scheduled automatically, (5) automatic inbox replies to common questions.
- How a project starts: the client emails **hello@bunchasake.com**, we read their story and prepare questions, a 60-minute conversation online or in person, then a proposal and quote.
- AI does the fast work, people make the decisions.
- **Real work (11 brands, Vietnam and Italy).** You may name these as brands we have worked with, with their sector only:
  Chop Chop (restaurant), Borgo Villa Nemec (villa, Italy), Impact Investments (investment, Italy), Viet My Clean Home (home services, Hanoi),
  Bác Sĩ Ánh (healthcare, personal brand), Canasto de Flores (flowers, landscaping), Lạc Hồng (construction machinery), Talk2TheTop (podcast),
  NA-VI Living (hospitality), Vestra Place (coworking), Vina KTV (audio equipment).

## 1b. Audience framing for blog articles

Blog articles speak generally to owners ("your salon", "your restaurant", "your brand"). Readers are mostly Vietnamese owners, but titles, H1, descriptions and keywords do not say "Vietnamese", and the body mentions it at most three times where it genuinely helps. See `REVISE-GENERAL.md`. Landing pages keep their current positioning.

## 2. Hard rules (a page that breaks these will be rejected)

- **Never invent facts about Bunchasake:** no client results, numbers, percentages, testimonials, prices, timelines, team size, years of experience, awards, offices, or clients in a specific country/industry beyond the list above. We have **no nail salon client** to cite. Do not write "we helped X salons".
- **Services we do NOT sell, so never promise them:** running ads, SEO/Google Business Profile management as a service, posting or community management done daily on the client's behalf, influencer/KOL booking, photo or video shoots. Articles may *teach* the reader how to do these things themselves; landing pages must only offer what section 1 lists.
- **No fabricated statistics or sources.** No "studies show", no "X% of customers". If you need to support a point, use reasoning or a concrete everyday example. Do not cite statistics from, or type URLs of, external websites (see "External links" in section 3 for the only outbound links allowed).
- Advice must be practical, specific and safe: correct for a small-business owner in the US, Canada, Australia or Europe. When platform features may vary or change, say so in plain words rather than guessing details.
- No keyword stuffing. Use the primary keyword in the title, H1, first paragraph and one H2, then write naturally with related phrases.
- Plain, warm, direct language. Short paragraphs. No hype words ("revolutionary", "game-changing", "unlock", "skyrocket"). No emoji. No em dashes; use commas, periods or colons.
- **Vietnamese versions are written natively, not translated line by line.** Natural Vietnamese a salon or restaurant owner abroad would speak, "bạn" for the reader, "chúng tôi" for Bunchasake. Common industry English terms may stay in English (nail, booking, Instagram, Reels, Google Business Profile, content). The VI and EN versions must cover the same sections and facts.
- Every file must be valid for its format (JSON must parse; frontmatter must follow the pattern).

## 3. Internal links

Never write URLs for our own pages. Use these placeholders; the build script resolves them per language:

- `{{home}}` home page, `{{blogindex}}` blog index, `{{work}}` the work section on the home page
- `{{mail}}` the address `mailto:hello@bunchasake.com`
- `{{landing:KEY}}` and `{{blog:KEY}}` with a KEY from the tables below

Example: `<a href="{{landing:nail-salon-brand-marketing}}">brand and marketing for nail salons</a>`.
Use descriptive anchor text (never "click here").

### Landing pages (KEY = English slug)

| KEY | Audience / primary keyword | Vietnamese slug |
|---|---|---|
| `vietnamese-diaspora-brand-marketing` | Vietnamese marketing agency for overseas businesses (pillar page for Vietnamese business owners abroad) | `marketing-doanh-nghiep-viet-o-nuoc-ngoai` |
| `nail-salon-brand-marketing` | Vietnamese marketing agency for nail salons | `marketing-tiem-nail` |
| `restaurant-brand-marketing` | Vietnamese marketing agency for restaurants | `marketing-nha-hang` |
| `international-brand-marketing-vietnam` | Vietnamese brand agency for international markets (Vietnamese brands going global) | `marketing-thuong-hieu-viet-ra-quoc-te` |
| `social-media-automation` | social media automation for small business | `tu-dong-hoa-social-media` |
| `social-media-automation-for-nail-salons` | social media automation for nail salons | `tu-dong-hoa-social-media-tiem-nail` |
| `social-media-automation-for-restaurants` | social media automation for restaurants | `tu-dong-hoa-social-media-nha-hang` |

### Blog articles (KEY = English slug)

| KEY | Primary keyword | Links to landing | Vietnamese slug |
|---|---|---|---|
| `nail-salon-social-media-content-ideas` | nail salon social media content ideas (all platforms, content pillars, weekly rhythm) | nail-salon-brand-marketing | `y-tuong-content-tiem-nail` |
| `nail-salon-instagram-content-ideas` | nail salon Instagram content ideas (Reels, carousels, Stories, highlights, bio) | nail-salon-brand-marketing | `y-tuong-content-instagram-tiem-nail` |
| `how-to-get-more-nail-clients` | how to get more nail clients / more bookings | nail-salon-brand-marketing | `cach-co-nhieu-khach-tiem-nail` |
| `google-business-profile-for-nail-salons` | Google Business Profile for nail salon | nail-salon-brand-marketing | `toi-uu-google-business-profile-tiem-nail` |
| `restaurant-instagram-content-ideas` | restaurant Instagram content ideas | restaurant-brand-marketing | `y-tuong-content-instagram-nha-hang` |
| `how-to-market-a-vietnamese-restaurant` | how to market a Vietnamese restaurant | restaurant-brand-marketing | `cach-marketing-nha-hang-viet-o-nuoc-ngoai` |
| `bilingual-marketing-for-vietnamese-businesses-abroad` | bilingual Vietnamese English marketing | vietnamese-diaspora-brand-marketing | `marketing-song-ngu-cho-doanh-nghiep-viet-o-nuoc-ngoai` |
| `how-vietnamese-business-owners-abroad-can-build-a-brand` | how to market / brand a Vietnamese business abroad | vietnamese-diaspora-brand-marketing | `xay-thuong-hieu-cho-chu-doanh-nghiep-viet-o-nuoc-ngoai` |
| `how-vietnamese-brands-can-enter-european-markets` | how Vietnamese brands can enter European markets | international-brand-marketing-vietnam | `thuong-hieu-viet-vao-thi-truong-chau-au` |
| `ai-content-calendar-for-small-business` | AI content calendar for small business | social-media-automation | `lich-noi-dung-ai-cho-doanh-nghiep-nho` |

### Blog articles, batch 2 (KEY = English slug)

| KEY | Primary keyword and scope | `landing:` value | Vietnamese slug |
|---|---|---|---|
| `how-to-reach-vietnamese-customers-overseas` | how to reach Vietnamese customers overseas / Vietnamese diaspora marketing strategy | vietnamese-diaspora-brand-marketing | `cach-tiep-can-khach-viet-o-nuoc-ngoai` |
| `working-with-a-vietnam-based-marketing-team` | how to work with a Vietnam-based marketing team while running a business abroad (time zones, briefs, approvals) | vietnamese-diaspora-brand-marketing | `lam-viec-voi-doi-marketing-o-viet-nam` |
| `marketing-for-vietnamese-business-owners-in-the-usa` | marketing for Vietnamese business owners in the USA (how to market a salon or shop without hiring a local agency) | vietnamese-diaspora-brand-marketing | `marketing-cho-chu-doanh-nghiep-viet-o-my` |
| `marketing-checklist-for-vietnamese-businesses-in-australia` | marketing checklist for Vietnamese-owned businesses in Australia | vietnamese-diaspora-brand-marketing | `checklist-marketing-doanh-nghiep-viet-o-uc` |
| `marketing-for-vietnamese-businesses-in-europe` | marketing for Vietnamese business owners in Europe incl. Italy (restaurants, shops: Instagram and Google Maps visibility, local language) | vietnamese-diaspora-brand-marketing | `marketing-doanh-nghiep-viet-o-chau-au` |
| `nail-salon-tiktok-content-ideas` | nail salon TikTok content ideas (and turning views into bookings) | nail-salon-brand-marketing | `y-tuong-video-tiktok-tiem-nail` |
| `nail-salon-content-calendar` | nail salon content calendar (a monthly plan the reader can copy) | social-media-automation-for-nail-salons | `lich-dang-bai-tiem-nail` |
| `before-and-after-nail-content` | before and after nail content that turns viewers into bookings | nail-salon-brand-marketing | `content-truoc-va-sau-tiem-nail` |
| `nail-salon-review-response-examples` | nail salon review response examples (templates for every kind of review) | nail-salon-brand-marketing | `mau-tra-loi-review-tiem-nail` |
| `nail-salon-advertising-ideas` | nail salon advertising ideas (do-it-yourself: local, low-cost, when paid ads make sense) | nail-salon-brand-marketing | `y-tuong-quang-cao-tiem-nail` |
| `nail-salon-marketing-budget` | nail salon marketing budget (how to plan it: what to spend on first, no invented benchmarks) | nail-salon-brand-marketing | `ngan-sach-marketing-tiem-nail` |
| `nail-salon-logo-and-branding` | nail salon logo and branding (name, logo, colours, menu, signage) | nail-salon-brand-marketing | `logo-va-thuong-hieu-tiem-nail` |
| `how-to-photograph-nails` | how to take nail photos with a phone (chụp ảnh nail đẹp) | nail-salon-brand-marketing | `cach-chup-anh-nail-dep` |
| `restaurant-tiktok-content-ideas` | restaurant TikTok content ideas (for Vietnamese and Asian restaurants) | restaurant-brand-marketing | `y-tuong-content-tiktok-nha-hang` |
| `restaurant-content-calendar` | restaurant content calendar (a monthly plan the reader can copy) | social-media-automation-for-restaurants | `lich-noi-dung-nha-hang` |
| `restaurant-menu-photography-tips` | restaurant menu photography tips and short videos with a phone (chụp ảnh món ăn) | restaurant-brand-marketing | `cach-chup-anh-mon-an` |
| `google-business-profile-for-restaurants` | restaurant Google Business Profile optimization / Google Maps for Vietnamese restaurants | restaurant-brand-marketing | `toi-uu-google-maps-nha-hang` |
| `restaurant-local-seo-checklist` | restaurant local SEO checklist (do-it-yourself) | restaurant-brand-marketing | `checklist-local-seo-nha-hang` |
| `local-ads-for-vietnamese-restaurants` | how to run local ads for a Vietnamese restaurant (do-it-yourself basics, when it is worth it) | restaurant-brand-marketing | `quang-cao-nha-hang-viet-o-nuoc-ngoai` |
| `restaurant-branding-guide` | restaurant branding: name, story, menu, signage (xây thương hiệu nhà hàng) | restaurant-brand-marketing | `xay-thuong-hieu-nha-hang` |
| `how-vietnamese-brands-can-enter-the-us-market` | how Vietnamese brands can enter the US market (brand and content side only) | international-brand-marketing-vietnam | `thuong-hieu-viet-vao-thi-truong-my` |
| `cross-border-marketing-localization-checklist` | cross-border marketing: what Vietnamese companies must localize before going global | international-brand-marketing-vietnam | `checklist-ban-dia-hoa-khi-ra-quoc-te` |
| `english-content-strategy-for-vietnamese-brands` | English content strategy for Vietnamese SaaS and e-commerce brands | international-brand-marketing-vietnam | `chien-luoc-content-tieng-anh-cho-thuong-hieu-viet` |
| `how-to-choose-a-vietnam-agency-for-international-marketing` | how to choose a Vietnam-based agency for international marketing (honest criteria, questions to ask) | international-brand-marketing-vietnam | `cach-chon-agency-viet-nam-lam-marketing-quoc-te` |
| `b2b-content-marketing-for-vietnamese-companies` | B2B content marketing and lead generation for Vietnamese companies targeting Europe and North America (do-it-yourself) | international-brand-marketing-vietnam | `content-b2b-cho-doanh-nghiep-viet` |
| `social-media-automation-for-brands-expanding-overseas` | social media automation for Vietnamese brands expanding overseas | social-media-automation | `tu-dong-hoa-social-media-khi-ra-nuoc-ngoai` |
| `social-media-inbox-automation` | social media inbox automation for small business (what to automate, what never to) | social-media-automation | `tu-dong-tra-loi-inbox` |
| `multichannel-social-media-posting` | Facebook Instagram TikTok automation: multichannel posting from one plan | social-media-automation | `dang-bai-da-kenh-facebook-instagram-tiktok` |
| `ai-marketing-assistant-for-small-business` | AI marketing assistant for small business (what it can and cannot do, how to brief it) | social-media-automation | `tro-ly-ai-marketing-cho-doanh-nghiep-nho` |

Batch 2 rules: every article must be clearly different from the batch 1 articles and from its neighbours (link to them instead of repeating them). Articles about ads, SEO, Google Business Profile, photography or budgets are **do-it-yourself guides**: say once, plainly, that Bunchasake does not sell that service, and never invent prices, benchmarks or percentages (teach the method for deciding instead). Legal, tax, customs and certification questions are outside every guide; tell the reader to ask a qualified adviser.

### Blog articles, batch 3 (new industries)

Each batch 3 article has an extra frontmatter line `category: <value>` placed right after `landing:`. All batch 3 articles use `landing: vietnamese-diaspora-brand-marketing` (the general brand-building service page). Write for owners in general, following section 1b (no "Vietnamese" in title, h1, description, keyword; at most 3 light mentions in the body).

| category | KEY | Primary keyword and scope | Vietnamese slug |
|---|---|---|---|
| fashion | `fashion-brand-identity` | how to build a fashion brand identity (name, logo, colours, type, look of the photos, labels and tags) | `nhan-dien-thuong-hieu-thoi-trang` |
| fashion | `clothing-brand-instagram-content-ideas` | clothing brand Instagram content ideas (drops, styling, behind the scenes, fit and fabric) | `y-tuong-content-instagram-thuong-hieu-thoi-trang` |
| fashion | `how-to-launch-a-clothing-brand` | how to launch a clothing brand, brand side only (positioning, story, first collection message, launch content); production, legal and tax go to advisers | `cach-ra-mat-thuong-hieu-quan-ao` |
| fashion | `fashion-brand-storytelling` | fashion brand storytelling (why people buy the story behind a garment, how to tell it on labels, site and social) | `ke-chuyen-thuong-hieu-thoi-trang` |
| retail | `retail-store-branding` | retail store branding (signage, window, interior, staff, bags and receipts) | `xay-thuong-hieu-cua-hang-ban-le` |
| retail | `ecommerce-brand-building` | how to build an e-commerce brand, not just an online store (positioning, product pages, unboxing, reviews, email) | `xay-thuong-hieu-thuong-mai-dien-tu` |
| retail | `packaging-design-for-small-brands` | packaging design tips for small brands (what the pack must say, materials, unboxing, consistency); legal labelling goes to advisers | `thiet-ke-bao-bi-cho-thuong-hieu-nho` |
| retail | `retail-social-media-content-ideas` | social media content ideas for retail stores and small shops | `y-tuong-content-cho-cua-hang-ban-le` |
| beauty | `spa-branding-guide` | spa branding (name, mood, treatment menu, rooms, voice, booking experience) | `xay-thuong-hieu-spa` |
| beauty | `hair-salon-social-media-content-ideas` | hair salon social media content ideas (transformations, education, stylists, booking) | `y-tuong-content-salon-toc` |
| beauty | `how-to-market-a-skincare-brand` | how to market a skincare brand (positioning, ingredients story, honest claims, content, community); product claims and regulations go to advisers | `cach-marketing-thuong-hieu-my-pham` |
| beauty | `beauty-salon-marketing-ideas` | beauty salon marketing ideas (lash, brow, waxing, makeup studios): local, low-cost, do-it-yourself | `y-tuong-marketing-tiem-lam-dep` |
| startups | `startup-branding-guide` | startup branding: what to do before your first launch (name check, positioning, minimum brand kit, landing page, voice) | `xay-thuong-hieu-cho-startup` |
| startups | `how-to-position-a-saas-product` | how to position a SaaS or software product (category, who it is for, alternatives, the one-line pitch, homepage message) | `dinh-vi-san-pham-saas` |
| startups | `startup-website-checklist` | startup website checklist (pages, message, proof, pricing page basics, speed, accessibility) | `checklist-website-startup` |
| startups | `founder-led-content-on-linkedin` | founder-led content on LinkedIn (post types, voice, rhythm, turning posts into conversations) | `content-nha-sang-lap-tren-linkedin` |

Extra outbound link keys for batch 3 (use like the others, `{{ext:KEY}}`): `fda-cosmetics` (U.S. FDA cosmetics guidance), `eu-cosmetics` (European Commission cosmetics rules), `linkedin-help` (LinkedIn Help), `wcag` (W3C Web Content Accessibility Guidelines), `pagespeed` (Google PageSpeed Insights), `etsy-sellers` (Etsy Seller Handbook), Only the keys listed in this file are valid.

Each page should link to its related landing page and to 2 or 3 genuinely related articles or pages from these tables.

### External links (blog articles only)

Each blog article should include **2 to 4 outbound links to official resources**, placed where the reader would actually want the source (for example, when you tell them to claim their Google Business Profile, link the words "Google Business Profile" to it). Never type an external URL. Use only these placeholders, written as `<a href="{{ext:KEY}}">descriptive anchor text</a>`; the build adds the real URL and opens it in a new tab:

| KEY | What it is |
|---|---|
| `gbp` | Google Business Profile (where owners claim and manage their listing) |
| `gbp-help` | Google Business Profile Help Center |
| `ig-business` | Instagram for Business |
| `ig-help` | Instagram Help Center |
| `meta-business` | Meta for Business (Facebook and Instagram business tools) |
| `tiktok-business` | TikTok for Business |
| `yelp-business` | Yelp for Business |
| `tripadvisor-owners` | Tripadvisor for owners |
| `whatsapp-business` | WhatsApp Business |
| `google-seo-guide` | Google Search Central: SEO Starter Guide |
| `google-helpful-content` | Google Search Central: creating helpful, reliable, people-first content |
| `eu-access2markets` | European Commission Access2Markets portal (rules and requirements for products entering the EU) |
| `eu-youreurope` | Your Europe Business portal (official EU guide to doing business in Europe) |
| `euipo` | EU Intellectual Property Office (EU trade marks) |
| `wipo-madrid` | WIPO Madrid System (international trade mark registration) |
| `vietrade` | Vietnam Trade Promotion Agency (VIETRADE) |
| `sba` | U.S. Small Business Administration |
| `ftc-business` | U.S. Federal Trade Commission business guidance (advertising and reviews rules) |

Do not attribute specific facts, numbers or quotes to these sources; link them as "the official place to do or read about this". Only use a link where it is genuinely relevant to the article.

## 4. Format A: landing page

Two files per page: `content/landing/KEY.en.json` and `content/landing/KEY.vi.json`. Strict JSON, UTF-8, this shape:

```json
{
  "slug": "nail-salon-brand-marketing",
  "title": "Max 60 characters, primary keyword near the front, ends with | Bunchasake",
  "description": "Max 155 characters. What we do, for whom, in plain words.",
  "kicker": "Short label above the headline, e.g. For Vietnamese-owned nail salons",
  "h1": "Headline with the keyword idea. One part may be wrapped in <em>…</em> for the italic accent.",
  "lead": "One or two sentences under the headline.",
  "problems": { "title": "H2", "items": [ { "q": "A short line the owner would say out loud", "p": "One or two sentences that show we understand." } ] },
  "services": { "title": "H2", "intro": "One sentence.", "items": [ { "t": "Service name", "p": "One or two sentences. Only things from section 1." } ] },
  "sections": [ { "h2": "H2 with a related keyword phrase", "html": "<p>…</p><ul><li>…</li></ul>" } ],
  "process": { "title": "H2", "items": [ { "t": "Listening", "p": "What this step means for this audience." } ] },
  "work": { "title": "H2", "intro": "One honest sentence.", "items": ["chop-chop", "navi-living"] },
  "faq": [ { "q": "Question a real owner would ask", "a": "Direct answer, 1 to 3 sentences. May contain <a href=\"{{…}}\">links</a>." } ],
  "cta": { "h2": "Closing headline", "p": "One sentence.", "subject": "Email subject line" },
  "related": ["blog-key-1", "blog-key-2", "blog-key-3"]
}
```

- In the `.vi.json` file, `slug` is the Vietnamese slug from the table. All other keys stay in English, values in Vietnamese.
- `problems.items`: exactly 3. `services.items`: 4 to 6. `process.items`: exactly 6 (the six steps, named Listening/Positioning/Identity/Touchpoints/Community/Crisis communication or Lắng nghe/Định vị/Nhận diện/Điểm chạm/Cộng đồng/Xử lý khủng hoảng). `faq`: 5 or 6. `related`: 2 to 4 blog KEYs.
- `sections`: 2 or 3 blocks of real explanatory copy, 120 to 220 words each, HTML limited to `<p> <ul> <ol> <li> <strong> <em> <a>`. This is where the page earns its ranking: explain how it works for this audience, what bilingual content means in practice, what the owner gets.
- `work.items`: 2 to 4 ids from: `chop-chop`, `borgo-villa-nemec`, `impact-investments`, `viet-my-clean-home`, `bac-si-anh`, `canasto-de-flores`, `lac-hong`, `talk2thetop`, `navi-living`, `vestra-place`, `vina-ktv`. Pick the closest sectors and say honestly in `intro` what they are (do not imply they are nail salons etc.).
- Whole page: roughly 650 to 950 words per language.
- Good FAQ topics: how working with a team in another time zone works, whether content is in English and Vietnamese, who posts (the owner's team, using the system we build), what it costs (a quote after the first conversation), what the owner needs to prepare, whether an existing logo can be kept (Refresh).

## 5. Format B: blog article

Two files per article: `content/blog/KEY.en.html` and `content/blog/KEY.vi.html`. Frontmatter between `---` lines, one `key: value` per line (no quotes needed, no line breaks inside a value), then the HTML body:

```
---
slug: nail-salon-social-media-content-ideas
title: Max 60 characters with the primary keyword
description: Max 155 characters, says what the reader will get
h1: Article headline (may differ slightly from title)
lead: One or two sentence standfirst that answers the search intent directly
keyword: the primary keyword
landing: nail-salon-brand-marketing
cta: One line inviting the reader to the related service, e.g. Want a 30-day content calendar built for your salon?
takeaway: First key point, one sentence
takeaway: Second key point
takeaway: Third key point
---
<p>Opening paragraph…</p>
<h2>…</h2>
…
<section class="faq">
<h2>Frequently asked questions</h2>
<details><summary>Question?</summary><p>Answer.</p></details>
</section>
```

- In the `.vi.html` file, `slug` is the Vietnamese slug; `landing` stays the English KEY.
- 3 to 5 `takeaway:` lines. They are shown as a "Key takeaways" box and should be quotable, self-contained sentences.
- Body: **1,300 to 1,900 words** (per language). Allowed tags: `<p> <h2> <h3> <ul> <ol> <li> <strong> <em> <a> <table> <thead> <tbody> <tr> <th> <td> <blockquote>`, plus the FAQ `<section class="faq">` with `<details><summary>…</summary><p>…</p></details>` (4 to 6 questions, each answer one `<p>`). No `<h1>`, no images, no inline styles, no scripts.
- Structure that works: a direct answer in the first paragraph; H2 sections that each answer one question; numbered or bulleted ideas with a concrete example each (what to film, what to write in the caption, in English and, where it helps, in Vietnamese); one table or checklist the reader can copy; a short "common mistakes" section; the FAQ. A reader should be able to act on the article the same day.
- Write for the owner, not for marketers. Examples should feel real: a salon with four technicians in a strip mall, a family phở restaurant with a lunch crowd, a furniture maker in Bình Dương selling to Germany.
- Mention Bunchasake at most twice in the body, naturally, with a `{{landing:…}}` link. The template adds the CTA box and the "key takeaways" box, so do not write those in the body.

## 6. Before you finish

Re-read each file and check: format valid, lengths within range, no forbidden claims (section 2), all links are placeholders with valid KEYs, VI reads like native Vietnamese. Then reply with a short list of the files you wrote and their word counts. Nothing else is needed.
