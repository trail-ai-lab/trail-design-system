import type { Meta, StoryObj } from "@storybook/nextjs"

// Placeholder — ParticipationBar component to be built in src/components/slai/
// Visualizes talk-time distribution among session participants

const PlaceholderParticipationBar = ({
  participants = [
    { name: "Sarah Chen", percent: 42, color: "bg-primary" },
    { name: "Marcus Johnson", percent: 31, color: "bg-secondary" },
    { name: "Priya Patel", percent: 18, color: "bg-accent" },
    { name: "Others", percent: 9, color: "bg-muted" },
  ],
}: {
  participants?: Array<{ name: string; percent: number; color: string }>
}) => (
  <div className="w-full space-y-3">
    <div className="flex h-3 w-full overflow-hidden rounded-full">
      {participants.map((p) => (
        <div
          key={p.name}
          className={`${p.color} transition-all`}
          style={{ width: `${p.percent}%` }}
          title={`${p.name}: ${p.percent}%`}
        />
      ))}
    </div>
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {participants.map((p) => (
        <div key={p.name} className="flex items-center gap-1.5">
          <span className={`size-2 rounded-full ${p.color}`} />
          <span className="text-xs text-muted-foreground">
            {p.name} · {p.percent}%
          </span>
        </div>
      ))}
    </div>
  </div>
)

const meta: Meta<typeof PlaceholderParticipationBar> = {
  title: "SLAI/ParticipationBar",
  component: PlaceholderParticipationBar,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof PlaceholderParticipationBar>

export const Default: Story = {}

export const Uneven: Story = {
  args: {
    participants: [
      { name: "Dominant Speaker", percent: 78, color: "bg-primary" },
      { name: "Others", percent: 22, color: "bg-muted" },
    ],
  },
}

export const Equal: Story = {
  args: {
    participants: [
      { name: "Speaker A", percent: 25, color: "bg-primary" },
      { name: "Speaker B", percent: 25, color: "bg-secondary" },
      { name: "Speaker C", percent: 25, color: "bg-accent" },
      { name: "Speaker D", percent: 25, color: "bg-muted-foreground" },
    ],
  },
}
