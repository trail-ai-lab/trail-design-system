import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { ItemGroup } from "@/components/ui/item"
import { PersonRow } from "@/components/patterns/person-row"

const meta: Meta<typeof PersonRow> = {
  title: "Patterns/PersonRow",
  component: PersonRow,
  tags: ["autodocs"],
  args: { name: "Mei Chen", description: "Mandarin" },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof PersonRow>

export const Default: Story = {}

export const NameOnly: Story = { args: { description: undefined } }

export const WithActions: Story = {
  args: {
    actions: (
      <Button variant="outline" size="sm">
        View
      </Button>
    ),
  },
}

export const Variants: Story = {
  render: () => (
    <ItemGroup>
      <PersonRow role="listitem" name="Mei Chen" description="default" />
      <PersonRow
        role="listitem"
        name="Liam Ortiz"
        description="outline"
        variant="outline"
      />
      <PersonRow
        role="listitem"
        name="Rosa Diaz"
        description="muted"
        variant="muted"
      />
    </ItemGroup>
  ),
}

export const Sizes: Story = {
  render: () => (
    <ItemGroup>
      <PersonRow
        role="listitem"
        name="Mei Chen"
        description="default"
        size="default"
      />
      <PersonRow role="listitem" name="Liam Ortiz" description="sm" size="sm" />
      <PersonRow role="listitem" name="Rosa Diaz" description="xs" size="xs" />
    </ItemGroup>
  ),
}
