import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect } from "storybook/test"
import {
  AudioLinesIcon,
  MessagesSquareIcon,
  ScrollTextIcon,
} from "lucide-react"

import { PanelToggle } from "@/components/patterns"

const meta: Meta<typeof PanelToggle> = {
  title: "Patterns/PanelToggle",
  component: PanelToggle,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: { variant: "primary", defaultPressed: true },
  render: (args) => (
    <PanelToggle {...args}>
      <MessagesSquareIcon data-icon="inline-start" />
      Summary &amp; Q&amp;A
    </PanelToggle>
  ),
}
export default meta

type Story = StoryObj<typeof PanelToggle>

/** The page's most-used panel: brand outline, filled while it shows. */
export const Primary: Story = {}

/** Every other panel. */
export const Outline: Story = {
  args: { variant: "outline" },
  render: (args) => (
    <PanelToggle {...args}>
      <AudioLinesIcon data-icon="inline-start" />
      Audio
    </PanelToggle>
  ),
}

/** Pressed (panel showing) and not, for both variants. */
export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <PanelToggle variant="primary" pressed>
        <MessagesSquareIcon data-icon="inline-start" />
        Summary &amp; Q&amp;A
      </PanelToggle>
      <PanelToggle variant="primary" pressed={false}>
        <MessagesSquareIcon data-icon="inline-start" />
        Summary &amp; Q&amp;A
      </PanelToggle>
      <PanelToggle pressed>
        <ScrollTextIcon data-icon="inline-start" />
        Transcript
      </PanelToggle>
      <PanelToggle pressed={false}>
        <ScrollTextIcon data-icon="inline-start" />
        Transcript
      </PanelToggle>
    </div>
  ),
}

function LastPanelDemo() {
  const [qa, setQa] = React.useState(false)
  const [transcript, setTranscript] = React.useState(true)
  return (
    <div className="flex items-center gap-2">
      <PanelToggle
        variant="primary"
        pressed={qa}
        onPressedChange={setQa}
        disabled={qa && !transcript}
      >
        <MessagesSquareIcon data-icon="inline-start" />
        Summary &amp; Q&amp;A
      </PanelToggle>
      <PanelToggle
        pressed={transcript}
        onPressedChange={setTranscript}
        disabled={transcript && !qa}
      >
        <ScrollTextIcon data-icon="inline-start" />
        Transcript
      </PanelToggle>
    </div>
  )
}

/** The toggle of the last panel still showing is disabled, so the page is
 * never empty. */
export const LastPanelStays: Story = {
  render: () => <LastPanelDemo />,
  play: async ({ canvas, userEvent }) => {
    const transcript = canvas.getByRole("button", { name: "Transcript" })
    await expect(transcript).toBeDisabled()
    await userEvent.click(canvas.getByRole("button", { name: "Summary & Q&A" }))
    await expect(transcript).toBeEnabled()
    await expect(transcript).toHaveAttribute("aria-pressed", "true")
  },
}
