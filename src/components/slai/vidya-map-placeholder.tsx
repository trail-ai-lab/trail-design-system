"use client"

import * as React from "react"
import { MapIcon, PlayIcon } from "lucide-react"

import { cn } from "@/lib/utils"
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
  className,
}: {
  subjects?: string[]
  subject?: string
  onSubjectChange?: (subject: string) => void
  onStart?: () => void
  loading?: boolean
  error?: string
  className?: string
}) {
  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted">
          <MapIcon className="size-6 text-muted-foreground" />
        </div>
        <CardTitle className="font-heading text-xl">VidyaMap</CardTitle>
        <CardDescription>
          Explore a concept map of the subject. The interactive map appears here
          once you start.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldLabel htmlFor="vidyamap-subject">Subject</FieldLabel>
          <Select
            value={subject}
            onValueChange={onSubjectChange}
            disabled={loading}
          >
            <SelectTrigger id="vidyamap-subject" className="w-full">
              <SelectValue placeholder="Select a subject..." />
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
          <p role="alert" className="mt-3 text-sm text-destructive">
            {error}
          </p>
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
          {loading ? "Loading..." : "Start"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export { VidyaMapPlaceholder }
