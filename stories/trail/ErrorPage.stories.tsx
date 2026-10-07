import type { Meta, StoryObj } from "@storybook/nextjs"

import { ErrorPage } from "@/components/trail/error-page"

const meta: Meta<typeof ErrorPage> = {
  title: "Trail/ErrorPage",
  component: ErrorPage,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { onRetry: () => {} },
}

export default meta
type Story = StoryObj<typeof ErrorPage>

export const Default: Story = {}

/** A failed code-split load after a deploy: asks for a reload. */
export const ChunkLoad: Story = { args: { variant: "chunk" } }

export const NoAction: Story = { args: { onRetry: undefined } }
