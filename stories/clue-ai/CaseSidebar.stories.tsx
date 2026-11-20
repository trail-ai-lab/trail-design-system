import type { Meta, StoryObj } from "@storybook/react-vite"

import { SidebarProvider } from "@/components/ui/sidebar"
import { CasePageSidebar } from "./_case-fixtures"

const meta: Meta<typeof CasePageSidebar> = {
  title: "ClueAI/CaseSidebar",
  component: CasePageSidebar,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <SidebarProvider>
        <Story />
      </SidebarProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof CasePageSidebar>

export const FirstLead: Story = {
  args: {
    activeNav: "suspects",
    board: {
      flora: "required",
      eddie: "locked",
      ferris: "locked",
      cecilia: "locked",
    },
  },
}

export const Investigating: Story = {
  args: { activeSuspect: "eddie" },
}

export const FinalCall: Story = {
  args: {
    activeNav: "final-call",
    board: {
      flora: "completed",
      eddie: "completed",
      ferris: "available",
      cecilia: "completed",
    },
  },
}
