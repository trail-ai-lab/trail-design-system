"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  ChevronRightIcon,
  FolderIcon,
  MicIcon,
  MountainIcon,
  MoreHorizontalIcon,
  ShapesIcon,
  UploadIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

/** A class/session folder and the periods (sub-sessions) inside it. */
export interface SidebarSession {
  name: string
  periods: SidebarPeriod[]
}

export interface SidebarPeriod {
  name: string
  /** Member/source count shown as a trailing badge. Omit to hide the badge. */
  count?: number
  /** Marks this period as the one currently being viewed. */
  active?: boolean
}

export interface SidebarUser {
  name: string
  email: string
  /** Avatar fallback initials, e.g. "AM". */
  initials: string
}

/** Top-level navigation items. `id` is matched against `activeNav`. */
const NAV_ITEMS = [
  { id: "manage", label: "Manage Session", icon: UsersIcon },
  { id: "record", label: "Record Audio", icon: MicIcon },
  { id: "source", label: "Add Source", icon: UploadIcon },
  { id: "activities", label: "Activities", icon: ShapesIcon },
] as const

export type SlaiNavId = (typeof NAV_ITEMS)[number]["id"]

/**
 * The SLAI app sidebar: brand header, primary nav, the class/session tree,
 * the saved sources list, and the signed-in user footer.
 *
 * Shared by every SLAI page (live session, post-session review, new session)
 * so the navigation never drifts between them — pass page-specific data and
 * active state through props rather than forking the markup.
 */
function SlaiSidebar({
  sessions,
  sources,
  user,
  activeNav,
  activeSource,
  defaultOpenSession,
}: {
  sessions: SidebarSession[]
  sources: string[]
  user: SidebarUser
  /** Which primary nav item is highlighted. */
  activeNav?: SlaiNavId
  /** Name of the source (quick recording) currently being viewed. */
  activeSource?: string
  /** Name of the session folder expanded on first render. */
  defaultOpenSession?: string
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <MountainIcon className="size-5 text-primary" />
          <span className="font-heading text-sm font-semibold">SLAI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => (
              <SidebarMenuItem key={item.id}>
                <SidebarMenuButton isActive={item.id === activeNav}>
                  <item.icon />
                  {item.label}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sessions</SidebarGroupLabel>
          <SidebarMenu>
            {sessions.map((session) => (
              <Collapsible
                key={session.name}
                defaultOpen={session.name === defaultOpenSession}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <ChevronRightIcon className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      <FolderIcon />
                      {session.name}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {session.periods.map((period) => (
                        <SidebarMenuSubItem key={period.name}>
                          <SidebarMenuSubButton isActive={period.active}>
                            {period.name}
                          </SidebarMenuSubButton>
                          {period.count != null && (
                            <SidebarMenuBadge>{period.count}</SidebarMenuBadge>
                          )}
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sources</SidebarGroupLabel>
          <SidebarMenu>
            {sources.map((source) => (
              <SidebarMenuItem key={source}>
                <SidebarMenuButton isActive={source === activeSource}>
                  <AudioLinesIcon />
                  <span className="truncate">{source}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar className="size-7">
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Account menu">
            <MoreHorizontalIcon />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export { SlaiSidebar }
