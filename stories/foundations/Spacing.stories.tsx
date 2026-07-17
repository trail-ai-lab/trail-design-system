import type { Meta, StoryObj } from "@storybook/nextjs"

/**
 * Foundations / Spacing
 *
 * Documents the spacing system so page chrome and component internals stay on
 * one rhythm. Everything tracks the Tailwind 4pt scale (1 unit = 0.25rem = 4px).
 *
 * - Layout tokens (src/tokens/layout.css) govern page-level chrome and are
 *   applied through <AppShell>.
 * - Component tokens (e.g. --card-spacing in card.tsx) govern padding/gaps
 *   inside primitives.
 *
 * Prefer these tokens (and the standard scale below) over ad-hoc values so
 * spacing is consistent and tunable in one place.
 */

const LAYOUT_TOKENS = [
  {
    name: "--shell-px",
    value: "1.5rem / 24px",
    use: "Horizontal padding for the header & toolbar rows",
  },
  {
    name: "--shell-py",
    value: "0.75rem / 12px",
    use: "Vertical padding for the header & toolbar rows",
  },
  {
    name: "--shell-gap",
    value: "1rem / 16px",
    use: "Content-area padding and the gap between content cards",
  },
]

const COMPONENT_TOKENS = [
  {
    name: "--card-spacing (default)",
    value: "1.25rem / 20px",
    use: "Card padding and the gap between card sections",
  },
  {
    name: "--card-spacing (size=sm)",
    value: "1rem / 16px",
    use: "Compact cards (data-size=sm)",
  },
]

const SCALE = [
  { token: "0.5", px: 2 },
  { token: "1", px: 4 },
  { token: "1.5", px: 6 },
  { token: "2", px: 8 },
  { token: "3", px: 12 },
  { token: "4", px: 16 },
  { token: "5", px: 20 },
  { token: "6", px: 24 },
  { token: "8", px: 32 },
]

function Section({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-base font-semibold text-foreground">
          {title}
        </h2>
        <p className="max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </section>
  )
}

function TokenTable({
  rows,
}: {
  rows: { name: string; value: string; use: string }[]
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-left text-xs text-muted-foreground">
          <tr>
            <th className="px-3 py-2 font-medium">Token</th>
            <th className="px-3 py-2 font-medium">Value</th>
            <th className="px-3 py-2 font-medium">Use</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-border">
              <td className="px-3 py-2">
                <code className="text-foreground">{row.name}</code>
              </td>
              <td className="px-3 py-2 tabular-nums text-muted-foreground">
                {row.value}
              </td>
              <td className="px-3 py-2 text-muted-foreground">{row.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function SpacingFoundations() {
  return (
    <div className="flex max-w-3xl flex-col gap-8 p-8 text-foreground">
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-xl font-semibold">Spacing</h1>
        <p className="text-sm text-muted-foreground">
          One 4pt grid for everything. Page chrome uses layout tokens; component
          internals use component tokens. Reach for a token before a raw value.
        </p>
      </div>

      <Section
        title="Layout tokens"
        description="Defined in src/tokens/layout.css and applied through <AppShell>. Page chrome must not redefine these as raw values."
      >
        <TokenTable rows={LAYOUT_TOKENS} />
      </Section>

      <Section
        title="Component tokens"
        description="Owned by the primitive that defines them. Cards drive all internal padding and section gaps off --card-spacing."
      >
        <TokenTable rows={COMPONENT_TOKENS} />
      </Section>

      <Section
        title="The 4pt scale"
        description="When no token applies, use these Tailwind steps. Same-pattern elements (e.g. avatar + text rows) should share the same gap step."
      >
        <div className="flex flex-col gap-1.5">
          {SCALE.map((step) => (
            <div key={step.token} className="flex items-center gap-3 text-sm">
              <code className="w-14 shrink-0 text-muted-foreground">
                {step.token}
              </code>
              <span className="w-12 shrink-0 tabular-nums text-muted-foreground">
                {step.px}px
              </span>
              <div
                className="h-3 rounded-sm bg-primary"
                style={{ width: step.px }}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}

const meta: Meta = {
  title: "Foundations/Spacing",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Overview: Story = { render: () => <SpacingFoundations /> }
