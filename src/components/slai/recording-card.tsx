"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RecordingControl } from "@/components/slai/recording-control"

/**
 * Recorder for a quick, standalone recording: the shared tap-to-record
 * control, plus room to attach an activity for students to interact with
 * while recording. Live transcription / translation live in the Language
 * settings sheet, opened from the page toolbar.
 */
function RecordingCard({ className }: { className?: string }) {
  return (
    <Card data-slot="recording-card" className={className}>
      <CardHeader>
        <CardTitle>Record audio</CardTitle>
        <CardDescription>
          Optionally add an activity for students to interact with while
          recording.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-4">
        <RecordingControl />
      </CardContent>
    </Card>
  )
}

export { RecordingCard }
