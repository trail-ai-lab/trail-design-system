"use client"

import * as React from "react"
import {
  EllipsisVerticalIcon,
  PencilIcon,
  Trash2Icon,
  UserMinusIcon,
  UserPlusIcon,
  UsersIcon,
} from "lucide-react"

import { initials } from "@/lib/format"
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
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { AppLink } from "@/components/patterns/link-provider"
import type { RosterTableStudent } from "@/components/slai/lib/roster"

function StudentRowMenu({
  student,
  onEdit,
  onRemove,
  onDelete,
}: {
  student: RosterTableStudent
  onEdit?: (student: RosterTableStudent) => void
  onRemove?: (student: RosterTableStudent) => void
  onDelete?: (student: RosterTableStudent) => void
}) {
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
      <DropdownMenuContent align="end" className="min-w-44">
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
        {onDelete && (
          <>
            {(onEdit || onRemove) && <DropdownMenuSeparator />}
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
 */
function StudentRosterTable({
  students,
  klass,
  loading = false,
  onAdd,
  onEdit,
  onRemove,
  onDelete,
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
  className?: string
}) {
  const hasMenu = Boolean(onEdit || onRemove || onDelete)
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
