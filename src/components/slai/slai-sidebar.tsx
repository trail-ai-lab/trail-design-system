"use client"

import * as React from "react"
import {
  AudioLinesIcon,
  ChevronRightIcon,
  DownloadIcon,
  EllipsisVerticalIcon,
  FileTextIcon,
  FolderIcon,
  LogOutIcon,
  MicIcon,
  MoreHorizontalIcon,
  PencilIcon,
  RadioIcon,
  ShapesIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react"

import { AppLink } from "@/components/patterns/link-provider"
import { Logo } from "@/components/patterns/logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  DropdownMenuSeparator,
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
  /** Stable id, reported back in `SidebarItemTarget`; falls back to `name` */
  id?: string
  name: string
  sessions: SidebarSession[]
}

/** One class meeting, e.g. "Period 3 — Aug 21". */
export interface SidebarSession {
  /** Stable id, reported back in `SidebarItemTarget`; falls back to `name` */
  id?: string
  name: string
  /** Opens the session review; the row is a link when set */
  href?: string
  /** Marks this session as the one currently being viewed. */
  active?: boolean
}

/** A saved source (quick recording or uploaded document). */
export interface SidebarSource {
  /** Stable id, reported back in `SidebarItemTarget`; falls back to `name` */
  id?: string
  name: string
  /** Opens the source; the row is a link when set */
  href?: string
  /** Picks the row icon; defaults to audio */
  type?: "audio" | "pdf"
}

/** The row a Rename / Delete menu action was triggered on. */
export interface SidebarItemTarget {
  kind: "class" | "session" | "source"
  /** The row's `id`, when the row has one */
  id?: string
  name: string
  /** For a session, the name of the class it belongs to */
  parent?: string
  /** For a session, the `id` of the class it belongs to */
  parentId?: string
}

/** A student listed in the sidebar's Students group. */
export interface SidebarStudent {
  id: string
  name: string
  /** Primary language, shown muted at the row's end, e.g. "Spanish" */
  language?: string
  /** Opens the student's progress page; the row is a link when set */
  href?: string
}

export interface SidebarUser {
  name: string
  email: string
  /** Avatar fallback initials, e.g. "AM". */
  initials: string
  /** Profile photo; the initials show while it loads or when it's missing */
  avatarUrl?: string
}

/** Top-level navigation items. `id` is matched against `activeNav`. */
const NAV_ITEMS = [
  { id: "live", label: "Live session", icon: RadioIcon },
  { id: "record", label: "Quick record", icon: MicIcon },
  { id: "source", label: "Add source", icon: UploadIcon },
  { id: "activities", label: "Activities", icon: ShapesIcon },
] as const

export type SlaiNavId = (typeof NAV_ITEMS)[number]["id"]

/**
 * Row actions dropdown shared by class, session and source rows: optional
 * Download, then Rename, then Delete set apart at the end. The `trigger` is
 * the row's hover action button (a SidebarMenuAction for top-level rows or a
 * positioned button for sub-rows).
 */
