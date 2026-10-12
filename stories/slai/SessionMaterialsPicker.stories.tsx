import type { Meta, StoryObj } from "@storybook/react-vite"

import { Field, FieldLabel } from "@/components/ui/field"
import { SessionMaterialsPicker } from "@/components/slai/session-materials-picker"
import { PHYSICS_MATERIALS } from "./_material-fixtures"

// a11y: scrollable-region-focusable disabled. Upstream: cmdk's list isn't keyboard-focusable.
const A11Y = {
  config: {
    rules: [{ id: "scrollable-region-focusable", enabled: false }],
  },
}

const meta: Meta<typeof SessionMaterialsPicker> = {
  title: "SLAI/SessionMaterialsPicker",
  component: SessionMaterialsPicker,
  tags: ["autodocs"],
  parameters: { a11y: A11Y },
  args: {
    materials: PHYSICS_MATERIALS,
    onUploadNew: () => {},
    "aria-label": "Materials for this session",
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
type Story = StoryObj<typeof SessionMaterialsPicker>

/** Failed materials aren't offered; processing ones say so. */
export const Default: Story = {}

export const WithSelection: Story = {
  args: { defaultValue: ["unit-3-slides", "inclined-plane-lab"] },
}

/** A picked material is still processing: the helper says Q&A will use it once ready. */
export const StillProcessing: Story = {
  args: { defaultValue: ["unit-3-slides", "newton-reading"] },
}

/** A new class: nothing to pick yet, only "Upload new…". */
export const EmptyLibrary: Story = {
  args: { materials: [], placeholder: "No materials in Science yet" },
}

/** With a visible label instead of `aria-label`. */
export const InField: Story = {
  args: { "aria-label": undefined, id: "session-materials" },
  render: (args) => (
    <Field>
      <FieldLabel htmlFor="session-materials">
        For this session
        <span className="font-normal text-muted-foreground">— optional</span>
      </FieldLabel>
      <SessionMaterialsPicker {...args} />
    </Field>
  ),
}
