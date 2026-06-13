"use client"

import {
  LanguagesIcon,
  OctagonXIcon,
  PlusIcon,
  QrCodeIcon,
  Settings2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

/**
 * The live-session action cluster: Invite, a Session menu (add activity /
 * language settings), and End session. Rendered in the AppShell toolbar on
 * the manage-session pages. Each handler is optional so pages can expose only
 * the actions that apply to their state (e.g. waiting-for-groups omits the
 * Session menu).
 */
function SessionActions({
  onAddActivity,
  onOpenLanguageSettings,
  onInviteStudents,
  onEndSession,
}: {
  onAddActivity?: () => void
  onOpenLanguageSettings?: () => void
  onInviteStudents?: () => void
  onEndSession?: () => void
}) {
  return (
    <div className="flex items-center gap-2">
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
      <Button
        variant="ghost"
        className="text-destructive hover:text-destructive"
        onClick={onEndSession}
      >
        <OctagonXIcon data-icon="inline-start" />
        End session
      </Button>
    </div>
  )
}

export { SessionActions }
