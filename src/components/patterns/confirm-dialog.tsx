"use client"

import * as React from "react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"

/**
 * Asks before an irreversible or disruptive action (end a session, delete,
 * discard, reset a link). Pass `trigger` to let the dialog manage its own
 * open state, or control it with `open` / `onOpenChange`. With `loading`, the
 * dialog stays open and the confirm button shows a spinner until you close it.
 */
function ConfirmDialog({
  trigger,
  open: openProp,
  onOpenChange,
  title,
  description,
  confirmLabel,
  loadingLabel,
  cancelLabel = "Cancel",
  variant = "destructive",
  loading = false,
  onConfirm,
}: {
  /** Element that opens the dialog, e.g. a Button */
  trigger?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: React.ReactNode
  description: React.ReactNode
  /** Confirm button text, phrased as the action, e.g. "End session" */
  confirmLabel: string
  /** Confirm button text while `loading`, e.g. "Ending…" */
  loadingLabel?: string
  cancelLabel?: string
  /** `destructive` for data loss; `default` for disruptive but safe actions */
  variant?: "default" | "destructive"
  loading?: boolean
  onConfirm: () => void
}) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const controlled = openProp !== undefined
  const open = controlled ? openProp : internalOpen
  const setOpen = (next: boolean) => {
    if (!controlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>
            {cancelLabel}
          </AlertDialogCancel>
          <Button
            variant={variant}
            disabled={loading}
            onClick={() => {
              onConfirm()
              // Uncontrolled and not waiting on async work: close right away.
              if (!controlled && !loading) setInternalOpen(false)
            }}
          >
            {loading && <Spinner data-icon="inline-start" />}
            {loading ? (loadingLabel ?? confirmLabel) : confirmLabel}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { ConfirmDialog }
