// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview-02/cards/notification-settings.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { NotificationSettings } from "@/components/blocks/preview-02/cards/notification-settings"

const meta: Meta<typeof NotificationSettings> = {
  title: "_Preview/Preview-02/NotificationSettings",
  component: NotificationSettings,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof NotificationSettings>

export const Default: Story = {}
