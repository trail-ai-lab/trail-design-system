import type { Meta, StoryObj } from "@storybook/react-vite"

import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"

const meta: Meta<typeof PageBreadcrumb> = {
  title: "Patterns/PageBreadcrumb",
  component: PageBreadcrumb,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof PageBreadcrumb>

/** A top-level page: one item, shown as the current page. */
export const SingleLevel: Story = {
  args: { items: [{ label: "Activities" }] },
}

export const TwoLevels: Story = {
  args: { items: [{ label: "Physics" }, { label: "Period 3 — Aug 21" }] },
}

/** Ancestors with `href` render as links. */
export const WithLinks: Story = {
  args: {
    items: [
      { label: "Physics", href: "#" },
      { label: "Group 1", href: "#" },
      { label: "Recording" },
    ],
  },
}
