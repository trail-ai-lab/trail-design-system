"use client"

import { Spinner } from "@/components/ui/spinner"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

/**
 * Destructive confirmation for deleting a class, session, source or group.
 * `itemKind` is used in the copy ("Delete session"); keep `onConfirm` async
 * and drive `loading` from it so the dialog stays open while deleting.
 */
function DeleteConfirmDialog({
  open,
  onOpenChange,
  itemKind,
  itemName,
  description,
  loading = false,
  onConfirm,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  itemKind: string
  itemName: string
  /** Overrides the default "cannot be undone" copy */
  description?: string
  loading?: boolean
  onConfirm: () => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemKind}</AlertDialogTitle>
          <AlertDialogDescription>
            {description ??
              `"${itemName}" will be permanently deleted. This cannot be undone.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <Button variant="destructive" disabled={loading} onClick={onConfirm}>
            {loading && <Spinner data-icon="inline-start" />}
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export { DeleteConfirmDialog }
