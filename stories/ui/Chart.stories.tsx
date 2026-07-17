import type { Meta, StoryObj } from "@storybook/nextjs"
import { Bar, BarChart, CartesianGrid, Line, LineChart, XAxis } from "recharts"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartConfig: ChartConfig = {
  sarah: { label: "Sarah Chen", color: "var(--color-primary)" },
  marcus: { label: "Marcus Johnson", color: "var(--color-secondary)" },
  priya: { label: "Priya Patel", color: "var(--color-muted-foreground)" },
}

const data = [
  { segment: "Intro", sarah: 40, marcus: 20, priya: 10 },
  { segment: "Q1", sarah: 25, marcus: 35, priya: 15 },
  { segment: "Q2", sarah: 30, marcus: 15, priya: 40 },
  { segment: "Closing", sarah: 20, marcus: 25, priya: 20 },
]

const meta: Meta = {
  title: "UI/Chart",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const TalkTimeBar: Story = {
  render: () => (
    <ChartContainer config={chartConfig} className="h-64 w-full max-w-lg">
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="segment" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="sarah" fill="var(--color-primary)" radius={4} />
        <Bar dataKey="marcus" fill="var(--color-secondary)" radius={4} />
        <Bar dataKey="priya" fill="var(--color-muted-foreground)" radius={4} />
      </BarChart>
    </ChartContainer>
  ),
}

// A line chart with a legend — ChartLegendContent reads its labels/colors
// from the same ChartConfig as the bar chart above.
export const TalkTimeLine: Story = {
  render: () => (
    <ChartContainer config={chartConfig} className="h-64 w-full max-w-lg">
      <LineChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="segment" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line dataKey="sarah" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
        <Line dataKey="marcus" stroke="var(--color-secondary)" strokeWidth={2} dot={false} />
        <Line dataKey="priya" stroke="var(--color-muted-foreground)" strokeWidth={2} dot={false} />
      </LineChart>
    </ChartContainer>
  ),
}
