import type { Meta, StoryObj } from "@storybook/react-vite"

import { UwCrest } from "@/components/lab-website/uw-crest"

const meta: Meta<typeof UwCrest> = {
  title: "LabWebsite/UwCrest",
  component: UwCrest,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    className: "h-[132px] w-[200px] text-foreground",
  },
}
export default meta

type Story = StoryObj<typeof UwCrest>

export const Default: Story = {}
