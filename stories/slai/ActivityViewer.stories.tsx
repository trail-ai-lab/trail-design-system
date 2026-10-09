import * as React from "react"
import type { Meta, StoryObj } from "@storybook/react-vite"
import { XIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

import { ActivityViewer } from "@/components/slai/activity-viewer"

const DEMO_DOC =
  "<body style='font-family:sans-serif;display:grid;place-items:center;height:100vh;margin:0'><p>Embedded activity content</p></body>"

const meta: Meta<typeof ActivityViewer> = {
  title: "SLAI/ActivityViewer",
  component: ActivityViewer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Inclined Plane" },
  decorators: [
    (Story) => (
      <div className="flex h-[420px] w-full max-w-3xl flex-col">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ActivityViewer>

export const Iframe: Story = { args: { srcDoc: DEMO_DOC } }

/** The VidyaMap simulation is native to the app; the design system shows a placeholder. */
export const VidyaMap: Story = {
  args: { variant: "vidyamap", title: "VidyaMap" },
}

export const Blocked: Story = {
  args: { blocked: true, src: "https://example.com" },
}

/**
 * The activity's name and "Close activity" live in the page toolbar, so
 * nothing covers the activity's own controls.
 */
export const WithToolbarClose: Story = {
  args: { srcDoc: DEMO_DOC },
  render: (args) => (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{args.title}</span>
        <Button variant="ghost" size="icon-sm" aria-label="Close activity">
          <XIcon />
        </Button>
      </div>
      <ActivityViewer {...args} />
    </div>
  ),
}

const MESSAGE_DOC = `<body style='font-family:sans-serif;display:grid;place-items:center;height:100vh;margin:0'>
<button onclick="parent.postMessage({ type: 'sim-event', action: 'run_trial', angle: 30 }, '*')">Run trial</button>
</body>`

/** `onMessage` receives what the activity posts — only from its own frame. */
export const Messages: Story = {
  args: { srcDoc: MESSAGE_DOC, sandbox: "allow-scripts" },
  render: function MessagesStory(args) {
    const [last, setLast] = React.useState<unknown>()
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <ActivityViewer {...args} onMessage={(data) => setLast(data)} />
        <p className="text-xs text-muted-foreground">
          Last message: {last === undefined ? "none" : JSON.stringify(last)}
        </p>
      </div>
    )
  },
}

/** An activity native to the app fills the viewer and lays itself out. */
export const NativeActivity: Story = {
  args: { variant: "vidyamap", title: "VidyaMap" },
  render: (args) => (
    <ActivityViewer {...args}>
      <div className="flex flex-1 items-center justify-center rounded-card bg-muted text-sm text-muted-foreground">
        The app&apos;s own activity renders here
      </div>
    </ActivityViewer>
  ),
}
