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
import type { Player, Suspect } from "./lib/case"
import { useClueAiLabels, usePlayerLabel } from "./lib/labels"
import { PlayerAvatar } from "./player-avatar"

export type CaseNavId = "briefing" | "suspects" | "final-call"

const NAV_ITEMS: { id: CaseNavId; icon: LucideIcon }[] = [
  { id: "briefing", icon: NewspaperIcon },
  { id: "suspects", icon: UsersIcon },
  { id: "final-call", icon: GavelIcon },
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
  onSelectNav,
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
  /** Called when a nav item without a link is picked — for apps that switch views in state */
  onSelectNav?: (id: CaseNavId) => void
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
  const labels = useClueAiLabels()
  const playerLabel = usePlayerLabel()
  return (
    <Sidebar data-slot="case-sidebar">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <Logo className="h-5 text-foreground" />
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="font-heading text-sm font-semibold">
              {labels.sidebar.appName}
            </span>
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
                  {labels.sidebar.nav[item.id]}
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
                    onClick={
                      href === undefined && !isLocked
                        ? () => onSelectNav?.(item.id)
                        : undefined
                    }
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
          <SidebarGroupLabel>{labels.sidebar.suspectsGroup}</SidebarGroupLabel>
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
                        {labels.sidebar.status[status]}
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
              {labels.sidebar.team(team.players.map(playerLabel))}
            </p>
            <p className="truncate font-mono text-xs text-muted-foreground">
              {labels.sidebar.session({ code: team.code })}
            </p>
          </div>
          {onLeave && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={labels.sidebar.teamMenu}
                >
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="end">
                <DropdownMenuItem onSelect={onLeave}>
                  <LogOutIcon />
                  {labels.sidebar.leave}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  )
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
