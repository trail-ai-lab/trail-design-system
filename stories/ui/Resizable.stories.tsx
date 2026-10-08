import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

// a11y: scrollable-region-focusable disabled. Upstream: react-resizable-panels' panel scroll containers aren't keyboard-focusable.
const A11Y = {
  config: {
    rules: [{ id: "scrollable-region-focusable", enabled: false }],
  },
}

const meta: Meta<typeof ResizablePanelGroup> = {
  title: "UI/Resizable",
  parameters: { a11y: A11Y },
  component: ResizablePanelGroup,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ResizablePanelGroup>

const Pane = ({ label }: { label: string }) => (
  <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
    {label}
  </div>
)

export const Horizontal: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-64 w-full max-w-2xl rounded-2xl border border-border"
    >
      <ResizablePanel defaultSize={65} minSize={30}>
        <Pane label="Primary" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={35} minSize={20}>
        <Pane label="Secondary" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Vertical: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="vertical"
      className="h-80 w-full max-w-md rounded-2xl border border-border"
    >
      <ResizablePanel defaultSize={50}>
        <Pane label="Top" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <Pane label="Bottom" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}

export const Nested: Story = {
  render: () => (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-72 w-full max-w-2xl rounded-2xl border border-border"
    >
      <ResizablePanel defaultSize={40}>
        <Pane label="Sidebar" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <ResizablePanelGroup orientation="vertical">
          <ResizablePanel defaultSize={60}>
            <Pane label="Content" />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={40}>
            <Pane label="Footer" />
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
}
