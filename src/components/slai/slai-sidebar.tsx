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
  RadioIcon,
  ShapesIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react"

import { Logo } from "@/components/patterns/logo"
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

/** A class folder (e.g. "Physics") and the sessions held in it. */
export interface SidebarClass {
  name: string
  sessions: SidebarSession[]
}

/** One class meeting, e.g. "Period 3 — Aug 21". */
export interface SidebarSession {
  name: string
  /** Marks this session as the one currently being viewed. */
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
  kind: "class" | "session" | "source"
  name: string
  /** For a session, the class it belongs to */
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
  { id: "live", label: "Live", icon: RadioIcon },
  { id: "record", label: "Record audio", icon: MicIcon },
  { id: "source", label: "Add source", icon: UploadIcon },
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

/** Hover action trigger for a session sub-row (sub-rows use a different
 * group hook than SidebarMenuAction, so it gets its own positioned button). */
function SubRowAction({ label }: { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="absolute top-1 right-1 flex aspect-square w-5 items-center justify-center rounded-md text-sidebar-foreground opacity-0 outline-hidden transition-opacity group-focus-within/menu-sub-item:opacity-100 group-hover/menu-sub-item:opacity-100 after:absolute after:-inset-2 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-sidebar-ring aria-expanded:opacity-100 md:after:hidden [&>svg]:size-4 [&>svg]:shrink-0"
    >
      <EllipsisVerticalIcon />
    </button>
  )
}

/**
 * The SLAI app sidebar: brand header, primary nav ("Live" for the in-class
 * view), the Sessions tree (classes → past sessions, opening a session's
 * review), the saved sources list, and the signed-in user footer.
 *
 * Shared by every SLAI page (live session, session review, new session)
 * so the navigation never drifts between them — pass page-specific data and
 * active state through props rather than forking the markup.
 */
function SlaiSidebar({
  classes,
  sources,
  user,
  activeNav,
  liveSessionActive = false,
  activeSource,
  students,
  activeStudent,
  defaultOpenClass,
  sessionsLoading = false,
  sourcesLoading = false,
  onRename,
  onDelete,
}: {
  /** Classes, each holding its past sessions */
  classes: SidebarClass[]
  /** Source names, or objects when a row needs a file-type icon */
  sources: Array<string | SidebarSource>
  user: SidebarUser
  /** Which primary nav item is highlighted. */
  activeNav?: SlaiNavId
  /** A session is running now: shows a pulsing dot on the Live nav item */
  liveSessionActive?: boolean
  /** Name of the source (quick recording) currently being viewed. */
  activeSource?: string
  /** Students to list in a "Students" group (omit to hide the group) */
  students?: SidebarStudent[]
  /** Id of the student whose progress page is open */
  activeStudent?: string
  /** Name of the class folder expanded on first render. */
  defaultOpenClass?: string
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
                  {item.id === "live" && liveSessionActive && (
                    <span className="ml-auto flex items-center gap-1.5 text-xs text-status-recording">
                      <span
                        aria-hidden
                        className="size-1.5 animate-pulse rounded-full bg-status-recording"
                      />
                      Now
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Sessions</SidebarGroupLabel>
          <SidebarMenu>
            {sessionsLoading &&
              [0, 1, 2].map((i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            {!sessionsLoading && classes.length === 0 && (
              <SidebarMenuItem>
                <p className="px-2 py-1.5 text-xs text-muted-foreground">
                  No sessions yet
                </p>
              </SidebarMenuItem>
            )}
            {!sessionsLoading &&
              classes.map((klass) => (
                <Collapsible
                  key={klass.name}
                  defaultOpen={klass.name === defaultOpenClass}
                  className="group/collapsible"
                  asChild
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <ChevronRightIcon className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        <FolderIcon />
                        <span className="truncate">{klass.name}</span>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <RowMenu
                      onRename={() =>
                        onRename?.({ kind: "class", name: klass.name })
                      }
                      onDelete={() =>
                        onDelete?.({ kind: "class", name: klass.name })
                      }
                      trigger={
                        <SidebarMenuAction
                          showOnHover
                          aria-label={`${klass.name} options`}
                        >
                          <EllipsisVerticalIcon />
                        </SidebarMenuAction>
                      }
                    />
                    <CollapsibleContent>
                      <SidebarMenuSub className="mr-0 pr-0">
                        {klass.sessions.map((session) => (
                          <SidebarMenuSubItem key={session.name}>
                            <SidebarMenuSubButton
                              isActive={session.active}
                              className="pr-7"
                            >
                              <span className="truncate">{session.name}</span>
                            </SidebarMenuSubButton>
                            <RowMenu
                              onRename={() =>
                                onRename?.({
                                  kind: "session",
                                  name: session.name,
                                  parent: klass.name,
                                })
                              }
                              onDelete={() =>
                                onDelete?.({
                                  kind: "session",
                                  name: session.name,
                                  parent: klass.name,
                                })
                              }
                              trigger={
                                <SubRowAction
                                  label={`${session.name} options`}
                                />
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
              [0, 1].map((i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            {!sourcesLoading && sources.length === 0 && (
              <SidebarMenuItem>
                <p className="px-2 py-1.5 text-xs text-muted-foreground">
                  No sources yet
                </p>
              </SidebarMenuItem>
            )}
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
