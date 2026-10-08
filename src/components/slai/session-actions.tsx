"use client"

import {
  LanguagesIcon,
  OctagonXIcon,
  PlusIcon,
  QrCodeIcon,
  Settings2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConfirmDialog } from "@/components/patterns/confirm-dialog"

/**
 * The live-session action cluster: Invite, a Session menu (add activity /
 * language settings), and End session, which asks for confirmation first.
 * Rendered in the AppShell toolbar on the Live pages. Each handler is optional so pages can expose only
 * the actions that apply to their state (e.g. waiting-for-groups omits the
 * Session menu).
 */
function SessionActions({
  onAddActivity,
  onOpenLanguageSettings,
  onInviteStudents,
  onEndSession,
  className,
}: {
  onAddActivity?: () => void
  onOpenLanguageSettings?: () => void
  onInviteStudents?: () => void
  /** Called after the teacher confirms ending the session */
  onEndSession?: () => void
  className?: string
}) {
  return (
    <div
      data-slot="session-actions"
      className={cn("flex items-center gap-2", className)}
    >
      <Button onClick={onInviteStudents}>
        <QrCodeIcon data-icon="inline-start" />
        Invite
      </Button>
      {(onAddActivity || onOpenLanguageSettings) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Settings2Icon data-icon="inline-start" />
              Session
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {onAddActivity && (
              <DropdownMenuItem onClick={onAddActivity}>
                <PlusIcon />
                Add activity
              </DropdownMenuItem>
            )}
            {onOpenLanguageSettings && (
              <DropdownMenuItem onClick={onOpenLanguageSettings}>
                <LanguagesIcon />
                Language settings
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div aria-hidden className="h-5 w-px shrink-0 self-center bg-border" />
      <ConfirmDialog
        trigger={
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive"
          >
            <OctagonXIcon data-icon="inline-start" />
            End session
          </Button>
        }
        title="End this session?"
        description="Recording stops for every group and students are disconnected. The recordings will be under Sessions for review."
        confirmLabel="End session"
        onConfirm={() => onEndSession?.()}
      />
    </div>
  )
}

export { SessionActions }
