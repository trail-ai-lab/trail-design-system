import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"

import { Button } from "@/components/ui/button"
import { LiveWaveform } from "@/components/slai/live-waveform"

const meta: Meta<typeof LiveWaveform> = {
  title: "SLAI/LiveWaveform",
  component: LiveWaveform,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof LiveWaveform>

/**
 * `processing` drives a synthetic waveform — no microphone permission
 * needed, matching how the rest of the design system mocks audio (see
 * AudioPlayerCard). This is what RecordingControl's Stop/Start state reuses.
 */
export const Processing: Story = {
  render: function ProcessingDemo() {
    const [processing, setProcessing] = React.useState(false)
    return (
      <div className="flex w-96 flex-col items-center gap-4">
        <LiveWaveform
          processing={processing}
          mode="scrolling"
          height={40}
          barWidth={3}
          barGap={2}
          barRadius={2}
          className="w-full text-primary"
        />
        <Button variant="outline" onClick={() => setProcessing((v) => !v)}>
          {processing ? "Stop" : "Start"}
        </Button>
      </div>
    )
  },
}

export const Idle: Story = {
  render: () => (
    <div className="w-96 text-primary">
      <LiveWaveform height={40} />
    </div>
  ),
}
