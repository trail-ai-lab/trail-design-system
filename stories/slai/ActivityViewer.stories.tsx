import type { Meta, StoryObj } from "@storybook/react-vite"

import { ActivityViewer } from "@/components/slai/activity-viewer"

const DEMO_DOC =
  "<body style='font-family:sans-serif;display:grid;place-items:center;height:100vh;margin:0'><p>Embedded activity content</p></body>"

const meta: Meta<typeof ActivityViewer> = {
  title: "SLAI/ActivityViewer",
  component: ActivityViewer,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { title: "Inclined Plane", onClose: () => {} },
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
