import type { Meta, StoryObj } from "@storybook/react-vite"
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
    <div className="flex w-72 flex-col gap-4">
      <Field>
        <FieldLabel>Session name</FieldLabel>
        <FieldDescription>
          A short identifier for this recording.
        </FieldDescription>
        <Input placeholder="e.g. Town Hall Q2" />
      </Field>
    </div>
  ),
}

export const WithError: Story = {
  render: () => (
    <div className="w-72">
      <Field>
        <FieldLabel htmlFor="field-email-invalid">Email</FieldLabel>
        <Input
          id="field-email-invalid"
          aria-invalid="true"
          defaultValue="not-an-email"
        />
        <FieldError>Please enter a valid email address.</FieldError>
      </Field>
    </div>
  ),
}

export const Horizontal: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-4">
      <Field orientation="horizontal">
        <FieldGroup>
          <FieldLabel htmlFor="field-bias-scanning">
            Enable bias scanning
          </FieldLabel>
          <FieldDescription>
            Automatically flag potential bias in transcripts.
          </FieldDescription>
        </FieldGroup>
        <Switch id="field-bias-scanning" />
      </Field>
    </div>
  ),
}
