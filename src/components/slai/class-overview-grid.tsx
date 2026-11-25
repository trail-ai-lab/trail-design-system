"use client"

import { cn } from "@/lib/utils"
import { initials } from "@/lib/format"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { VerdictIcon } from "@/components/slai/verdict-badge"
import { VERDICT_LABELS, type Verdict } from "@/components/slai/lib/verdict"

export interface OverviewStudent {
  id: string
  name: string
  /** Primary language, shown under the name */
  language?: string
  /**
   * Null for native English speakers (no WIDA verdict). Leave it out when
   * WIDA isn't assessed: with no student's set, the WIDA column is hidden.
   */
  wida?: Verdict | null
  /** Null when there wasn't enough to judge (e.g. the student barely spoke) */
  standard: Verdict | null
}

function VerdictCell({
  verdict,
  emptyLabel,
}: {
  verdict: Verdict | null | undefined
  /** Shown when there's no verdict; a dash without it */
  emptyLabel?: string
}) {
  if (!verdict) {
    return <span className="text-muted-foreground">{emptyLabel ?? "–"}</span>
  }
  return (
    <span className="inline-flex items-center gap-1.5">
      <VerdictIcon verdict={verdict} />
      <span className="text-muted-foreground">{VERDICT_LABELS[verdict]}</span>
    </span>
  )
}

/**
 * Class-at-a-glance card: one table row per student with their WIDA and
 * standard verdicts. Selecting a row calls `onSelectStudent` so the page can
 * scroll to that student's card. The WIDA column shows only when some
 * student has `wida` set (null counts: a native English speaker); a student
 * without a standard verdict shows "No verdict".
 */
function ClassOverviewGrid({
  students,
  standardLabel,
  onSelectStudent,
  className,
}: {
  students: OverviewStudent[]
  /** Name of the standard being measured, e.g. "CCSS" or "NGSS" */
  standardLabel: string
  onSelectStudent?: (id: string) => void
  className?: string
}) {
  const showWida = students.some((student) => student.wida !== undefined)
  return (
    <Card data-slot="class-overview-grid" className={className}>
      <CardContent>
        <Table aria-label="Class overview">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-muted-foreground">Student</TableHead>
              {showWida && (
                <TableHead
                  className="text-muted-foreground"
                  title="WIDA proficiency level"
                >
                  WIDA
                </TableHead>
              )}
              <TableHead
                className="text-muted-foreground"
                title="Content standard"
              >
                {standardLabel}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow
                key={student.id}
                onClick={() => onSelectStudent?.(student.id)}
                className={cn(onSelectStudent && "cursor-pointer")}
              >
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar size="sm">
                      <AvatarFallback>{initials(student.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex min-w-0 flex-col">
                      {onSelectStudent ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectStudent(student.id)
                          }}
                          className="truncate rounded-sm text-left font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          {student.name}
                        </button>
                      ) : (
                        <span className="truncate font-medium">
                          {student.name}
                        </span>
                      )}
                      {student.language && (
                        <span className="text-xs text-muted-foreground">
                          {student.language}
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                {showWida && (
                  <TableCell>
                    <VerdictCell verdict={student.wida} />
                  </TableCell>
                )}
                <TableCell>
                  <VerdictCell
                    verdict={student.standard}
                    emptyLabel="No verdict"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export { ClassOverviewGrid }
