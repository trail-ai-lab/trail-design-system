import type { Meta, StoryObj } from "@storybook/react-vite"

import { ClassOverviewGrid } from "@/components/slai/class-overview-grid"

const meta: Meta<typeof ClassOverviewGrid> = {
  title: "SLAI/ClassOverviewGrid",
  component: ClassOverviewGrid,
  tags: ["autodocs"],
  args: {
    standardLabel: "CCSS",
    students: [
      {
        id: "mei",
        name: "Mei",
        language: "Mandarin",
        wida: "partial",
        standard: "not-yet",
      },
      {
        id: "liam",
        name: "Liam",
        language: "English",
        wida: null,
        standard: "met",
      },
      {
        id: "rosa",
        name: "Rosa",
        language: "Spanish",
        wida: "met",
        standard: "partial",
      },
      {
        id: "diego",
        name: "Diego",
        language: "Spanish",
        wida: "not-yet",
        standard: "not-yet",
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ClassOverviewGrid>

export const Default: Story = {}

export const WithoutLanguages: Story = {
  args: {
    students: [
      { id: "mei", name: "Mei", wida: "partial", standard: "not-yet" },
      { id: "liam", name: "Liam", wida: null, standard: "met" },
      { id: "rosa", name: "Rosa", wida: "met", standard: "partial" },
    ],
  },
}
