import type { Meta, StoryObj } from "@storybook/nextjs"
import * as React from "react"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
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

// No ComboboxItem children at all (e.g. an empty results set from the
// server) — ComboboxEmpty is the fallback shown in place of the list.
export const EmptyResults: Story = {
  render: () => (
    <Combobox className="w-64" defaultOpen>
      <ComboboxTrigger>
        <ComboboxValue placeholder="Select a tool…" />
      </ComboboxTrigger>
      <ComboboxContent>
        <ComboboxInput placeholder="Search tools…" />
        <ComboboxList>
          <ComboboxEmpty>No tools found.</ComboboxEmpty>
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
}

// Multi-select mode swaps the trigger button for ComboboxChips — selected
// values render as removable chips, with the search input inline. The
// dropdown must be anchored to the chips row (not a trigger) via
// useComboboxAnchor + ComboboxContent's `anchor` prop.
export const MultiSelect: Story = {
  render: function Render() {
    const [value, setValue] = React.useState<string[]>(["SLAI", "AIBAT"])
    const anchor = useComboboxAnchor()
    return (
      <Combobox multiple value={value} onValueChange={setValue}>
        <ComboboxChips ref={anchor} className="w-72">
          {value.map((tool) => (
            <ComboboxChip key={tool}>{tool}</ComboboxChip>
          ))}
          <ComboboxChipsInput placeholder="Add a tool…" />
        </ComboboxChips>
        <ComboboxContent anchor={anchor}>
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
    )
  },
}
