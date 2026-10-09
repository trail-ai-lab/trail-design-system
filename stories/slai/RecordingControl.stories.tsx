import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  RecordingControl,
  type RecordingState,
} from "@/components/slai/recording-control"

const meta: Meta<typeof RecordingControl> = {
  title: "SLAI/RecordingControl",
  component: RecordingControl,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof RecordingControl>

/** Uncontrolled: keeps its own state and clock. Tap to try it. */
export const Default: Story = {}

export const Recording: Story = {
  args: { defaultState: "recording", seconds: 754 },
}

export const Paused: Story = {
  args: { defaultState: "paused", seconds: 754 },
}

/** For recorders that can't pause (e.g. live transcription). */
export const NotPausable: Story = {
  args: { defaultState: "recording", seconds: 42, pausable: false },
}

export const Connecting: Story = {
  args: { status: "connecting" },
}

export const Stopping: Story = {
  args: { defaultState: "recording", seconds: 754, status: "stopping" },
}

/**
 * Driven by the app's recorder: `state` and `seconds` come from it, and the
 * events tell it what the user tapped. Here a stand-in recorder updates both.
 */
export const Controlled: Story = {
  render: function ControlledStory() {
    const [state, setState] = React.useState<RecordingState>("idle")
    const [seconds, setSeconds] = React.useState(0)

    React.useEffect(() => {
      if (state !== "recording") return
      const id = setInterval(() => setSeconds((value) => value + 1), 1000)
      return () => clearInterval(id)
    }, [state])

    return (
      <RecordingControl
        state={state}
        seconds={seconds}
        onStart={() => {
          setSeconds(0)
          setState("recording")
        }}
        onStop={() => setState("idle")}
        onPause={() => setState("paused")}
        onResume={() => setState("recording")}
      />
    )
  },
}
