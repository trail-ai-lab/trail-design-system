"use client"

import { ConfirmDialog } from "@/components/patterns/confirm-dialog"

/**
 * Destructive confirmation for deleting a class, session, recording, source
 * or group. `itemKind` is used in the copy ("Delete session"); keep
 * `onConfirm` async and drive `loading` from it so the dialog stays open
 * while deleting.
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
  open?: boolean
  onOpenChange?: (open: boolean) => void
  itemKind: string
  itemName: string
  /** Overrides the default "cannot be undone" copy */
  description?: string
  loading?: boolean
  onConfirm: () => void
}) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      title={`Delete ${itemKind}`}
      description={
        description ??
        `"${itemName}" will be permanently deleted. This cannot be undone.`
      }
      confirmLabel="Delete"
      loadingLabel="Deleting…"
      loading={loading}
      onConfirm={onConfirm}
    />
  )
}

export { DeleteConfirmDialog }
