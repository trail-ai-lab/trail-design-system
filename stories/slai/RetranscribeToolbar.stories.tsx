import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import { RetranscribeToolbar } from "@/components/slai/retranscribe-toolbar"

const meta: Meta<typeof RetranscribeToolbar> = {
  title: "SLAI/RetranscribeToolbar",
  component: RetranscribeToolbar,
  tags: ["autodocs"],
  args: { languages: DEFAULT_LANGUAGES, value: ["Marathi"], onChange: () => {} },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof RetranscribeToolbar>

export const Default: Story = {
  render: function Controlled(args) {
    const [value, setValue] = React.useState(args.value)
    return <RetranscribeToolbar {...args} value={value} onChange={setValue} />
  },
}

export const Transcribing: Story = { args: { loading: true } }
