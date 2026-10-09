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
 * Shows the selected activity beside the recording controls.
 *
 * - `variant="iframe"` (default): the activity in an iframe, with a skeleton
 *   while it loads. `blocked` swaps in a fallback with a link to open it in a
 *   new tab (for sites that refuse embedding). `onMessage` receives messages
 *   the activity posts — only from this activity's frame, never other windows.
 * - `variant="vidyamap"`: an activity native to the app. Pass it as
 *   `children` (it fills the viewer and lays itself out); without children the
 *   VidyaMapPlaceholder form shows, centered.
 *
 * On phones the iframe fills the area edge to edge (no card frame), so place
 * the viewer without padding there, e.g. `sm:p-(--shell-gap)`. Put the
 * activity's name and a "Close activity" button in the page toolbar rather
 * than on top of the activity.
 */
function ActivityViewer({
  variant = "iframe",
  title,
  src,
  srcDoc,
  sandbox = "allow-scripts allow-same-origin allow-forms",
  allow = "autoplay; fullscreen",
  blocked = false,
  onMessage,
  onClose,
  children,
  className,
}: {
  variant?: "iframe" | "vidyamap"
  title: string
  src?: string
  /** Inline HTML to render instead of `src` */
  srcDoc?: string
  /** Iframe sandbox policy; `null` for no sandbox (e.g. Unity WebGL, which
   * needs an unsandboxed same-origin frame) */
  sandbox?: string | null
  /** Iframe permissions policy */
  allow?: string
  /** The embed was refused; show the open-in-new-tab fallback */
  blocked?: boolean
  /** A message the activity posted (`window.parent.postMessage`), e.g. a
   * simulation event. Only messages from this activity's frame arrive. */
  onMessage?: (data: unknown, event: MessageEvent) => void
  /** @deprecated Floats a close button over the activity, where it can cover
   * the activity's own controls. Put a "Close activity" button in the page
   * toolbar instead. Removed in the next major version. */
  onClose?: () => void
  /** The app's native activity, for `variant="vidyamap"` */
  children?: React.ReactNode
  className?: string
}) {
  const [loaded, setLoaded] = React.useState(false)
  const frameRef = React.useRef<HTMLIFrameElement>(null)

  // Keep the latest handler without re-subscribing on every render (pages
  // re-render every second while a recording timer runs).
  const onMessageRef = React.useRef(onMessage)
  React.useEffect(() => {
    onMessageRef.current = onMessage
  })
  const listening = onMessage !== undefined

  React.useEffect(() => {
    if (!listening) return
    const handleMessage = (event: MessageEvent) => {
      const frame = frameRef.current
      if (!frame || event.source !== frame.contentWindow) return
      onMessageRef.current?.(event.data, event)
    }
    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [listening])

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

  if (variant === "vidyamap") {
    // A native activity lays itself out; the placeholder entry form stands on
    // its own as a card at form width, centered like other in-app forms.
    return (
      <div
        data-slot="activity-viewer"
        data-variant={variant}
        className={cn(
          "relative flex min-h-0 flex-1",
          children
            ? "flex-col"
            : "items-center-safe justify-center overflow-y-auto max-sm:p-(--shell-gap)",
          className
        )}
      >
        {closeButton}
        {children ?? <VidyaMapPlaceholder className="max-w-sm" />}
      </div>
    )
  }

  return (
    <Card
      data-slot="activity-viewer"
      data-variant={variant}
      className={cn(
        "relative min-h-0 flex-1 gap-0 py-0 max-sm:rounded-none max-sm:shadow-none max-sm:ring-0",
        className
      )}
    >
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
            ref={frameRef}
            title={title}
            src={src}
            srcDoc={srcDoc}
            sandbox={sandbox ?? undefined}
            allow={allow}
            allowFullScreen
            onLoad={() => setLoaded(true)}
            className="size-full flex-1 border-0"
          />
        </>
      )}
    </Card>
  )
}

export { ActivityViewer }
