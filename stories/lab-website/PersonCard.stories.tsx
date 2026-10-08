import type { Meta, StoryObj } from "@storybook/react-vite"

import { PersonCard } from "@/components/lab-website/person-card"

const meta: Meta<typeof PersonCard> = {
  title: "LabWebsite/PersonCard",
  component: PersonCard,
  tags: ["autodocs"],
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

/** No photo: falls back to initials. Advisor shows a secondary link. */
export const WithAdvisor: Story = {
  args: {
    person: {
      id: "student-1",
      name: "Jordan Lee",
      designation: "PhD Student",
      advisor: "Shamya Karumbaiah",
      advisorUrl: "/people/shamya-karumbaiah",
    },
  },
  render: (args) => (
    <div className="max-w-[16rem]">
      <PersonCard {...args} />
    </div>
  ),
}
