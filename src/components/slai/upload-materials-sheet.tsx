"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Dropzone } from "@/components/patterns/dropzone"
import { FileUploadItem } from "@/components/patterns/file-upload-item"
import { SectionLabel } from "@/components/patterns/section-label"
import {
  MATERIAL_ACCEPT,
  materialIcon,
  type CourseMaterial,
} from "@/components/slai/lib/course-material"
import { SessionMaterialsPicker } from "@/components/slai/session-materials-picker"
import { useControllableState } from "@/lib/use-controllable-state"

/**
 * Side panel for adding course materials without leaving the page (Live,
 * session review, the class's Materials page). Files upload as soon as
 * they're dropped — the app reports each one's progress back through
 * `uploads` — so there's no submit step, and closing the sheet doesn't stop
 * them.
 *
 * With `session`, a checkbox (on by default) also links the new files to that
 * session so its answers look at them first. Pass the class library as
 * `materials` too and a "Used in {session}" picker at the top links existing
 * materials (`linkedIds`) — e.g. in session review, after class.
 */
function UploadMaterialsSheet({
  open,
  defaultOpen,
  onOpenChange,
  klass,
  session,
  uploads = [],
  materials,
  linkedIds: linkedIdsProp,
  defaultLinkedIds = [],
  onLinkedIdsChange,
  accept = MATERIAL_ACCEPT,
  onFilesSelected,
  onRetry,
  onRemove,
  children,
}: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  /** The class the materials are added to, e.g. "Physics" */
  klass: string
  /** The current session's name; shows the "Link to this session" option */
  session?: string
  /** Files added from this sheet, newest first, with their upload status */
  uploads?: CourseMaterial[]
  /** The class library; with `session`, shows the "Used in {session}" picker */
  materials?: CourseMaterial[]
  /** Ids of the materials linked to `session` */
  linkedIds?: string[]
  defaultLinkedIds?: string[]
  onLinkedIdsChange?: (linkedIds: string[]) => void
  /** Native `accept` string; defaults to documents, slides, sheets and text */
  accept?: string
  /** Files dropped or picked; start uploading them */
  onFilesSelected?: (files: File[], options: { linkToSession: boolean }) => void
  /** Adds a retry button to failed uploads */
  onRetry?: (material: CourseMaterial) => void
  /** Adds a remove button to each upload (cancel or delete) */
  onRemove?: (material: CourseMaterial) => void
  /** Optional trigger, e.g. <SheetTrigger asChild><Button/></SheetTrigger> */
  children?: React.ReactNode
}) {
  const uid = React.useId()
  const [linkToSession, setLinkToSession] = React.useState(true)
  const [linkedIds, setLinkedIds] = useControllableState({
    value: linkedIdsProp,
    defaultValue: defaultLinkedIds,
    onChange: onLinkedIdsChange,
  })
  const showPicker = session !== undefined && materials !== undefined
  const busy = uploads.some(
    (upload) => upload.status === "uploading" || upload.status === "processing"
  )

  return (
    <Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
      <SheetContent
        data-slot="upload-materials-sheet"
        className="flex w-full flex-col gap-0 sm:max-w-md"
      >
        <SheetHeader>
          <SheetTitle className="font-heading">
            {showPicker ? "Course materials" : "Add course materials"}
          </SheetTitle>
          <SheetDescription>
            Syllabus, slides, readings or rubrics. SLAI uses them to answer
            questions about {klass}.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-6 pt-1 pb-6">
          {showPicker && (
            <Field>
              <FieldLabel htmlFor={`${uid}-linked`}>
                Used in {session}
              </FieldLabel>
              <SessionMaterialsPicker
                id={`${uid}-linked`}
                materials={materials}
                value={linkedIds}
                onValueChange={setLinkedIds}
                placeholder={
                  materials.length === 0
                    ? `No materials in ${klass} yet`
                    : "Select materials"
                }
              />
            </Field>
          )}
          <div className="flex flex-col gap-3">
            {showPicker && <SectionLabel>Upload new</SectionLabel>}
            <Dropzone
              multiple
              accept={accept}
              title="Drag and drop files or click to browse"
              description="PDF, Word, PowerPoint, Excel or text"
              onFilesSelected={(files) =>
                onFilesSelected?.(files, {
                  linkToSession: session !== undefined && linkToSession,
                })
              }
            />
          </div>
          {session && (
            <Field orientation="horizontal">
              <Checkbox
                id={`${uid}-link-session`}
                checked={linkToSession}
                onCheckedChange={(checked) =>
                  setLinkToSession(checked === true)
                }
              />
              <FieldContent>
                <FieldLabel htmlFor={`${uid}-link-session`}>
                  Link to {session}
                </FieldLabel>
                <FieldDescription>
                  Answers in this session look here first. Files are also added
                  to the {klass} library.
                </FieldDescription>
              </FieldContent>
            </Field>
          )}
          {uploads.length > 0 && (
            <section
              aria-labelledby={`${uid}-uploads`}
              className="flex flex-col gap-3"
            >
              <SectionLabel id={`${uid}-uploads`}>Added</SectionLabel>
              <ul className="flex flex-col gap-2">
                {uploads.map((upload) => (
                  <li key={upload.id}>
                    <FileUploadItem
                      name={upload.name}
                      size={upload.size}
                      status={upload.status}
                      progress={upload.progress}
                      error={upload.error}
                      icon={materialIcon(upload.name)}
                      onRetry={onRetry ? () => onRetry(upload) : undefined}
                      onRemove={onRemove ? () => onRemove(upload) : undefined}
                    />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        <SheetFooter className="border-t">
          {busy && (
            <p className="text-center text-xs text-muted-foreground">
              You can close this — uploads keep going.
            </p>
          )}
          <SheetClose asChild>
            <Button className="w-full">Done</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export { UploadMaterialsSheet }
