"use client"

import { MicOffIcon, RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

/**
 * Shown on a student's device when the browser has blocked microphone
 * access — recording can't start until permission is granted.
 */
function MicPermissionError({
  onReload,
  onRetry,
  className,
}: {
  onReload?: () => void
  onRetry?: () => void
  className?: string
}) {
  return (
    <Empty className={className}>
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="size-16 rounded-full bg-destructive/10 text-destructive [&_svg]:size-7"
        >
          <MicOffIcon />
        </EmptyMedia>
        <EmptyTitle className="text-xl">Microphone access required</EmptyTitle>
        <EmptyDescription>
          Your browser has blocked microphone access. To fix this:
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <ol className="flex w-full flex-col gap-1.5 text-left text-sm text-muted-foreground">
          <li>
            1. Tap the <strong className="font-medium text-foreground">lock</strong> or{" "}
            <strong className="font-medium text-foreground">info</strong> icon in
            your browser&apos;s address bar
          </li>
          <li>
            2. Find{" "}
            <strong className="font-medium text-foreground">Microphone</strong> and
            set it to <strong className="font-medium text-foreground">Allow</strong>
          </li>
          <li>3. Reload this page and try again</li>
        </ol>

        <div className="flex w-full flex-col gap-2">
          <Button size="lg" className="w-full" onClick={onReload}>
            <RefreshCwIcon data-icon="inline-start" />
            Reload Page
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full"
            onClick={onRetry}
          >
            Try Again
          </Button>
        </div>
      </EmptyContent>
    </Empty>
  )
}

export { MicPermissionError }
