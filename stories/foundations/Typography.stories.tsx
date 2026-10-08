import type { Meta, StoryObj } from "@storybook/react-vite"

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

/**
 * The type scale (src/tokens/scales.css). Each `text-*` utility sets size, line
 * height, weight and tracking together — pick the step by role, never a raw size.
 * Headings (h1–h4) get Montserrat automatically; add `font-heading` elsewhere.
 */
const SCALE_ROWS = [
  {
    label: "display",
    className: "text-display font-heading",
    classes: "text-display",
    size: "48px · 600 · page hero",
  },
  {
    label: "h1",
    className: "text-h1 font-heading",
    classes: "text-h1",
    size: "36px · 600 · page title",
  },
  {
    label: "h2",
    className: "text-h2 font-heading",
    classes: "text-h2",
    size: "30px · 600 · section title",
  },
  {
    label: "h3",
    className: "text-h3 font-heading",
    classes: "text-h3",
    size: "20px · 600 · subsection title",
  },
  {
    label: "title",
    className: "text-title font-heading",
    classes: "text-title",
    size: "16px · 500 · card and dialog titles",
  },
  {
    label: "body",
    className: "text-body text-foreground",
    classes: "text-body",
    size: "16px · 1.625 · long-form reading",
  },
  {
    label: "body-sm",
    className: "text-body-sm text-foreground",
    classes: "text-body-sm",
    size: "14px · default UI text",
  },
  {
    label: "label",
    className: "text-label text-muted-foreground uppercase",
    classes: "text-label uppercase",
    size: "12px · 500 · section labels",
  },
  {
    label: "caption",
    className: "text-caption text-muted-foreground",
    classes: "text-caption",
    size: "12px · metadata, helper text",
  },
]

function TypographyScale() {
  return (
    <div className="flex max-w-2xl flex-col gap-8">
      {SCALE_ROWS.map((row) => (
        <div key={row.label} className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <p className="text-label text-muted-foreground uppercase">
              {row.label}
            </p>
            <code className="text-xs text-foreground">{row.classes}</code>
            <span className="text-xs text-muted-foreground tabular-nums">
              {row.size}
            </span>
          </div>
          <p className={row.className}>
            The quick brown fox jumps over the lazy dog.
          </p>
        </div>
      ))}
    </div>
  )
}

function InlineStyles() {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <p className="leading-7">
        You can use <strong className="font-semibold">bold</strong>,{" "}
        <em>italic</em>, <span className="underline">underline</span>, and{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          inline code
        </code>{" "}
        within body text.
      </p>
      <blockquote className="mt-6 border-l-2 border-border pl-6 text-muted-foreground italic">
        &ldquo;Good typography is invisible.&rdquo; — Robert Bringhurst
      </blockquote>
    </div>
  )
}

function FontShowcase() {
  return (
    <div className="flex max-w-2xl flex-col gap-10">
      <section className="flex flex-col gap-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-semibold tracking-tight">Headings</h2>
          <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Montserrat · var(--font-heading)
          </span>
        </div>
        <h1 className="text-h1">Montserrat heading one</h1>
        <h2 className="text-h2">Montserrat heading two</h2>
        <h3 className="text-h3">Montserrat heading three</h3>
        <h4 className="text-title">Montserrat title</h4>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-semibold tracking-tight">Body</h2>
          <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Inter · var(--font-sans)
          </span>
        </div>
        <p className="text-base leading-7 text-foreground">
          Paragraph — Inter renders body copy with even rhythm and an open
          aperture. Compare the letterforms here against the headings above; the
          &ldquo;g&rdquo;, &ldquo;a&rdquo;, and &ldquo;R&rdquo; differ
          noticeably between Inter and Montserrat.
        </p>
        <p className="text-sm leading-6 text-foreground">
          Small — Inter at a smaller size for secondary information and dense
          layouts.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Muted — Inter in a muted tone for supporting details and hints.
        </p>
        <p className="text-sm leading-none font-medium text-foreground">
          Label — Inter medium for form labels and inputs
        </p>
      </section>
    </div>
  )
}

export const Fonts: Story = {
  render: () => <FontShowcase />,
}

export const Scale: Story = {
  render: () => <TypographyScale />,
}

export const Inline: Story = {
  render: () => <InlineStyles />,
}
