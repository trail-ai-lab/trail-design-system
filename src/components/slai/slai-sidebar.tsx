"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  ChevronRightIcon,
  EllipsisVerticalIcon,
  FileTextIcon,
  FolderIcon,
  MicIcon,
  MoreHorizontalIcon,
  PencilIcon,
  ShapesIcon,
  Trash2Icon,
  UploadIcon,
  UsersIcon,
} from "lucide-react"

import { Logo } from "@/components/trail"
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
  SidebarMenuSkeleton,
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

/** A saved source (quick recording or uploaded document). */
export interface SidebarSource {
  name: string
  /** Picks the row icon; defaults to audio */
  type?: "audio" | "pdf"
}

/** The row a Rename / Delete menu action was triggered on. */
export interface SidebarItemTarget {
  kind: "session" | "period" | "source"
  name: string
  /** For a period, the session folder it belongs to */
  parent?: string
}

/** A student listed in the sidebar's Students group. */
export interface SidebarStudent {
  id: string
  name: string
  /** Primary language, shown muted at the row's end, e.g. "Spanish" */
  language?: string
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
function RowMenu({
  trigger,
  onRename,
  onDelete,
}: {
  trigger: React.ReactNode
  onRename?: () => void
  onDelete?: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        <DropdownMenuItem onSelect={onRename}>
          <PencilIcon />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onSelect={onDelete}>
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
  students,
  activeStudent,
  defaultOpenSession,
  sessionsLoading = false,
  sourcesLoading = false,
  onRename,
  onDelete,
}: {
  sessions: SidebarSession[]
  /** Source names, or objects when a row needs a file-type icon */
  sources: Array<string | SidebarSource>
  user: SidebarUser
  /** Which primary nav item is highlighted. */
  activeNav?: SlaiNavId
  /** Name of the source (quick recording) currently being viewed. */
  activeSource?: string
  /** Students to list in a "Students" group (omit to hide the group) */
  students?: SidebarStudent[]
  /** Id of the student whose progress page is open */
  activeStudent?: string
  /** Name of the session folder expanded on first render. */
  defaultOpenSession?: string
  /** Show skeleton rows instead of the session tree */
  sessionsLoading?: boolean
  /** Show skeleton rows instead of the sources list */
  sourcesLoading?: boolean
  /** Rename menu item chosen; open your RenameDialog for `target` */
  onRename?: (target: SidebarItemTarget) => void
  /** Delete menu item chosen; open your DeleteConfirmDialog for `target` */
  onDelete?: (target: SidebarItemTarget) => void
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Logo className="h-5 text-foreground" />
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
            {sessionsLoading &&
              [0, 1, 2].map((i) => <SidebarMenuSkeleton key={i} showIcon />)}
            {!sessionsLoading && sessions.length === 0 && (
              <p className="px-2 py-1.5 text-xs text-sidebar-foreground/60">
                No sessions found
              </p>
            )}
            {!sessionsLoading && sessions.map((session) => (
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
                    onRename={() =>
                      onRename?.({ kind: "session", name: session.name })
                    }
                    onDelete={() =>
                      onDelete?.({ kind: "session", name: session.name })
                    }
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
                            onRename={() =>
                              onRename?.({
                                kind: "period",
                                name: period.name,
                                parent: session.name,
                              })
                            }
                            onDelete={() =>
                              onDelete?.({
                                kind: "period",
                                name: period.name,
                                parent: session.name,
                              })
                            }
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
            {sourcesLoading &&
              [0, 1].map((i) => <SidebarMenuSkeleton key={i} showIcon />)}
            {!sourcesLoading &&
              sources.map((entry) => {
                const source =
                  typeof entry === "string" ? { name: entry } : entry
                const SourceIcon =
                  source.type === "pdf" ? FileTextIcon : AudioLinesIcon
                return (
                  <SidebarMenuItem key={source.name}>
                    <SidebarMenuButton isActive={source.name === activeSource}>
                      <SourceIcon />
                      <span className="truncate">{source.name}</span>
                    </SidebarMenuButton>
                    <RowMenu
                      onRename={() =>
                        onRename?.({ kind: "source", name: source.name })
                      }
                      onDelete={() =>
                        onDelete?.({ kind: "source", name: source.name })
                      }
                      trigger={
                        <SidebarMenuAction
                          showOnHover
                          aria-label={`${source.name} options`}
                        >
                          <EllipsisVerticalIcon />
                        </SidebarMenuAction>
                      }
                    />
                  </SidebarMenuItem>
                )
              })}
          </SidebarMenu>
        </SidebarGroup>
        {students && students.length > 0 && (
          <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Students</SidebarGroupLabel>
            <SidebarMenu>
              {students.map((student) => (
                <SidebarMenuItem key={student.id}>
                  <SidebarMenuButton isActive={student.id === activeStudent}>
                    <span
                      aria-hidden
                      className={
                        student.id === activeStudent
                          ? "size-2 shrink-0 rounded-full bg-primary"
                          : "size-2 shrink-0 rounded-full bg-muted-foreground/40"
                      }
                    />
                    <span className="truncate">{student.name}</span>
                    {student.language && (
                      <span className="ml-auto shrink-0 text-xs text-muted-foreground">
                        {student.language}
                      </span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
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
