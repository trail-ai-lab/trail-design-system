import type { Meta, StoryObj } from "@storybook/nextjs"
import { ChevronRight, Mic } from "lucide-react"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@/components/ui/item"
import { Badge } from "@/components/ui/badge"

const meta: Meta = {
  title: "UI/Item",
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <div className="w-80 rounded-xl border border-border">
      <Item>
        <ItemMedia>
          <Mic className="size-4 text-muted-foreground" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Town Hall Q2</ItemTitle>
          <ItemDescription>Jun 10, 2026 · 47 min</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ChevronRight className="size-4 text-muted-foreground" />
        </ItemActions>
      </Item>
    </div>
  ),
}

export const List: Story = {
  render: () => (
    <div className="w-80 rounded-xl border border-border divide-y divide-border">
      {[
        { title: "Town Hall Q2", desc: "Jun 10, 2026 · 47 min", badge: "Live" },
        { title: "Bias Review", desc: "Jun 8, 2026 · 32 min", badge: null },
        { title: "Casting Call", desc: "Jun 5, 2026 · 61 min", badge: null },
      ].map(({ title, desc, badge }) => (
        <Item key={title}>
          <ItemMedia>
            <Mic className="size-4 text-muted-foreground" />
          </ItemMedia>
          <ItemContent>
            <ItemTitle>{title}</ItemTitle>
            <ItemDescription>{desc}</ItemDescription>
          </ItemContent>
          {badge && (
            <ItemActions>
              <Badge>{badge}</Badge>
            </ItemActions>
          )}
        </Item>
      ))}
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-2 w-80">
      <Item variant="default">
        <ItemContent><ItemTitle>Default</ItemTitle></ItemContent>
      </Item>
      <Item variant="outline">
        <ItemContent><ItemTitle>Outline</ItemTitle></ItemContent>
      </Item>
      <Item variant="muted">
        <ItemContent><ItemTitle>Muted</ItemTitle></ItemContent>
      </Item>
    </div>
  ),
}

export const WithGroup: Story = {
  render: () => (
    <ItemGroup className="w-80">
      <Item>
        <ItemContent><ItemTitle>Session A</ItemTitle></ItemContent>
      </Item>
      <ItemSeparator />
      <Item>
        <ItemContent><ItemTitle>Session B</ItemTitle></ItemContent>
      </Item>
    </ItemGroup>
  ),
}
