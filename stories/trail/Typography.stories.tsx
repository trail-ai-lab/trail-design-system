import type { Meta, StoryObj } from "@storybook/nextjs"

const meta: Meta = {
  title: "Trail/Typography",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

/**
 * No custom type-scale tokens exist yet (src/tokens/globals.css only
 * defines --font-sans/--font-heading — family, not size/weight/line-height).
 * These are Tailwind's stock text-* utilities. Listed here so a size choice
 * always references a class name, never a raw px/rem value.
 */
const SCALE_ROWS = [
  {
    label: "h1",
    className: "text-4xl font-extrabold tracking-tight lg:text-5xl",
    classes: "text-4xl (lg:text-5xl)",
    size: "2.25rem / 36px (lg: 3rem / 48px)",
  },
  {
    label: "h2",
    className: "text-3xl font-semibold tracking-tight",
    classes: "text-3xl",
    size: "1.875rem / 30px",
  },
  {
    label: "h3",
    className: "text-2xl font-semibold tracking-tight",
    classes: "text-2xl",
    size: "1.5rem / 24px",
  },
  {
    label: "h4",
    className: "text-xl font-semibold tracking-tight",
    classes: "text-xl",
    size: "1.25rem / 20px",
  },
  {
    label: "body",
    className: "leading-7 text-base text-foreground",
    classes: "text-base",
    size: "1rem / 16px",
  },
  {
    label: "small",
    className: "text-sm leading-6 text-foreground",
    classes: "text-sm",
    size: "0.875rem / 14px",
  },
  {
    label: "muted",
    className: "text-sm leading-6 text-muted-foreground",
    classes: "text-sm text-muted-foreground",
    size: "0.875rem / 14px",
  },
  {
    label: "label",
    className: "text-sm font-medium leading-none text-foreground",
    classes: "text-sm font-medium",
    size: "0.875rem / 14px",
  },
  {
    label: "caption",
    className: "text-xs text-muted-foreground",
    classes: "text-xs text-muted-foreground",
    size: "0.75rem / 12px",
  },
]

function TypographyScale() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      {SCALE_ROWS.map((row) => (
        <div key={row.label} className="flex flex-col gap-1.5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              {row.label}
            </p>
            <code className="text-xs text-foreground">{row.classes}</code>
            <span className="text-xs tabular-nums text-muted-foreground">{row.size}</span>
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
    <div className="flex flex-col gap-4 max-w-2xl">
      <p className="leading-7">
        You can use <strong className="font-semibold">bold</strong>,{" "}
        <em>italic</em>,{" "}
        <span className="underline">underline</span>, and{" "}
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          inline code
        </code>{" "}
        within body text.
      </p>
      <blockquote className="mt-6 border-l-2 border-border pl-6 italic text-muted-foreground">
        &ldquo;Good typography is invisible.&rdquo; — Robert Bringhurst
      </blockquote>
    </div>
  )
}

function FontShowcase() {
  return (
    <div className="flex flex-col gap-10 max-w-2xl">
      <section className="flex flex-col gap-4">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-semibold tracking-tight">Headings</h2>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Montserrat · var(--font-heading)
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Montserrat heading one</h1>
        <h2 className="text-3xl font-semibold tracking-tight">Montserrat heading two</h2>
        <h3 className="text-2xl font-semibold tracking-tight">Montserrat heading three</h3>
        <h4 className="text-xl font-semibold tracking-tight">Montserrat heading four</h4>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-baseline gap-2">
          <h2 className="text-xl font-semibold tracking-tight">Body</h2>
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            Inter · var(--font-sans)
          </span>
        </div>
        <p className="leading-7 text-base text-foreground">
          Paragraph — Inter renders body copy with even rhythm and an open aperture. Compare the
          letterforms here against the headings above; the &ldquo;g&rdquo;, &ldquo;a&rdquo;, and
          &ldquo;R&rdquo; differ noticeably between Inter and Montserrat.
        </p>
        <p className="text-sm leading-6 text-foreground">
          Small — Inter at a smaller size for secondary information and dense layouts.
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          Muted — Inter in a muted tone for supporting details and hints.
        </p>
        <label className="text-sm font-medium leading-none text-foreground">
          Label — Inter medium for form labels and inputs
        </label>
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
