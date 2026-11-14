# portfolio

My personal site: a retro, early-2000s-style portfolio built with Next.js and Tailwind CSS.

## Running it

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Editing content

- **Portfolio content** (bio, experience, education, projects, links, blog topics): `lib/portfolio-data.ts`
- **Site title** in the top-left corner: `siteTitle` in `components/navbar.tsx`
- **Donations:** the sidebar on the blog (including posts) and contact pages has a Donate button linking to `/donate`. Change which pages show it with `donatePaths` in `components/sidebar.tsx`.
  - Bitcoin: the receiving address is `donate.bitcoinAddress` in `lib/portfolio-data.ts`, shown by `components/bitcoin-donate.tsx`.
  - Ethereum (ETH & USDC): still an "under construction" placeholder. Build the wallet + smart contract UI in `components/donate-widget.tsx`.

About Me is the landing page (`/`), with everything resume-related (experience, education, coursework, clubs, resume PDF). The blog is at `/blog`. Old `/about` links redirect to `/`.

## Writing a blog post

1. Create a Markdown file in `content/blog/`. The filename becomes the URL, so `content/blog/on-bonds.md` is served at `/blog/on-bonds`.
2. Start it with frontmatter:

   ```md
   ---
   title: on bonds
   date: 2026-11-02
   summary: one line shown in the post list.
   topic: misc
   ---

   The post itself, in regular Markdown.
   ```

   `topic` is optional and should match a topic label in `lib/portfolio-data.ts` (case doesn't matter). Readers can filter the blog by topic, and the filtered view has its own link, e.g. `/blog?topic=tech`. To add a new topic, add it to the `topics` list there.

3. Commit and deploy. Posts are listed newest first, grouped by month, and any post less than 30 days old gets a blinking NEW! tag.
