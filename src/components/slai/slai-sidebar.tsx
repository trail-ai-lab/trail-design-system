"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  FolderIcon,
  MicIcon,
  MountainIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShapesIcon,
  Trash2Icon,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
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
 * Rename / delete dropdown shared by session and source rows. The `trigger`
 * is the row's hover action button (a SidebarMenuAction for top-level rows or
 * a positioned button for sub-rows).
 */
function RowMenu({ trigger }: { trigger: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem>
          <PencilIcon />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive">
          <Trash2Icon />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Hover action trigger for a session sub-row (periods use a different
 * group hook than SidebarMenuAction, so it gets its own positioned button). */
function SubRowAction({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="absolute top-1 right-1 flex aspect-square w-5 items-center justify-center rounded-md text-sidebar-foreground opacity-0 outline-hidden transition-opacity group-focus-within/menu-sub-item:opacity-100 group-hover/menu-sub-item:opacity-100 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-sidebar-ring aria-expanded:opacity-100 [&>svg]:size-4 [&>svg]:shrink-0"
    >
      <EllipsisVerticalIcon />
    </button>
  )
}

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
                      <span className="truncate">{session.name}</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <RowMenu
                    trigger={
                      <SidebarMenuAction
                        showOnHover
                        aria-label={`${session.name} options`}
                      >
                        <EllipsisVerticalIcon />
                      </SidebarMenuAction>
                    }
                  />
                  <CollapsibleContent>
                    <SidebarMenuSub className="mr-0 pr-0">
                      {session.periods.map((period) => (
                        <SidebarMenuSubItem key={period.name}>
                          <SidebarMenuSubButton
                            isActive={period.active}
                            className="pr-7"
                          >
                            <span className="truncate">{period.name}</span>
                          </SidebarMenuSubButton>
                          <RowMenu
                            trigger={
                              <SubRowAction label={`${period.name} options`} />
                            }
                          />
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
                <RowMenu
                  trigger={
                    <SidebarMenuAction showOnHover aria-label={`${source} options`}>
                      <EllipsisVerticalIcon />
                    </SidebarMenuAction>
                  }
                />
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
