import type { Meta, StoryObj } from "@storybook/nextjs"
import { Download, Settings, Trash2, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

const meta: Meta = {
  title: "UI/DropdownMenu",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Session report</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Download />Export PDF
        </DropdownMenuItem>
        <DropdownMenuItem>
          <User />Assign reviewer
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />Delete report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
