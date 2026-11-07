"use client"

import * as React from "react"
import {
  EllipsisVerticalIcon,
  MicIcon,
  PencilIcon,
  PlayIcon,
  RotateCcwIcon,
  Trash2Icon,
  UserMinusIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react"

import { formatElapsed, initials } from "@/lib/format"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AppLink } from "@/components/patterns/link-provider"
import { AudioPlayerCard } from "@/components/slai/audio-player-card"
import type { RosterTableStudent } from "@/components/slai/lib/roster"

/** Listen to a voiceprint: the audio URL is fetched when the popover opens. */
function VoiceprintPlayer({
  student,
  getAudioUrl,
}: {
  student: RosterTableStudent
  getAudioUrl: (student: RosterTableStudent) => Promise<string>
}) {
  const [src, setSrc] = React.useState<string>()
  const [error, setError] = React.useState<string>()
  const duration = student.voiceprint?.durationSeconds

  const load = (open: boolean) => {
    // Signed URLs are short-lived, so each opening asks for a fresh one.
    setSrc(undefined)
    setError(undefined)
    if (!open) return
    getAudioUrl(student).then(setSrc, () =>
      setError("Couldn't load the voiceprint.")
    )
  }

  return (
    <Popover onOpenChange={load}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="xs"
          aria-label={`Play ${student.name}'s voiceprint`}
        >
          <PlayIcon data-icon="inline-start" />
          <span className="tabular-nums">
            {duration !== undefined ? formatElapsed(duration) : "Play"}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-2">
        <AudioPlayerCard
          compact
          title={`${student.name}'s voiceprint`}
          src={src}
          durationSeconds={duration}
          loading={!src && !error}
          error={error}
        />
      </PopoverContent>
    </Popover>
  )
}

/** The Voiceprint cell: add one, wait for it, listen to it, or try again. */
function VoiceprintCell({
  student,
  onAdd,
  getAudioUrl,
}: {
  student: RosterTableStudent
  onAdd: (student: RosterTableStudent) => void
  getAudioUrl?: (student: RosterTableStudent) => Promise<string>
}) {
  const voiceprint = student.voiceprint
  if (voiceprint?.status === "processing") {
    return (
      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Spinner />
        Processing…
      </span>
    )
  }
  if (voiceprint?.status === "ready") {
    return (
      <span className="flex flex-wrap items-center gap-2">
        {getAudioUrl ? (
          <VoiceprintPlayer student={student} getAudioUrl={getAudioUrl} />
        ) : (
          <Badge variant="secondary">Added</Badge>
        )}
        {voiceprint.recordedBy === "student" && (
          <Badge variant="outline">Recorded by student</Badge>
        )}
      </span>
    )
  }
  if (voiceprint?.status === "failed") {
    return (
      <span className="flex items-center gap-2">
        <Button
          variant="outline"
          size="xs"
          aria-label={`Record ${student.name}'s voiceprint again`}
          onClick={() => onAdd(student)}
        >
          <RotateCcwIcon data-icon="inline-start" />
          Try again
        </Button>
        {voiceprint.error && (
          <span className="text-sm text-destructive">{voiceprint.error}</span>
        )}
      </span>
    )
  }
  return (
    <Button
      variant="outline"
      size="xs"
      aria-label={`Add ${student.name}'s voiceprint`}
      onClick={() => onAdd(student)}
    >
      <MicIcon data-icon="inline-start" />
      Add
    </Button>
  )
}

