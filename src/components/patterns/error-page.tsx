"use client"

import { RefreshCwIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"
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
 * Full-page error state for an app's error boundary. `variant="chunk"` is
 * for a failed code-split load (typically a new deploy): the copy asks for
 * a reload instead of a retry. The component only renders the page; the
 * boundary owns `html`/`body` and any auto-reload logic.
 */
function ErrorPage({
  variant = "error",
  title,
  description,
  onRetry,
  className,
}: {
  variant?: "error" | "chunk"
  title?: string
  description?: string
  /** Re-render the failed segment, or reload the page for `chunk` */
  onRetry?: () => void
  className?: string
}) {
  const chunk = variant === "chunk"
  return (
    <div
      data-slot="error-page"
      role="alert"
      className={cn(
        "flex min-h-svh items-center justify-center bg-background p-6",
        className
      )}
    >
      <Empty>
        <EmptyHeader>
          <EmptyMedia
            variant="icon"
            className="bg-destructive/10 text-destructive"
          >
            <TriangleAlertIcon />
          </EmptyMedia>
          <EmptyTitle className="text-h3">
            {title ??
              (chunk ? "A new version is available" : "Something went wrong")}
          </EmptyTitle>
          <EmptyDescription>
            {description ??
              (chunk
                ? "The app was updated while you had it open. Reload to continue."
                : "Please try again. If it keeps happening, close this tab and reopen the tool.")}
          </EmptyDescription>
        </EmptyHeader>
        {onRetry && (
          <EmptyContent>
            <Button onClick={onRetry}>
              <RefreshCwIcon data-icon="inline-start" />
              {chunk ? "Reload" : "Try again"}
            </Button>
          </EmptyContent>
        )}
      </Empty>
    </div>
  )
}

export { ErrorPage }
