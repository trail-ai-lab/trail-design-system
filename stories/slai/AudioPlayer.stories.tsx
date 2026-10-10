import type { Meta, StoryObj } from "@storybook/react-vite"

import { AudioPlayerCard } from "@/components/slai/audio-player-card"

/** A short generated tone as a WAV data URL, so playback runs on a real `<audio>` element. */
function toneUrl(seconds: number) {
  const rate = 8000
  const samples = rate * seconds
  const view = new DataView(new ArrayBuffer(44 + samples * 2))
  const text = (offset: number, value: string) =>
    [...value].forEach((char, i) =>
      view.setUint8(offset + i, char.charCodeAt(0))
    )
  text(0, "RIFF")
  view.setUint32(4, 36 + samples * 2, true)
  text(8, "WAVEfmt ")
  view.setUint32(16, 16, true)
  view.setUint16(20, 1, true)
  view.setUint16(22, 1, true)
  view.setUint32(24, rate, true)
  view.setUint32(28, rate * 2, true)
  view.setUint16(32, 2, true)
  view.setUint16(34, 16, true)
  text(36, "data")
  view.setUint32(40, samples * 2, true)
  for (let i = 0; i < samples; i++) {
    const sample = Math.sin((2 * Math.PI * 440 * i) / rate) * 0.2
    view.setInt16(44 + i * 2, sample * 0x7fff, true)
  }
  let binary = ""
  new Uint8Array(view.buffer).forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return `data:audio/wav;base64,${btoa(binary)}`
}

const TONE_URL = toneUrl(6)

// a11y: aria-input-field-name disabled. Upstream: shadcn's Slider doesn't pass aria-label to the Radix thumb.
const A11Y = {
  config: {
    rules: [{ id: "aria-input-field-name", enabled: false }],
  },
}

const meta: Meta<typeof AudioPlayerCard> = {
  title: "SLAI/AudioPlayerCard",
  component: AudioPlayerCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", a11y: A11Y },
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof AudioPlayerCard>

/**
 * Simulated playback (no `src`): play advances over `durationSeconds`, and
 * the decorative bars fill in as it plays.
 */
export const Default: Story = {
  args: { durationSeconds: 1453, onDownload: () => {} },
}

/** A real file: pass `src` (e.g. a signed download URL); the length comes from the file. */
export const WithAudioFile: Story = {
  args: { title: "Group 2 recording", src: TONE_URL, onDownload: () => {} },
}

/** `waveform={false}`: just the scrubber. */
export const WithoutWaveform: Story = {
  args: { durationSeconds: 1453, waveform: false, onDownload: () => {} },
}

export const ShortClip: Story = {
  args: { title: "Group 2 recording", durationSeconds: 312 },
}

/** Single row for details panels: time inline, mute and download kept. */
export const Compact: Story = {
  args: { durationSeconds: 312, compact: true, onDownload: () => {} },
}

export const Downloading: Story = {
  args: { durationSeconds: 312, onDownload: () => {}, downloading: true },
}

export const Loading: Story = {
  args: { loading: true },
}

export const CompactLoading: Story = {
  args: { loading: true, compact: true },
}

export const Error: Story = {
  args: { error: "Failed to load audio for playback." },
}