function RowMenu({
  trigger,
  onDownload,
  onRename,
  onDelete,
}: {
  trigger: React.ReactNode
  /** Shows a Download item when set */
  onDownload?: () => void
  onRename?: () => void
  onDelete?: () => void
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent side="right" align="start">
        {onDownload && (
          <DropdownMenuItem onSelect={onDownload}>
            <DownloadIcon />
            Download
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onSelect={onRename}>
          <PencilIcon />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
 * The SLAI app sidebar: brand header, primary nav ("Live session" for the in-class
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
  navHrefs,
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
  onDownload,
  onLogout,
}: {
  /** Classes, each holding its past sessions */
  classes: SidebarClass[]
  /** Source names, or objects when a row needs a file-type icon */
  sources: Array<string | SidebarSource>
  user: SidebarUser
  /** Where each primary nav item links to; an item without an href renders as a button */
  navHrefs?: Partial<Record<SlaiNavId, string>>
  /** Which primary nav item is highlighted. */
  activeNav?: SlaiNavId
  /** A session is running: shows a pulsing "Running" marker on the Live session nav item */
  liveSessionActive?: boolean
  /** Id (or name) of the source (quick recording) currently being viewed. */
  activeSource?: string
  /** Students to list in a "Students" group (omit to hide the group) */
  students?: SidebarStudent[]
  /** Id of the student whose progress page is open */
  activeStudent?: string
  /** Id (or name) of the class folder expanded on first render. */
  defaultOpenClass?: string
  /** Show skeleton rows instead of the session tree */
  sessionsLoading?: boolean
  /** Show skeleton rows instead of the sources list */
  sourcesLoading?: boolean
  /** Rename menu item chosen; open your RenameDialog for `target` */
  onRename?: (target: SidebarItemTarget) => void
  /** Delete menu item chosen; open your DeleteConfirmDialog for `target` */
  onDelete?: (target: SidebarItemTarget) => void
  /** Adds a Download item to source rows' menu */
  onDownload?: (target: SidebarItemTarget) => void
  /** Adds an account menu with "Log out" to the user footer */
  onLogout?: () => void
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
            {NAV_ITEMS.map((item) => {
              const href = navHrefs?.[item.id]
              const content = (
                <>
                  <item.icon />
                  {item.label}
                  {item.id === "live" && liveSessionActive && (
                    <span className="ml-auto flex items-center gap-1.5 text-xs text-status-recording">
                      <span
                        aria-hidden
                        className="size-1.5 animate-pulse rounded-full bg-status-recording"
                      />
                      Running
                    </span>
                  )}
                </>
              )
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={item.id === activeNav}
                    asChild={href !== undefined}
                  >
                    {href !== undefined ? (
                      <AppLink href={href}>{content}</AppLink>
                    ) : (
                      content
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
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
                  key={klass.id ?? klass.name}
                  defaultOpen={
                    defaultOpenClass !== undefined &&
                    (klass.id === defaultOpenClass ||
                      klass.name === defaultOpenClass)
                  }
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
                        onRename?.({
                          kind: "class",
                          id: klass.id,
                          name: klass.name,
                        })
                      }
                      onDelete={() =>
                        onDelete?.({
                          kind: "class",
                          id: klass.id,
                          name: klass.name,
                        })
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
                        {klass.sessions.map((session) => {
                          const target: SidebarItemTarget = {
                            kind: "session",
                            id: session.id,
                            name: session.name,
                            parent: klass.name,
                            parentId: klass.id,
                          }
                          const label = (
                            <span className="truncate">{session.name}</span>
                          )
                          return (
                            <SidebarMenuSubItem
                              key={session.id ?? session.name}
                            >
                              <SidebarMenuSubButton
                                isActive={session.active}
                                className="pr-7"
                                asChild={session.href !== undefined}
                              >
                                {session.href !== undefined ? (
                                  <AppLink href={session.href}>{label}</AppLink>
                                ) : (
                                  label
                                )}
                              </SidebarMenuSubButton>
                              <RowMenu
                                onRename={() => onRename?.(target)}
                                onDelete={() => onDelete?.(target)}
                                trigger={
                                  <SubRowAction
                                    label={`${session.name} options`}
                                  />
                                }
                              />
                            </SidebarMenuSubItem>
                          )
                        })}
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
                const target: SidebarItemTarget = {
                  kind: "source",
                  id: source.id,
                  name: source.name,
                }
                const content = (
                  <>
                    <SourceIcon />
                    <span className="truncate">{source.name}</span>
                  </>
                )
                return (
                  <SidebarMenuItem key={source.id ?? source.name}>
                    <SidebarMenuButton
                      isActive={
                        activeSource !== undefined &&
                        (source.id === activeSource ||
                          source.name === activeSource)
                      }
                      asChild={source.href !== undefined}
                    >
                      {source.href !== undefined ? (
                        <AppLink href={source.href}>{content}</AppLink>
                      ) : (
                        content
                      )}
                    </SidebarMenuButton>
                    <RowMenu
                      onDownload={
                        onDownload ? () => onDownload(target) : undefined
                      }
                      onRename={() => onRename?.(target)}
                      onDelete={() => onDelete?.(target)}
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
              {students.map((student) => {
                const content = (
                  <>
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
                  </>
                )
                return (
                  <SidebarMenuItem key={student.id}>
                    <SidebarMenuButton
                      isActive={student.id === activeStudent}
                      asChild={student.href !== undefined}
                    >
                      {student.href !== undefined ? (
                        <AppLink href={student.href}>{content}</AppLink>
                      ) : (
                        content
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Avatar className="size-7">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt="" />}
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          {onLogout && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Account menu"
                >
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end">
                <DropdownMenuItem onSelect={onLogout}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export { SlaiSidebar }
