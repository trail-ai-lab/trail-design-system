import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

const meta: Meta = {
  title: "UI/Field",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const Vertical: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-72">
      <Field>
        <FieldLabel>Session name</FieldLabel>
        <FieldDescription>A short identifier for this recording.</FieldDescription>
        <Input placeholder="e.g. Town Hall Q2" />
      </Field>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-72">
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input aria-invalid="true" defaultValue="not-an-email" />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Field orientation="horizontal">
        <FieldGroup>
          <FieldLabel>Enable bias scanning</FieldLabel>
          <FieldDescription>Automatically flag potential bias in transcripts.</FieldDescription>
        </FieldGroup>
        <Switch />
      </Field>
    </div>
  ),
}
