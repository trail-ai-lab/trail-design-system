import type { Meta, StoryObj } from "@storybook/nextjs"

import { PersonProfile } from "@/components/lab-website/person-profile"

const meta: Meta<typeof PersonProfile> = {
  title: "LabWebsite/PersonProfile",
  component: PersonProfile,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    person: {
      id: "shamya-karumbaiah",
      name: "Shamya Karumbaiah",
      designation: "Lab Director",
      category: "People",
      website: "https://shamya.github.io/",
      bio: "Shamya Karumbaiah is an Assistant Professor at the University of Wisconsin–Madison, directing the TRAIL Lab.",
      research: [
        { id: "research-1", title: "Reliability Issues in Current Approaches to Identify and Mitigate AI Bias" },
      ],
    },
  },
}
export default meta

type Story = StoryObj<typeof PersonProfile>

export const Default: Story = {}
