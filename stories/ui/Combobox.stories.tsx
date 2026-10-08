import type { Meta, StoryObj } from "@storybook/react-vite"
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

const tools = [
  "SLAI",
  "AIBAT",
  "Casting Lab",
  "Murder Mystery",
  "Trail Console",
  "Bias Audit",
]

// a11y: aria-required-children disabled. Upstream: Base UI renders an empty listbox when there are no results.
// a11y: aria-dialog-name disabled. Upstream: Base UI's combobox popup has no accessible name.
// a11y: button-name disabled. Upstream: Base UI's combobox trigger and chip-remove buttons have no name in these demos.
const A11Y = {
  config: {
    rules: [
      { id: "aria-required-children", enabled: false },
      { id: "aria-dialog-name", enabled: false },
      { id: "button-name", enabled: false },
    ],
  },
}

const meta: Meta = {
  title: "UI/Combobox",
  parameters: { a11y: A11Y },
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <Combobox>
      <ComboboxTrigger className="w-64">
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
    <Combobox defaultOpen>
      <ComboboxTrigger className="w-64">
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
