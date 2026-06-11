import type { Meta, StoryObj } from "@storybook/nextjs"

const meta: Meta = {
  title: "Trail/Typography",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

function TypographyScale() {
  return (
    <div className="flex flex-col gap-8 max-w-2xl">
      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">h1</p>
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          The quick brown fox jumps
        </h1>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">h2</p>
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight">
          The quick brown fox jumps
        </h2>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">h3</p>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          The quick brown fox jumps
        </h3>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">h4</p>
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          The quick brown fox jumps
        </h4>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">body</p>
        <p className="leading-7 text-base text-foreground">
          The quick brown fox jumps over the lazy dog. Typography drives clarity and hierarchy in
          every interface. Good type choices communicate trust and professionalism at a glance.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">small</p>
        <p className="text-sm leading-6 text-foreground">
          The quick brown fox jumps over the lazy dog. Smaller body text for secondary information.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">muted</p>
        <p className="text-sm leading-6 text-muted-foreground">
          The quick brown fox jumps over the lazy dog. Muted text for supporting information.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">label</p>
        <p className="text-sm font-medium leading-none text-foreground">Form label or strong emphasis</p>
      </div>

      <div className="flex flex-col gap-1">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">caption</p>
        <p className="text-xs text-muted-foreground">
          Caption text for metadata, timestamps, and supplementary details.
        </p>
      </div>
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
