import type { Meta, StoryObj } from "@storybook/react-vite"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

const meta: Meta<typeof Drawer> = {
  title: "UI/Drawer",
  component: Drawer,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Drawer>

/** A bottom sheet for mobile; use Sheet for side panels on larger screens. */
export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Leave the session?</DrawerTitle>
          <DrawerDescription>
            Your recording so far is saved for your teacher.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Stay</Button>
          <DrawerClose asChild>
            <Button variant="outline">Leave</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ),
}
