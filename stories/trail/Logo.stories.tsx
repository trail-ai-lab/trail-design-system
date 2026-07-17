import type { Meta, StoryObj } from "@storybook/nextjs"

import { Logo } from "@/components/trail"

const meta: Meta<typeof Logo> = {
  title: "Trail/Logo",
  component: Logo,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}
export default meta

type Story = StoryObj<typeof Logo>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Logo className="h-4 text-foreground" />
      <Logo className="h-6 text-foreground" />
      <Logo className="h-8 text-foreground" />
      <Logo className="h-12 text-foreground" />
    </div>
  ),
}

/** The mark takes `currentColor`, so it follows any semantic text token. */
export const ColorTokens: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <Logo className="h-10 text-foreground" />
      <Logo className="h-10 text-primary" />
      <Logo className="h-10 text-muted-foreground" />
      <div className="rounded-md bg-primary p-3">
        <Logo className="h-10 text-primary-foreground" />
      </div>
    </div>
  ),
}

/** Typical lockup: mark next to the wordmark, as used in Header. */
export const Lockup: Story = {
  render: () => (
    <div className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-foreground">
      <Logo className="h-7 text-primary" />
      TRAIL Lab
    </div>
  ),
}
