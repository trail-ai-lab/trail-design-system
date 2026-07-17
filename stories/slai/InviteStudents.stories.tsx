import type { Meta, StoryObj } from "@storybook/nextjs"
import { QrCodeIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"
import {
  InvitePanel,
  InviteStudentsSheet,
} from "@/components/slai/invite-students-sheet"

const JOIN_URL = "https://trail.wcer.wisc.edu/slai/student-view?token=mn1pCSGtJnd0ZWC0"

const meta: Meta<typeof InvitePanel> = {
  title: "SLAI/InviteStudents",
  component: InvitePanel,
  tags: ["autodocs"],
  args: { joinUrl: JOIN_URL },
}

export default meta
type Story = StoryObj<typeof InvitePanel>

export const Panel: Story = {
  render: (args) => (
    <div className="w-full max-w-sm">
      <InvitePanel {...args} onGenerateNewLink={() => {}} />
    </div>
  ),
}

export const InSheet: Story = {
  render: () => (
    <InviteStudentsSheet joinUrl={JOIN_URL} onGenerateNewLink={() => {}}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <QrCodeIcon data-icon="inline-start" />
          Invite students
        </Button>
      </SheetTrigger>
    </InviteStudentsSheet>
  ),
}
