"use client"

import * as React from "react"
import {
  DownloadIcon,
  EllipsisVerticalIcon,
  LibraryIcon,
  PencilIcon,
  RotateCwIcon,
  TagIcon,
  Trash2Icon,
  UploadIcon,
} from "lucide-react"

import { formatBytes } from "@/lib/format"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { IconTile } from "@/components/patterns/icon-tile"
import { UploadStatusBadge } from "@/components/patterns/file-upload-item"
import {
  MATERIAL_TYPE_LABELS,
  materialIcon,
  materialScopeLabel,
  type CourseMaterial,
  type MaterialType,
} from "@/components/slai/lib/course-material"

function MaterialRowMenu({
  material,
  onRename,
  onTypeChange,
  onDownload,
  onRetry,
  onDelete,
}: {
  material: CourseMaterial
  onRename?: (material: CourseMaterial) => void
  onTypeChange?: (material: CourseMaterial, type: MaterialType) => void
  onDownload?: (material: CourseMaterial) => void
  onRetry?: (material: CourseMaterial) => void
  onDelete?: (material: CourseMaterial) => void
}) {
  const canRetry = material.status === "failed" && onRetry
  const canDownload = material.status !== "uploading" && onDownload
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`${material.name} options`}
        >
          <EllipsisVerticalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-44">
        {canRetry && (
          <DropdownMenuItem onSelect={() => onRetry(material)}>
            <RotateCwIcon />
            Retry
          </DropdownMenuItem>
        )}
        {canDownload && (
          <DropdownMenuItem onSelect={() => onDownload(material)}>
            <DownloadIcon />
            Download
          </DropdownMenuItem>
        )}
        {onRename && (
          <DropdownMenuItem onSelect={() => onRename(material)}>
            <PencilIcon />
            Rename
          </DropdownMenuItem>
        )}
        {onTypeChange && (
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <TagIcon />
              Type
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={material.type ?? ""}
                onValueChange={(type) =>
                  onTypeChange(material, type as MaterialType)
                }
              >
                {(Object.keys(MATERIAL_TYPE_LABELS) as MaterialType[]).map(
                  (type) => (
                    <DropdownMenuRadioItem key={type} value={type}>
                      {MATERIAL_TYPE_LABELS[type]}
                    </DropdownMenuRadioItem>
                  )
                )}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        )}
        {onDelete && (
          <>
            {(canRetry || canDownload || onRename || onTypeChange) && (
              <DropdownMenuSeparator />
            )}
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => onDelete(material)}
            >
              <Trash2Icon />
              Delete
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/**
 * A class's course materials — the documents SLAI's Q&A answers from — as a
 * table: name and size, type, which sessions use it, and processing status.
 * Row menus report the material; the app opens `RenameDialog` /
 * `DeleteConfirmDialog`. "Upload" (`onUpload`) opens `UploadMaterialsSheet`.
 */
function MaterialsTable({
  materials,
  klass,
  loading = false,
  onUpload,
  onRename,
  onTypeChange,
  onDownload,
  onRetry,
  onDelete,
  className,
}: {
  materials: CourseMaterial[]
  /** The class's name, used in the description, e.g. "Physics" */
  klass?: string
  /** Show skeleton rows instead of the table */
  loading?: boolean
  /** Shows the Upload button (and the empty state's action) */
  onUpload?: () => void
  onRename?: (material: CourseMaterial) => void
  /** Adds a Type submenu to each row */
  onTypeChange?: (material: CourseMaterial, type: MaterialType) => void
  onDownload?: (material: CourseMaterial) => void
  /** Adds Retry to failed rows */
  onRetry?: (material: CourseMaterial) => void
  /** Delete chosen; confirm with `DeleteConfirmDialog` first */
  onDelete?: (material: CourseMaterial) => void
  className?: string
}) {
  const hasMenu = Boolean(
    onRename || onTypeChange || onDownload || onRetry || onDelete
  )
  const processing = materials.filter(
    (material) =>
      material.status === "uploading" || material.status === "processing"
  ).length

  return (
    <Card data-slot="materials-table" className={className}>
      <CardHeader>
        <CardTitle>Course materials</CardTitle>
        <CardDescription>
          SLAI answers questions in {klass ? `${klass} ` : "this class's "}
          sessions from these as well as the transcript.
          {processing > 0 && ` ${processing} still processing.`}
        </CardDescription>
        {onUpload && materials.length > 0 && (
          <CardAction>
            <Button size="sm" onClick={onUpload}>
              <UploadIcon data-icon="inline-start" />
              Upload
            </Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="size-10 rounded-lg" />
                <div className="flex flex-1 flex-col gap-1.5">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : materials.length === 0 ? (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <LibraryIcon />
              </EmptyMedia>
              <EmptyTitle>No course materials yet</EmptyTitle>
              <EmptyDescription>
                Upload your syllabus, slides and readings so answers draw on
                your curriculum, not just what students said.
              </EmptyDescription>
            </EmptyHeader>
            {onUpload && (
              <EmptyContent>
                <Button onClick={onUpload}>
                  <UploadIcon data-icon="inline-start" />
                  Upload materials
                </Button>
              </EmptyContent>
            )}
          </Empty>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Type</TableHead>
                <TableHead className="hidden lg:table-cell">Used in</TableHead>
                <TableHead>Status</TableHead>
                {hasMenu && (
                  <TableHead className="w-8">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {materials.map((material) => {
                const Icon = materialIcon(material.name)
                const meta = [
                  material.size !== undefined
                    ? formatBytes(material.size)
                    : undefined,
                  material.addedAt ? `Added ${material.addedAt}` : undefined,
                ]
                  .filter(Boolean)
                  .join(" · ")
                return (
                  <TableRow key={material.id} data-status={material.status}>
                    <TableCell className="max-w-0 min-w-48 md:w-1/2">
                      <div className="flex items-center gap-3">
                        <IconTile>
                          <Icon />
                        </IconTile>
                        <div className="flex min-w-0 flex-col">
                          <span className="truncate font-medium">
                            {material.name}
                          </span>
                          {material.status === "failed" && material.error ? (
                            <span className="truncate text-sm text-destructive">
                              {material.error}
                            </span>
                          ) : (
                            meta && (
                              <span className="truncate text-sm text-muted-foreground tabular-nums">
                                {meta}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground md:table-cell">
                      {material.type
                        ? MATERIAL_TYPE_LABELS[material.type]
                        : "—"}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground lg:table-cell">
                      {materialScopeLabel(material)}
                    </TableCell>
                    <TableCell>
                      {material.status === "uploading" &&
                      material.progress !== undefined ? (
                        <UploadStatusBadge status="uploading">
                          <span className="tabular-nums">
                            {Math.round(material.progress)}%
                          </span>
                        </UploadStatusBadge>
                      ) : (
                        <UploadStatusBadge status={material.status} />
                      )}
                    </TableCell>
                    {hasMenu && (
                      <TableCell className="w-8">
                        <MaterialRowMenu
                          material={material}
                          onRename={onRename}
                          onTypeChange={onTypeChange}
                          onDownload={onDownload}
                          onRetry={onRetry}
                          onDelete={onDelete}
                        />
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
}

export { MaterialsTable }
