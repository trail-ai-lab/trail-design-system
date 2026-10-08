import type { Meta, StoryObj } from "@storybook/react-vite"

import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import { AddSourceForm } from "@/components/slai/add-source-form"

const meta: Meta<typeof AddSourceForm> = {
  title: "SLAI/AddSourceForm",
  component: AddSourceForm,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { languageOptions: DEFAULT_LANGUAGES },
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AddSourceForm>

/** Drop or pick a file to reveal the rename and languages fields. */
export const Default: Story = {}

export const Uploading: Story = { args: { uploading: true } }
