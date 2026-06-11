import type { Meta, StoryObj } from "@storybook/nextjs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  args: { placeholder: "Add a note about this session…" },
}

export const Disabled: Story = {
  args: { placeholder: "Disabled textarea", disabled: true },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="notes">Session notes</Label>
      <Textarea id="notes" placeholder="Add observations about speaker patterns…" rows={4} />
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="flex flex-col gap-1.5 w-72">
      <Label htmlFor="notes-err">Notes</Label>
      <Textarea id="notes-err" aria-invalid="true" defaultValue="x" />
      <p className="text-xs text-destructive">Notes must be at least 10 characters.</p>
    </div>
  ),
}
