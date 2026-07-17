// REFERENCE ONLY - not used in any tool
// Source: ../trail-desing-system-cards/preview/cards/book-appointment.tsx
// Promote to stories/trail/ or stories/slai/ when adopting

import type { Meta, StoryObj } from "@storybook/nextjs"
import { BookAppointment } from "@/components/blocks/preview/cards/book-appointment"

const meta: Meta<typeof BookAppointment> = {
  title: "_Preview/Preview/BookAppointment",
  component: BookAppointment,
  parameters: { layout: "centered" },
}
export default meta

type Story = StoryObj<typeof BookAppointment>

export const Default: Story = {}
