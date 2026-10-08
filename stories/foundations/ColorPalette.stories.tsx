import type { Meta, StoryObj } from "@storybook/react-vite"

import { Badge } from "@/components/ui/badge"

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj

interface SwatchProps {
  variable: string
  label: string
  textClass?: string
}

function Swatch({
  variable,
  label,
  textClass = "text-foreground",
}: SwatchProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div
        className="h-14 w-full rounded-lg border border-border/50 shadow-sm"
        style={{ background: `var(${variable})` }}
      />
      <div>
        <p className={`text-xs font-medium ${textClass}`}>{label}</p>
        <p className="font-mono text-caption text-muted-foreground">
          {variable}
        </p>
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
      <h3 className="border-b border-border pb-1 text-sm font-semibold text-foreground">
        {title}
      </h3>
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
        swatches={[{ variable: "--destructive", label: "Destructive" }]}
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
          {
            variable: "--sidebar-primary-foreground",
            label: "Sidebar Primary FG",
          },
          { variable: "--sidebar-accent", label: "Sidebar Accent" },
          { variable: "--sidebar-border", label: "Sidebar Border" },
        ]}
      />

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-border pb-1">
          <h3 className="text-sm font-semibold text-foreground">
            Meaning Colors
          </h3>
          <Badge variant="outline" className="font-mono">
            semantic.css
          </Badge>
        </div>
        <p className="max-w-prose text-xs text-muted-foreground">
          <code className="font-mono">--success</code> (met / good),{" "}
          <code className="font-mono">--warning</code> (needs attention), and{" "}
          <code className="font-mono">--info</code> (neutral notice), each with
          a <code className="font-mono">-foreground</code> pair for solid fills.
          Use them as text or icons directly, or tinted with{" "}
          <code className="font-mono">bg-success/10</code>. Every hue carries
          one meaning — don&apos;t borrow a status color for a meaning.
          semantic.css also adjusts three preset values for contrast: light{" "}
          <code className="font-mono">--muted-foreground</code>, dark{" "}
          <code className="font-mono">--primary</code> (lighter, with dark text
          on it, as in shadcn&apos;s dark themes) and{" "}
          <code className="font-mono">--ring</code> (now the brand primary,
          drawn at full strength).
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <Swatch variable="--success" label="Success" />
          <Swatch variable="--success-foreground" label="Success FG" />
          <Swatch variable="--warning" label="Warning" />
          <Swatch variable="--warning-foreground" label="Warning FG" />
          <Swatch variable="--info" label="Info" />
          <Swatch variable="--info-foreground" label="Info FG" />
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2 border-b border-border pb-1">
          <h3 className="text-sm font-semibold text-foreground">
            SLAI Status Colors
          </h3>
          <Badge variant="outline" className="font-mono">
            semantic.css
          </Badge>
        </div>
        <p className="max-w-prose text-xs text-muted-foreground">
          <code className="font-mono">--status-recording</code>,{" "}
          <code className="font-mono">--status-paused</code>, and{" "}
          <code className="font-mono">--status-uploaded</code> are aliases of{" "}
          <code className="font-mono">--destructive</code>,{" "}
          <code className="font-mono">--warning</code>, and{" "}
          <code className="font-mono">--info</code>. Use them only for recording
          state. Like the meaning colors, they live in{" "}
          <code className="font-mono">src/tokens/semantic.css</code>, layered on
          top of the generated <code className="font-mono">globals.css</code> so
          regenerating the preset never drops them.
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
