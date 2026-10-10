import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import { LiveWaveform } from "@/components/slai/live-waveform"
import {
  useMicrophoneStream,
  useSimulatedAudioStream,
} from "./_simulated-audio"

const meta: Meta<typeof LiveWaveform> = {
  title: "SLAI/LiveWaveform",
  component: LiveWaveform,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof LiveWaveform>

/** Not recording: a dotted line. */
export const Idle: Story = { args: { state: "idle" } }

/**
 * Recording: bars scroll in from the right with the mic level. Here a
 * simulated voice stands in for the microphone (click the page if the bars
 * stay flat — browsers hold audio until then).
 */
export const Recording: Story = {
  render: function RecordingStory() {
    const stream = useSimulatedAudioStream()
    return <LiveWaveform stream={stream} state="recording" />
  },
}

/** Starting or saving: a gentle wave while there are no levels to show. */
export const Loading: Story = { args: { state: "idle", loading: true } }

/** Your own microphone, after you allow it. */
export const Microphone: Story = {
  render: function MicrophoneStory() {
    const { stream, error, request } = useMicrophoneStream()
    return (
      <div className="flex flex-col items-center gap-3">
        <LiveWaveform stream={stream} state={stream ? "recording" : "idle"} />
        {!stream && (
          <Button variant="outline" size="sm" onClick={request}>
            Use my microphone
          </Button>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>
    )
  },
}
