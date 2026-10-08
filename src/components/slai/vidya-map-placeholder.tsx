"use client"

import * as React from "react"
import { MapIcon, PlayIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { IconTile } from "@/components/patterns/icon-tile"

/**
 * Stand-in for the VidyaMap simulation (concept map and word cloud). The real
 * simulation lives in the SLAI app and is not part of the design system; this
 * placeholder reserves its space and models its entry screen: pick a subject
 * and start. Swap it for the real view in the app.
 */
function VidyaMapPlaceholder({
  subjects = ["Biology", "Forces and Motion", "Pulleys"],
  subject,
  onSubjectChange,
  onStart,
  loading = false,
  error,
  variant = "card",
  className,
}: {
  subjects?: string[]
  subject?: string
  onSubjectChange?: (subject: string) => void
  onStart?: () => void
  loading?: boolean
  error?: string
  /** `embedded` drops the card chrome when shown inside another card (ActivityViewer) */
  variant?: "card" | "embedded"
  className?: string
}) {
  const uid = React.useId()
  return (
    <Card
      data-variant={variant}
      className={cn(
        "w-full max-w-md",
        variant === "embedded" && "bg-transparent shadow-none ring-0",
        className
      )}
    >
      <CardHeader className="items-center text-center">
        <IconTile size="lg" className="mb-2">
          <MapIcon className="text-muted-foreground" />
        </IconTile>
        <CardTitle>VidyaMap</CardTitle>
        <CardDescription>
          Explore a concept map of the subject. The interactive map appears here
          once you start.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor={`${uid}-subject`}>Subject</FieldLabel>
          <Select
            value={subject}
            onValueChange={onSubjectChange}
            disabled={loading}
          >
            <SelectTrigger id={`${uid}-subject`} className="w-full">
              <SelectValue placeholder="Select a subject…" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        {error && (
          <Alert variant="destructive" className="mt-3">
            <TriangleAlertIcon />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          disabled={!subject || loading}
          onClick={onStart}
        >
          {loading ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <PlayIcon data-icon="inline-start" />
          )}
          {loading ? "Loading…" : "Start"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export { VidyaMapPlaceholder }
