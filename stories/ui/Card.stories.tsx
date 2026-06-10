import type { Meta, StoryObj } from "@storybook/nextjs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Card>

export const Basic: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>A short description of the card content.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This is the main content area of the card. You can place any content here.
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">Footer text</p>
      </CardFooter>
    </Card>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Speaker session</CardTitle>
          <Badge>Live</Badge>
        </div>
        <CardDescription>Main stage • 45 min</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          A deep dive into designing for accessibility in modern web applications.
        </p>
      </CardContent>
    </Card>
  ),
}

export const WithActions: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Bias audit report</CardTitle>
        <CardDescription>Generated on Jun 10, 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          3 potential bias indicators found. Review the flagged segments below.
        </p>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button size="sm">View report</Button>
        <Button size="sm" variant="outline">Dismiss</Button>
      </CardFooter>
    </Card>
  ),
}
