"use client"

import * as React from "react"
import { ExternalLinkIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { VidyaMapPlaceholder } from "@/components/slai/vidya-map-placeholder"

/**
 * Shows the selected activity beside the recording controls. Most activities
 * are sandboxed iframes (`variant="iframe"`); `variant="vidyamap"` renders the
 * VidyaMapPlaceholder as a standalone form card (no outer frame), since that
 * simulation is native to the app. While an
 * iframe loads a skeleton shows; `blocked` swaps in a fallback with a link
 * to open the activity in a new tab (for sites that refuse embedding).
 */
function ActivityViewer({
  variant = "iframe",
  title,
  src,
  srcDoc,
  sandbox = "allow-scripts allow-same-origin allow-forms",
  blocked = false,
  onClose,
  className,
}: {
  variant?: "iframe" | "vidyamap"
  title: string
  src?: string
  /** Inline HTML to render instead of `src` */
  srcDoc?: string
  sandbox?: string
  /** The embed was refused; show the open-in-new-tab fallback */
  blocked?: boolean
  onClose?: () => void
  className?: string
}) {
  const [loaded, setLoaded] = React.useState(false)

  const closeButton = onClose && (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Close activity"
      className="absolute top-2 right-2 z-10"
      onClick={onClose}
    >
      <XIcon />
    </Button>
  )

  // The VidyaMap entry screen is a single-task form: it stands on its own as
  // a card at form width, centered like other in-app forms, rather than
  // sitting inside a full-size frame.
  if (variant === "vidyamap") {
    return (
      <div
        data-slot="activity-viewer"
        data-variant={variant}
        className={cn(
          "relative flex min-h-0 flex-1 items-center-safe justify-center overflow-y-auto",
          className
        )}
      >
        {closeButton}
        <VidyaMapPlaceholder className="max-w-sm" />
      </div>
    )
  }

  return (
    <Card className={cn("relative min-h-0 flex-1 gap-0 py-0", className)}>
      {closeButton}

      {blocked ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ExternalLinkIcon />
            </EmptyMedia>
            <EmptyTitle>This activity can&apos;t be embedded</EmptyTitle>
            <EmptyDescription>
              The site doesn&apos;t allow being shown inside SLAI. Open it in a
              new tab instead.
            </EmptyDescription>
          </EmptyHeader>
          {src && (
            <EmptyContent>
              <Button asChild>
                <a href={src} target="_blank" rel="noreferrer">
                  <ExternalLinkIcon data-icon="inline-start" />
                  Open in new tab
                </a>
              </Button>
            </EmptyContent>
          )}
        </Empty>
      ) : (
        <>
          {!loaded && (
            <Skeleton className="absolute inset-0 rounded-none" aria-hidden />
          )}
          <iframe
            title={title}
            src={src}
            srcDoc={srcDoc}
            sandbox={sandbox}
            onLoad={() => setLoaded(true)}
            className="size-full flex-1 border-0"
          />
        </>
      )}
    </Card>
  )
}

export { ActivityViewer }
