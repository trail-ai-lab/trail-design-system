import type { Meta, StoryObj } from "@storybook/nextjs"

const meta: Meta = {
  title: "Trail/ColorPalette",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

interface SwatchProps {
  variable: string
  label: string
  textClass?: string
}

function Swatch({ variable, label, textClass = "text-foreground" }: SwatchProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-lg border border-border/50 shadow-sm"
        style={{ background: `var(${variable})` }}
      />
      <div>
        <p className={`text-xs font-medium ${textClass}`}>{label}</p>
        <p className="font-mono text-[10px] text-muted-foreground">{variable}</p>
      </div>
    </div>
  )
}

interface GroupProps {
  title: string
  swatches: SwatchProps[]
}

function SwatchGroup({ title, swatches }: GroupProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-foreground border-b border-border pb-1">{title}</h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {swatches.map((s) => (
          <Swatch key={s.variable} {...s} />
        ))}
      </div>
    </div>
  )
}

function ColorPaletteDisplay() {
  return (
    <div className="flex flex-col gap-10 p-2">
      <SwatchGroup
        title="Background"
        swatches={[
          { variable: "--background", label: "Background" },
          { variable: "--card", label: "Card" },
          { variable: "--popover", label: "Popover" },
        ]}
      />

      <SwatchGroup
        title="Foreground"
        swatches={[
          { variable: "--foreground", label: "Foreground" },
          { variable: "--card-foreground", label: "Card FG" },
          { variable: "--popover-foreground", label: "Popover FG" },
        ]}
      />

      <SwatchGroup
        title="Primary"
        swatches={[
          { variable: "--primary", label: "Primary" },
          { variable: "--primary-foreground", label: "Primary FG" },
        ]}
      />

      <SwatchGroup
        title="Secondary"
        swatches={[
          { variable: "--secondary", label: "Secondary" },
          { variable: "--secondary-foreground", label: "Secondary FG" },
        ]}
      />

      <SwatchGroup
        title="Muted"
        swatches={[
          { variable: "--muted", label: "Muted" },
          { variable: "--muted-foreground", label: "Muted FG" },
        ]}
      />

      <SwatchGroup
        title="Accent"
        swatches={[
          { variable: "--accent", label: "Accent" },
          { variable: "--accent-foreground", label: "Accent FG" },
        ]}
      />

      <SwatchGroup
        title="Destructive"
        swatches={[
          { variable: "--destructive", label: "Destructive" },
        ]}
      />

      <SwatchGroup
        title="Border & Input"
        swatches={[
          { variable: "--border", label: "Border" },
          { variable: "--input", label: "Input" },
          { variable: "--ring", label: "Ring" },
        ]}
      />

      <SwatchGroup
        title="Chart Colors"
        swatches={[
          { variable: "--chart-1", label: "Chart 1" },
          { variable: "--chart-2", label: "Chart 2" },
          { variable: "--chart-3", label: "Chart 3" },
          { variable: "--chart-4", label: "Chart 4" },
          { variable: "--chart-5", label: "Chart 5" },
        ]}
      />

      <SwatchGroup
        title="Sidebar"
        swatches={[
          { variable: "--sidebar", label: "Sidebar" },
          { variable: "--sidebar-foreground", label: "Sidebar FG" },
          { variable: "--sidebar-primary", label: "Sidebar Primary" },
          { variable: "--sidebar-primary-foreground", label: "Sidebar Primary FG" },
          { variable: "--sidebar-accent", label: "Sidebar Accent" },
          { variable: "--sidebar-border", label: "Sidebar Border" },
        ]}
      />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-border pb-1">
          <h3 className="text-sm font-semibold text-foreground">
            SLAI Status Colors
          </h3>
          <span className="rounded-full bg-destructive/10 px-2 py-0.5 font-mono text-[10px] font-medium text-destructive">
            hand-added
          </span>
        </div>
        <p className="max-w-prose text-xs text-muted-foreground">
          <code className="font-mono">--status-recording</code>,{" "}
          <code className="font-mono">--status-paused</code>, and{" "}
          <code className="font-mono">--status-uploaded</code> are hand-added
          directly in <code className="font-mono">globals.css</code> — they
          are <strong className="text-foreground">not part of the generated
          design preset</strong>. Regenerating the preset (e.g. via the
          Shadcn theme generator) will silently drop them; re-add them
          manually afterward. See{" "}
          <code className="font-mono">src/tokens/globals.css</code> for the
          exact values in both light and dark mode.
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <Swatch variable="--status-recording" label="Recording" />
          <Swatch variable="--status-paused" label="Paused" />
          <Swatch variable="--status-uploaded" label="Uploaded" />
        </div>
      </div>
    </div>
  )
}

export const AllColors: Story = {
  render: () => <ColorPaletteDisplay />,
}
