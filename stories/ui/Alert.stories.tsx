import type { Meta, StoryObj } from "@storybook/nextjs"
import { Info, TriangleAlert } from "lucide-react"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert className="w-96">
      <Info />
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>Your session analysis is ready to review.</AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive" className="w-96">
      <TriangleAlert />
      <AlertTitle>Bias detected</AlertTitle>
      <AlertDescription>3 potential bias indicators were found in this transcript.</AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert className="w-96">
      <Info />
      <AlertTitle>New preset available</AlertTitle>
      <AlertDescription>The SLAI preset has been updated with new teal tokens.</AlertDescription>
      <AlertAction>
        <Button size="sm" variant="outline">Update now</Button>
      </AlertAction>
    </Alert>
  ),
}
