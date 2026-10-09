"use client"

import * as React from "react"
import {
  LanguagesIcon,
  OctagonXIcon,
  PlusIcon,
  QrCodeIcon,
  Settings2Icon,
  UserMinusIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ConfirmDialog } from "@/components/patterns/confirm-dialog"

/**
 * The live-session action cluster: Invite, a Session menu (add activity /
 * language settings), and End session, which asks for confirmation first.
 * Rendered in the AppShell toolbar on the Live pages. Each handler is optional so pages can expose only
 * the actions that apply to their state (e.g. waiting-for-groups omits the
 * Session menu).
 *
 * With a single group selected, pass its name as `groupName` and handle
 * `onRemoveGroup`: the Session menu offers "Remove {group}…", confirmed first.
 */
function SessionActions({
  onAddActivity,
  onOpenLanguageSettings,
  onInviteStudents,
  onEndSession,
  groupName,
  onRemoveGroup,
  className,
}: {
  onAddActivity?: () => void
  onOpenLanguageSettings?: () => void
  onInviteStudents?: () => void
  /** Called after the teacher confirms ending the session */
  onEndSession?: () => void
  /** The selected group's name; omit in the "All groups" view */
  groupName?: string
  /** Called after the teacher confirms removing `groupName` from the session */
  onRemoveGroup?: () => void
  className?: string
}) {
  const [confirmRemove, setConfirmRemove] = React.useState(false)
  const canRemoveGroup = groupName !== undefined && onRemoveGroup !== undefined

  return (
    <div
      data-slot="session-actions"
      className={cn("flex items-center gap-2", className)}
    >
      <Button onClick={onInviteStudents}>
        <QrCodeIcon data-icon="inline-start" />
        Invite
      </Button>
      {(onAddActivity || onOpenLanguageSettings || canRemoveGroup) && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Settings2Icon data-icon="inline-start" />
              Session
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-48">
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
            {canRemoveGroup && (
              <>
                {(onAddActivity || onOpenLanguageSettings) && (
                  <DropdownMenuSeparator />
                )}
                <DropdownMenuItem
                  variant="destructive"
                  onSelect={() => setConfirmRemove(true)}
                >
                  <UserMinusIcon />
                  Remove {groupName}…
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      {canRemoveGroup && (
        <ConfirmDialog
          open={confirmRemove}
          onOpenChange={setConfirmRemove}
          title={`Remove ${groupName}?`}
          description={`${groupName} leaves this session and its transcript is no longer shown. Students in it go back to set up a new group.`}
          confirmLabel="Remove group"
          onConfirm={() => {
            setConfirmRemove(false)
            onRemoveGroup()
          }}
        />
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
