import type { Meta, StoryObj } from "@storybook/react-vite"

import { NamesToLinkCard } from "@/components/slai/names-to-link-card"
import { PHYSICS_ROSTER, UNLINKED_NAMES } from "./_roster-fixtures"

const meta: Meta<typeof NamesToLinkCard> = {
  title: "SLAI/NamesToLinkCard",
  component: NamesToLinkCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    names: UNLINKED_NAMES,
    students: PHYSICS_ROSTER.map(({ id, name }) => ({ id, name })),
    onLink: () => {},
    onCreate: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof NamesToLinkCard>

export const Default: Story = {}

/** The row being linked is disabled with a spinner. */
export const Linking: Story = { args: { loadingName: "Danny" } }

/** An empty roster: names can only be added as new students. */
export const EmptyRoster: Story = { args: { students: [] } }
