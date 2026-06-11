import type { Meta, StoryObj } from "@storybook/nextjs"
import * as React from "react"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox"

const tools = ["SLAI", "AIBAT", "Casting Lab", "Murder Mystery", "Trail Console", "Bias Audit"]

const meta: Meta = {
  title: "UI/Combobox",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Combobox className="w-64">
      <ComboboxTrigger>
        <ComboboxValue placeholder="Select a tool…" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search tools…" />
        <ComboboxList>
          <ComboboxEmpty>No tools found.</ComboboxEmpty>
          {tools.map((tool) => (
            <ComboboxItem key={tool} value={tool}>
              {tool}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}
