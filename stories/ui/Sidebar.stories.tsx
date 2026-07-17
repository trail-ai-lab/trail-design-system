import type { Meta, StoryObj } from "@storybook/nextjs"
import { BarChart2, ChevronRight, Home, Plus, Settings, Users } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

const meta: Meta = {
  title: "UI/Sidebar",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
}
export default meta
type Story = StoryObj

export const Default: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="px-2 py-1.5 text-sm font-semibold">Trail Lab</div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home />Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton isActive>
                    <BarChart2 />SLAI
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Users />Casting Lab
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <Settings />Settings
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <main className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-lg font-semibold">Session overview</h1>
          </div>
          <p className="text-sm text-muted-foreground">Main content area.</p>
        </main>
      </div>
    </SidebarProvider>
  ),
}

// SidebarMenuSkeleton stands in for nav items while their labels/counts are
// still loading — showIcon reserves space for the icon that'll appear once
// real data arrives, so the layout doesn't shift.
export const Loading: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Tools</SidebarGroupLabel>
              <SidebarMenu>
                {Array.from({ length: 4 }, (_, i) => (
                  <SidebarMenuItem key={i}>
                    <SidebarMenuSkeleton showIcon />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex flex-1 items-center gap-2 p-6">
          <SidebarTrigger />
        </main>
      </div>
    </SidebarProvider>
  ),
}

// Nested destinations (e.g. a class's periods) render inside
// SidebarMenuSub, indented and connected by a rail, below the parent item.
export const WithSubmenu: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Classes</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Home />Period 3 Physics
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#" isActive>
                        Sep 12 — Ramps
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#">
                        Sep 10 — Pendulums
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton href="#" size="sm">
                        Sep 8 — Intro
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <BarChart2 />Period 5 Chemistry
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex flex-1 items-center gap-2 p-6">
          <SidebarTrigger />
        </main>
      </div>
    </SidebarProvider>
  ),
}

// SidebarMenuAction is a small icon button anchored to the item's edge (e.g.
// "add"); SidebarMenuBadge is a passive count anchored the same way. Both
// hide automatically in collapsed/icon mode.
export const WithActionsAndBadges: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Groups</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Users />Group 1
                  </SidebarMenuButton>
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Users />Group 2
                  </SidebarMenuButton>
                  <SidebarMenuAction title="Add student">
                    <Plus />
                  </SidebarMenuAction>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex flex-1 items-center gap-2 p-6">
          <SidebarTrigger />
        </main>
      </div>
    </SidebarProvider>
  ),
}

// The "outline" variant adds a hairline border — used sparingly, e.g. to set
// a specific destination apart from the rest of the menu.
export const OutlineVariant: Story = {
  render: () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="outline">
                    <Home />Dashboard
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton variant="outline" isActive>
                    <ChevronRight />New tool
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <main className="flex flex-1 items-center gap-2 p-6">
          <SidebarTrigger />
        </main>
      </div>
    </SidebarProvider>
  ),
}

// collapsible="icon" shrinks the rail to icon-only width instead of hiding
// it entirely (the default "offcanvas" behavior). SidebarRail adds a
// drag-to-resize/click-to-toggle handle at the sidebar's edge — hover the
// thin strip just past the icons to see it. SidebarMenuButton's `tooltip`
// prop renders a real Tooltip (shown once collapsed, since labels are
// hidden), which needs a TooltipProvider ancestor — nothing in the app
// currently supplies one, so this prop is untested outside this story.
export const CollapsedIcon: Story = {
  render: () => (
    <TooltipProvider>
      <SidebarProvider defaultOpen={false}>
        <div className="flex min-h-screen w-full">
          <Sidebar collapsible="icon">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Tools</SidebarGroupLabel>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Dashboard">
                      <Home />Dashboard
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="SLAI" isActive>
                      <BarChart2 />SLAI
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Casting Lab">
                      <Users />Casting Lab
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
          </Sidebar>
          <main className="flex flex-1 flex-col gap-4 p-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h1 className="text-lg font-semibold">Session overview</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Click the trigger (or the rail at the sidebar's edge) to expand.
            </p>
          </main>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  ),
}
