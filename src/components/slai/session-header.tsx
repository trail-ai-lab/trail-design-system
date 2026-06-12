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
import { Separator } from "@/components/ui/separator"
import { LanguageChip } from "@/components/slai/language-chip"

/**
 * Toolbar shown at the top of an active session: class / session breadcrumb,
 * quiet language metadata, and consolidated session actions — one primary
 * Invite button, a settings menu, and a quiet End session.
 */
function SessionHeader({
  className,
  klass,
  session,
  elapsed,
  spokenLanguages = [],
  translationLanguage,
  onAddActivity,
  onOpenLanguageSettings,
  onInviteStudents,
  onEndSession,
}: {
  className?: string
  /** Class / year the session belongs to, e.g. "Physics" */
  klass: string
  /** Session or period name, e.g. "Period 3 — Aug 21" */
  session: string
  /** Formatted elapsed time, e.g. "24:13" */
  elapsed?: string
  spokenLanguages?: string[]
  translationLanguage?: string
  onAddActivity?: () => void
  onOpenLanguageSettings?: () => void
  onInviteStudents?: () => void
  onEndSession?: () => void
}) {
  return (
    <div
      className={cn("flex flex-wrap items-center gap-x-3 gap-y-2", className)}
    >
      <div className="flex min-w-0 items-center gap-3">
        <h1 className="truncate font-heading text-base font-semibold text-foreground">
          {klass}
          <span className="mx-1.5 font-normal text-muted-foreground">/</span>
          <span className="font-medium text-muted-foreground">{session}</span>
        </h1>
        {elapsed && (
          <span className="text-sm text-muted-foreground tabular-nums">
            {elapsed}
          </span>
        )}
      </div>

      <div className="hidden items-center gap-1.5 xl:flex">
        {spokenLanguages.length > 0 && (
          <LanguageChip kind="spoken" languages={spokenLanguages} />
        )}
        {translationLanguage && (
          <LanguageChip kind="translation" languages={[translationLanguage]} />
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button onClick={onInviteStudents}>
          <QrCodeIcon data-icon="inline-start" />
          Invite
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Settings2Icon data-icon="inline-start" />
              Session
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onAddActivity}>
              <PlusIcon />
              Add activity
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onOpenLanguageSettings}>
              <LanguagesIcon />
              Language settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator orientation="vertical" className="h-5" />
        <Button
          variant="ghost"
          className="text-destructive hover:text-destructive"
          onClick={onEndSession}
        >
          <OctagonXIcon data-icon="inline-start" />
          End session
        </Button>
      </div>
    </div>
  )
}

export { SessionHeader }
