import type { Meta, StoryObj } from "@storybook/nextjs"

import { PersonCard } from "@/components/lab-website/person-card"

const meta: Meta<typeof PersonCard> = {
  title: "LabWebsite/PersonCard",
  component: PersonCard,
  parameters: { layout: "padded" },
  args: {
    person: {
      id: "shamya-karumbaiah",
      name: "Shamya Karumbaiah",
      designation: "Lab Director",
    },
  },
}
export default meta

type Story = StoryObj<typeof PersonCard>

export const Default: Story = {
  render: (args) => (
    <div className="max-w-[16rem]">
      <PersonCard {...args} />
    </div>
  ),
}
