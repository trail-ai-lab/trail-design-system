import type { Meta, StoryObj } from "@storybook/nextjs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
}
export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="speakers">Speakers</TabsTrigger>
        <TabsTrigger value="flags">Flags</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4 text-sm text-muted-foreground">
        Session overview content here.
      </TabsContent>
      <TabsContent value="speakers" className="mt-4 text-sm text-muted-foreground">
        Speaker participation breakdown here.
      </TabsContent>
      <TabsContent value="flags" className="mt-4 text-sm text-muted-foreground">
        Bias flags and indicators here.
      </TabsContent>
    </Tabs>
  ),
}

export const LineVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-96">
      <TabsList variant="line">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="speakers">Speakers</TabsTrigger>
        <TabsTrigger value="flags">Flags</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-4 text-sm text-muted-foreground">
        Session overview content.
      </TabsContent>
      <TabsContent value="speakers" className="mt-4 text-sm text-muted-foreground">
        Speaker details.
      </TabsContent>
      <TabsContent value="flags" className="mt-4 text-sm text-muted-foreground">
        Flags.
      </TabsContent>
    </Tabs>
  ),
}
