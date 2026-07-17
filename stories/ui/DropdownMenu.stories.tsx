import type { Meta, StoryObj } from "@storybook/nextjs"
import * as React from "react"
import { Download, Languages, Settings, Trash2, User } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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

// CheckboxItem toggles independently; RadioItems within a RadioGroup are
// mutually exclusive. Both need controlled state to actually check/toggle.
export const WithCheckboxAndRadio: Story = {
  render: function Render() {
    const [showTimestamps, setShowTimestamps] = React.useState(true)
    const [view, setView] = React.useState("grid")
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">View options</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-52">
          <DropdownMenuLabel>Display</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showTimestamps}
            onCheckedChange={setShowTimestamps}
          >
            Show timestamps
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>Layout</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={view} onValueChange={setView}>
            <DropdownMenuRadioItem value="grid">Grid</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  },
}

// DropdownMenuSub nests a second menu, opened via hover/click on its
// SubTrigger — useful for a "more options" branch off the main list.
export const WithSubmenu: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-52">
        <DropdownMenuItem>
          <Download />Export PDF
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Languages />Translate
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Spanish</DropdownMenuItem>
            <DropdownMenuItem>Marathi</DropdownMenuItem>
            <DropdownMenuItem>Mandarin</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <Trash2 />Delete report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