function StudentRowMenu({
  student,
  onEdit,
  onRemove,
  onDelete,
  onAddVoiceprint,
  onDeleteVoiceprint,
}: {
  student: RosterTableStudent
  onEdit?: (student: RosterTableStudent) => void
  onRemove?: (student: RosterTableStudent) => void
  onDelete?: (student: RosterTableStudent) => void
  onAddVoiceprint?: (student: RosterTableStudent) => void
  onDeleteVoiceprint?: (student: RosterTableStudent) => void
}) {
  const hasVoiceprint = student.voiceprint?.status === "ready"
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`${student.name} options`}
        >
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
        {onEdit && (
          <DropdownMenuItem onSelect={() => onEdit(student)}>
            <PencilIcon />
            Edit
          </DropdownMenuItem>
        )}
        {onRemove && (
          <DropdownMenuItem onSelect={() => onRemove(student)}>
            <UserMinusIcon />
            Remove from class
          </DropdownMenuItem>
        )}
        {hasVoiceprint && onAddVoiceprint && (
          <DropdownMenuItem onSelect={() => onAddVoiceprint(student)}>
            <MicIcon />
            Re-record voiceprint
          </DropdownMenuItem>
        )}
        {hasVoiceprint && onDeleteVoiceprint && (
          <DropdownMenuItem onSelect={() => onDeleteVoiceprint(student)}>
            <Trash2Icon />
            Delete voiceprint
          </DropdownMenuItem>
        )}
        {onDelete && (
          <>
            {(onEdit ||
              onRemove ||
              (hasVoiceprint && (onAddVoiceprint || onDeleteVoiceprint))) && (
              <DropdownMenuSeparator />
            )}
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => onDelete(student)}
            >
              <Trash2Icon />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * A class's student roster: the stable identities that group members, speaker
 * assignments and progress point at. One row per student with their language,
 * grade and how many sessions they were in. Row menus report the student; the
 * app opens `EditStudentDialog`, `ConfirmDialog` (remove from class) or
 * `DeleteConfirmDialog`. "Add students" (`onAdd`) opens `AddStudentsDialog`.
 *
 * Pass `onAddVoiceprint` to show the Voiceprint column: "Add" and "Re-record
 * voiceprint" report the student (open `VoiceprintRecordDialog`), and
 * `getVoiceprintAudioUrl` plays a ready one. Teacher view only.
 */
function StudentRosterTable({
  students,
  klass,
  loading = false,
  onAdd,
  onEdit,
  onRemove,
  onDelete,
  onAddVoiceprint,
  onDeleteVoiceprint,
  getVoiceprintAudioUrl,
  className,
}: {
  students: RosterTableStudent[]
  /** The class's name, used in the description, e.g. "Physics" */
  klass?: string
  /** Show skeleton rows instead of the table */
  loading?: boolean
  /** Shows the Add students button (and the empty state's action) */
  onAdd?: () => void
  onEdit?: (student: RosterTableStudent) => void
  /** Remove from this class only; confirm with `ConfirmDialog` first */
  onRemove?: (student: RosterTableStudent) => void
  /** Delete everywhere; confirm with `DeleteConfirmDialog` first */
  onDelete?: (student: RosterTableStudent) => void
  /** Shows the Voiceprint column; opens `VoiceprintRecordDialog` for the student */
  onAddVoiceprint?: (student: RosterTableStudent) => void
  /** Adds "Delete voiceprint" to the row menu; confirm with `DeleteConfirmDialog` first */
  onDeleteVoiceprint?: (student: RosterTableStudent) => void
  /** Resolves a playable URL when a ready voiceprint's player opens */
  getVoiceprintAudioUrl?: (student: RosterTableStudent) => Promise<string>
  className?: string
}) {
  const showVoiceprints = Boolean(onAddVoiceprint)
  const hasMenu = Boolean(onEdit || onRemove || onDelete || onAddVoiceprint)
  const showSessions = students.some((s) => s.sessionCount !== undefined)

  return (
    <Card data-slot="student-roster-table" className={className}>
      <CardHeader>
        <CardTitle>Students</CardTitle>
        <CardDescription>
          {students.length > 0
            ? `${students.length} ${students.length === 1 ? "student" : "students"} in ${klass ?? "this class"}. `
            : ""}
          Recordings, speakers and progress link to these students across
          sessions.
        </CardDescription>
        {onAdd && students.length > 0 && (
          <CardAction>
            <Button size="sm" onClick={onAdd}>
              <UserPlusIcon data-icon="inline-start" />
              Add students
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-6 rounded-full" />
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="ml-auto h-4 w-1/6" />
              </div>
            ))}
          </div>
        ) : students.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <UsersIcon />
              </EmptyMedia>
              <EmptyTitle>No students yet</EmptyTitle>
              <EmptyDescription>
                Add your class roster so recordings, speakers and progress can
                be tied to each student across sessions.
              </EmptyDescription>
            </EmptyHeader>
            {onAdd && (
              <EmptyContent>
                <Button onClick={onAdd}>
                  <UserPlusIcon data-icon="inline-start" />
                  Add students
                </Button>
              </EmptyContent>
            )}
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Language</TableHead>
                <TableHead className="hidden sm:table-cell">Grade</TableHead>
                {showVoiceprints && <TableHead>Voiceprint</TableHead>}
                {showSessions && (
                  <TableHead className="hidden text-right lg:table-cell">
                    Sessions
                  </TableHead>
                )}
                {hasMenu && (
                  <TableHead className="w-8">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="max-w-0 min-w-48 md:w-1/2">
                    <div className="flex items-center gap-3">
                      <Avatar size="sm">
                        <AvatarFallback>
                          {initials(student.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex min-w-0 flex-col">
                        {student.href ? (
                          <AppLink
                            href={student.href}
                            className="truncate font-medium hover:underline"
                          >
                            {student.name}
                          </AppLink>
                        ) : (
                          <span className="truncate font-medium">
                            {student.name}
                          </span>
                        )}
                        {student.aliases && student.aliases.length > 0 && (
                          <span className="truncate text-sm text-muted-foreground">
                            Also {student.aliases.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    <span className="flex items-center gap-2">
                      {student.language ?? "—"}
                      {student.isNativeEnglish && (
                        <Badge variant="secondary">Native English</Badge>
                      )}
                    </span>
                  </TableCell>
                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {student.grade ?? "—"}
                  </TableCell>
                  {onAddVoiceprint && (
                    <TableCell>
                      <VoiceprintCell
                        student={student}
                        onAdd={onAddVoiceprint}
                        getAudioUrl={getVoiceprintAudioUrl}
                      />
                    </TableCell>
                  )}
                  {showSessions && (
                    <TableCell className="hidden text-right text-muted-foreground tabular-nums lg:table-cell">
                      {student.sessionCount ?? "—"}
                    </TableCell>
                  )}
                  {hasMenu && (
                    <TableCell className="w-8">
                      <StudentRowMenu
                        student={student}
                        onEdit={onEdit}
                        onRemove={onRemove}
                        onDelete={onDelete}
                        onAddVoiceprint={onAddVoiceprint}
                        onDeleteVoiceprint={onDeleteVoiceprint}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export { StudentRosterTable }
