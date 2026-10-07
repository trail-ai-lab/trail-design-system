import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
import { CalendarIcon, MicIcon, SettingsIcon, UsersIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const meta: Meta<typeof Command> = {
  title: "UI/Command",
  component: Command,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Command>

export const Default: Story = {
  render: () => (
    <Command className="w-80 rounded-2xl border border-border shadow-md">
      <CommandInput placeholder="Search…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Sessions">
          <CommandItem>
            <MicIcon /> Record audio
          </CommandItem>
          <CommandItem>
            <UsersIcon /> Groups
            <CommandShortcut>⌘G</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CalendarIcon /> Schedule
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <SettingsIcon /> Preferences
            <CommandShortcut>⌘,</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
}

export const Dialog: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false)
    return (
      <>
        <Button variant="outline" onClick={() => setOpen(true)}>
          Open command palette
        </Button>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Record audio</CommandItem>
              <CommandItem>Add source</CommandItem>
              <CommandItem>Activities</CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
    )
  },
}
