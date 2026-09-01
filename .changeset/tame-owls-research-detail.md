---
"@trail-ai-lab/trail-design-system": minor
---

Add `ResearchDetail`, a full single-page layout for one research area (title, funders, a
rendered-content slot for markdown/MDX body copy, an optional people section, and an optional
publications slot) — the research-page counterpart to `EventDetail`. The Research listing page
had a card (`ResearchCard`) and a Storybook-only page recipe, but no detail-page layout; this
fills that gap for consumers building a `/research/[id]`-style page.

Also adds `ResearchIntro`, the Research listing page's opening section — a mission statement
paired with a numbered FAQ list, split two-up. The `LabWebsite/Pages/Research` Storybook recipe
now composes `PageHeader` + `ResearchIntro` + `Pillars` (reused for a "Contributions" icon grid)
+ `ResearchCard` grid, matching the homepage recipe's use of real, reusable section components
instead of page-local markup.
