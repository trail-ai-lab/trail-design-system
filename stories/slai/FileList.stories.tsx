import type { Meta, StoryObj } from "@storybook/nextjs"

import { FileList } from "@/components/slai/file-list"

const meta: Meta<typeof FileList> = {
  title: "SLAI/FileList",
  component: FileList,
  tags: ["autodocs"],
  args: {
    files: [
      { id: "1", name: "group-1.mp3", sizeLabel: "4.2 MB" },
      { id: "2", name: "recess-clip.mov", sizeLabel: "18 MB" },
      { id: "3", name: "lesson-plan.pdf", sizeLabel: "320 KB" },
      { id: "4", name: "notes.txt", sizeLabel: "2 KB" },
      { id: "5", name: "data.bin", sizeLabel: "1 KB" },
    ],
    onRemove: () => {},
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof FileList>

export const Default: Story = {}
