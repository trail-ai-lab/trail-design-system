"use client"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/**
 * Label / value details for a saved recording or source: file name, when
 * it was recorded, duration, size, and the group, activity and students.
 * Rows without a value are skipped.
 */
function SourceMetaCard({
  fileName,
  recordedAt,
  duration,
  size,
  group,
  activity,
  students,
  className,
}: {
  fileName: string
  /** Formatted date, e.g. "Aug 21, 3:42 PM" */
  recordedAt?: string
  /** Formatted length, e.g. "24:13" */
  duration?: string
  /** Formatted size, e.g. "4.2 MB" */
  size?: string
  group?: string
  activity?: string
  students?: string[]
  className?: string
}) {
  const rows: Array<[string, React.ReactNode]> = [
    ["File name", fileName],
    ["Recorded", recordedAt],
    ["Duration", duration],
    ["Size", size],
    ["Group", group],
    ["Activity", activity],
    [
      "Students",
      students && students.length > 0 ? (
        <span className="flex flex-wrap gap-1">
          {students.map((student) => (
            <Badge key={student} variant="secondary">
              {student}
            </Badge>
          ))}
        </span>
      ) : undefined,
    ],
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recording details</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-sm">
          {rows
            .filter(([, value]) => value !== undefined && value !== "")
            .map(([label, value]) => (
              <div key={label} className="contents">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="min-w-0 break-words text-foreground">{value}</dd>
              </div>
            ))}
        </dl>
      </CardContent>
    </Card>
  )
}

export { SourceMetaCard }
