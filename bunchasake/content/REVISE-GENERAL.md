# Revision brief: make blog articles general, not "Vietnamese"-centred

Read `/home/user/mora/bunchasake/content/BRIEF.md` first (format, hard rules, link placeholders still apply). This file overrides it on **audience framing only**.

## What the owner asked for

The blog currently repeats "Vietnamese" / "người Việt" / "doanh nghiệp Việt" far too often. The owner wants each article to speak **generally**: "if you run a nail salon, do this", "if you run a restaurant, do this", "if your brand is entering Europe, do this". The readers are still mostly Vietnamese owners (that is the market Bunchasake serves), so the Vietnamese context may stay as a **light touch**, never as the headline or the frame of every paragraph.

## Rules for the rewrite

1. **Do not change** `slug:` or `landing:` in the frontmatter, the file names, or any `{{landing:…}}`, `{{blog:…}}`, `{{ext:…}}` placeholder keys. URLs are already submitted to Google and Bing.
2. **Rewrite `title:`, `h1:`, `description:`, `lead:`, `keyword:` and the `takeaway:` lines** so they no longer contain "Vietnamese", "Vietnam", "người Việt", "doanh nghiệp Việt", "thương hiệu Việt", "Việt kiều" unless the topic is literally impossible without it. Use general framings, for example:
   - "Bilingual marketing for small businesses: one brand, two languages"
   - "How to market a restaurant, with a 90-day plan"
   - "How to work with a remote marketing team in another time zone"
   - "How to take your brand into European markets"
   - "Small business marketing checklist for Australia"
   Keep the new `keyword:` a realistic search phrase in the article's language. Title max 60 characters, description max 155.
3. **Body:** remove the repetition. Address the reader as an owner ("your salon", "your restaurant", "your brand", "chủ tiệm", "chủ nhà hàng", "thương hiệu của bạn"). Keep **at most 3 mentions** of Vietnamese / Vietnam / người Việt in the whole body, and only where they genuinely help, for example:
   - one example of a second language ("if many of your regulars speak Vietnamese, Spanish or another language…"),
   - a dish name used as a natural example (phở, bánh mì) without labelling the restaurant "Vietnamese" every time,
   - Bunchasake's own one-line description ("a studio working between Vietnam and Italy") where the article already mentions us.
   Articles that were about "Vietnamese customers / Vietnamese brands" become about "community customers / customers who share your language" or "brands from Asia / growing companies / exporters" in general terms, while staying useful to the same readers.
4. Keep everything else that works: structure, H2 sections, tables, checklists, FAQ (same number of questions), takeaways count, outbound links, internal links, honesty rules (no statistics, no invented facts about Bunchasake, no typed URLs, no em dashes). Rewrite sentences only as much as needed; do not shorten the article below 1,300 body words or push it above 1,900 per language.
5. **EN and VI versions stay parallel** (same sections, same facts). The Vietnamese version addresses the reader naturally as "bạn" and drops "người Việt / doanh nghiệp Việt ở nước ngoài" phrasing the same way.
6. Check each file still starts with a valid frontmatter block and count remaining mentions with:
   `grep -o -i 'vietnam' FILE.en.html | wc -l` (target: 3 or fewer outside the frontmatter, 0 in title/h1/description/keyword) and
   `grep -o -i 'việt' FILE.vi.html | wc -l` (target: 4 or fewer, counting "tiếng Việt").

Edit only the files you are assigned. Do not run git. Reply with each article's new EN title and VI title and the remaining mention counts.
