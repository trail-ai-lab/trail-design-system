import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs"
import { PlusIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SheetTrigger } from "@/components/ui/sheet"
import {
  ActivityPicker,
  ActivityPickerSheet,
  type SessionActivity,
} from "@/components/slai/activity-picker"

const ACTIVITIES: SessionActivity[] = [
  {
    id: "compost",
    name: "Compost",
    description:
      "Interactive composting simulation for environmental science discussions",
    tags: ["environmental-science"],
  },
  {
    id: "inclined-plane",
    name: "Inclined Plane",
    description:
      "Interactive inclined plane simulation exploring forces and motion on ramps",
    tags: ["physics"],
  },
  {
    id: "pulley",
    name: "Pulley",
    description:
      "Interactive pulley simulation exploring mechanical advantage and simple machines",
    tags: ["physics"],
  },
  {
    id: "roller-coaster",
    name: "Roller Coaster",
    description: "Interactive roller coaster simulation for physics discussions",
    tags: ["physics"],
  },
  {
    id: "vidyamap",
    name: "VidyaMap",
    description:
      "Interactive concept-map explorer for knowledge building across Biology, Forces and Motion, and Pulleys",
    tags: ["concept-map", "biology", "physics"],
  },
]

const meta: Meta<typeof ActivityPicker> = {
  title: "SLAI/ActivityPicker",
  component: ActivityPicker,
  tags: ["autodocs"],
  args: { activities: ACTIVITIES },
}

export default meta
type Story = StoryObj<typeof ActivityPicker>

export const Default: Story = {
  render: function Interactive(args) {
    const [value, setValue] = React.useState("none")
    return (
      <div className="w-full max-w-md">
        <ActivityPicker {...args} value={value} onValueChange={setValue} />
      </div>
    )
  },
}

export const WithSelection: Story = {
  render: (args) => (
    <div className="w-full max-w-md">
      <ActivityPicker {...args} value="pulley" />
    </div>
  ),
}

export const InSheet: Story = {
  render: function SheetStory(args) {
    const [value, setValue] = React.useState("none")
    return (
      <ActivityPickerSheet
        activities={args.activities}
        value={value}
        onValueChange={setValue}
      >
        <SheetTrigger asChild>
          <Button variant="outline">
            <PlusIcon data-icon="inline-start" />
            Add activity
          </Button>
        </SheetTrigger>
      </ActivityPickerSheet>
    )
  },
}
