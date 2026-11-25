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

/** WIDA not assessed (no student has `wida`): the column is hidden. */
export const StandardOnly: Story = {
  args: {
    students: [
      { id: "mei", name: "Mei", language: "Mandarin", standard: "not-yet" },
      { id: "liam", name: "Liam", language: "English", standard: "met" },
      { id: "rosa", name: "Rosa", language: "Spanish", standard: "partial" },
    ],
  },
}

/** A student with too little to judge has no standard verdict. */
export const WithNoVerdict: Story = {
  args: {
    students: [
      { id: "mei", name: "Mei", language: "Mandarin", standard: "met" },
      { id: "liam", name: "Liam", language: "English", standard: null },
      { id: "rosa", name: "Rosa", language: "Spanish", standard: "partial" },
    ],
  },
}
