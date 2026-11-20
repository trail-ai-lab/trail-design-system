"use client"

import * as React from "react"
import {
  CircleCheckIcon,
  CircleDotDashedIcon,
  CircleDotIcon,
  GavelIcon,
  LockIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  NewspaperIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
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
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { AppLink } from "@/components/patterns/link-provider"
import { Logo } from "@/components/patterns/logo"
import type { SuspectStatus } from "./suspect-card"
import { playerLabel, type Player, type Suspect } from "./lib/case"
import { PlayerAvatar } from "./player-avatar"

export type CaseNavId = "briefing" | "suspects" | "final-call"

const NAV_ITEMS: { id: CaseNavId; label: string; icon: LucideIcon }[] = [
  { id: "briefing", label: "Case briefing", icon: NewspaperIcon },
  { id: "suspects", label: "Suspects", icon: UsersIcon },
  { id: "final-call", label: "Final call", icon: GavelIcon },
]

export interface CaseSidebarSuspect {
  suspect: Suspect
  status: SuspectStatus
}

/**
 * The Clue AI sidebar: the case's sections, each suspect with where
 * they stand (the one under investigation is active), and the team in the
 * footer with its session code. Same structure as the SLAI sidebar so the
 * tools feel like one family.
 */
function CaseSidebar({
  caseTitle,
  activeNav,
  navHrefs,
  suspects,
  activeSuspect,
  onSelectSuspect,
  isFinalCallLocked = false,
  team,
  onLeave,
}: {
  /** e.g. "The Harpe case" */
  caseTitle: string
  activeNav?: CaseNavId
  /** Links for nav items (rendered with the LinkProvider component) */
  navHrefs?: Partial<Record<CaseNavId, string>>
  suspects: CaseSidebarSuspect[]
  /** Suspect id under investigation */
  activeSuspect?: string
  onSelectSuspect?: (suspectId: string) => void
  /** The final call opens only after the first lead is done */
  isFinalCallLocked?: boolean
  team: { code: string; players: Player[] }
  /** Adds a "Leave session" item to the team menu */
  onLeave?: () => void
}) {
  return (
    <Sidebar data-slot="case-sidebar">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Logo className="h-5 text-foreground" />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="font-heading text-sm font-semibold">Clue AI</span>
            <span className="truncate text-xs text-muted-foreground">
              {caseTitle}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {NAV_ITEMS.map((item) => {
              const href = navHrefs?.[item.id]
              const isLocked = item.id === "final-call" && isFinalCallLocked
              const content = (
                <>
                  <item.icon />
                  {item.label}
                  {isLocked && (
                    <LockIcon className="ml-auto text-muted-foreground" />
                  )}
                </>
              )
              return (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={item.id === activeNav}
                    disabled={isLocked}
                    asChild={href !== undefined && !isLocked}
                  >
                    {href !== undefined && !isLocked ? (
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
          <SidebarGroupLabel>Suspects</SidebarGroupLabel>
          <SidebarMenu>
            {suspects.map(({ suspect, status }) => {
              const isLocked = status === "locked"
              return (
                <SidebarMenuItem key={suspect.id}>
                  <SidebarMenuButton
                    size="lg"
                    isActive={suspect.id === activeSuspect}
                    disabled={isLocked}
                    onClick={() => onSelectSuspect?.(suspect.id)}
                    className="gap-2.5"
                  >
                    <Avatar
                      size="sm"
                      className={cn(isLocked && "opacity-60 grayscale")}
                    >
                      {suspect.portraitUrl && (
                        <AvatarImage src={suspect.portraitUrl} alt="" />
                      )}
                      <AvatarFallback>{suspect.initials}</AvatarFallback>
                    </Avatar>
                    <span className="flex min-w-0 flex-col leading-tight">
                      <span className="truncate">{suspect.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {SUSPECT_STATUS_LABEL[status]}
                      </span>
                    </span>
                  </SidebarMenuButton>
                  <SuspectStatusMark status={status} />
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <AvatarGroup className="*:data-[slot=avatar]:ring-sidebar">
            {team.players.map((player) => (
              <PlayerAvatar
                key={player.id}
                player={player}
                className="size-7"
              />
            ))}
          </AvatarGroup>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {team.players.map(playerLabel).join(" & ")}
            </p>
            <p className="truncate font-mono text-xs text-muted-foreground">
              Session {team.code}
            </p>
          </div>
          {onLeave && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon-sm" aria-label="Team menu">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end">
                <DropdownMenuItem onSelect={onLeave}>
                  <LogOutIcon />
                  Leave session
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

const SUSPECT_STATUS_LABEL: Record<SuspectStatus, string> = {
  required: "Start here",
  available: "Open lead",
  "in-progress": "Investigating",
  completed: "Investigated",
  locked: "Locked",
}

function SuspectStatusMark({ status }: { status: SuspectStatus }) {
  if (status === "completed") {
    return (
      <SidebarMenuBadge>
        <CircleCheckIcon aria-hidden className="size-4 text-success" />
      </SidebarMenuBadge>
    )
  }
  if (status === "in-progress" || status === "required") {
    const Icon = status === "in-progress" ? CircleDotDashedIcon : CircleDotIcon
    return (
      <SidebarMenuBadge>
        <Icon aria-hidden className="size-4 text-muted-foreground" />
      </SidebarMenuBadge>
    )
  }
  return null
}

export { CaseSidebar }
