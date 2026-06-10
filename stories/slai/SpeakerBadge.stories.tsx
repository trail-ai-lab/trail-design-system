import type { Meta, StoryObj } from "@storybook/nextjs"

// Placeholder — SpeakerBadge component to be built in src/components/slai/
// Shows a speaker's name, role, and speaking status within SLAI sessions

const PlaceholderSpeakerBadge = ({
  name = "Dr. Sarah Chen",
  role = "Keynote Speaker",
  status = "speaking",
}: {
  name?: string
  role?: string
  status?: "speaking" | "idle" | "muted"
}) => (
  <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
    <span
      className={`size-2 rounded-full ${
        status === "speaking"
          ? "bg-primary animate-pulse"
          : status === "muted"
          ? "bg-destructive"
          : "bg-muted-foreground"
      }`}
    />
    <span className="text-sm font-medium text-foreground">{name}</span>
    <span className="text-xs text-muted-foreground">{role}</span>
  </div>
)

const meta: Meta<typeof PlaceholderSpeakerBadge> = {
  title: "SLAI/SpeakerBadge",
  component: PlaceholderSpeakerBadge,
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["speaking", "idle", "muted"],
    },
  },
}

export default meta
type Story = StoryObj<typeof PlaceholderSpeakerBadge>

export const Speaking: Story = {
  args: { name: "Dr. Sarah Chen", role: "Keynote", status: "speaking" },
}

export const Idle: Story = {
  args: { name: "Marcus Johnson", role: "Panelist", status: "idle" },
}

export const Muted: Story = {
  args: { name: "Priya Patel", role: "Moderator", status: "muted" },
}
