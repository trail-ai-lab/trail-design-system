"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, UploadIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useControllableState } from "@/lib/use-controllable-state"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  MATERIAL_TYPE_LABELS,
  materialIcon,
  type CourseMaterial,
} from "@/components/slai/lib/course-material"

/**
 * Picks which of a class's course materials a session should look at first
 * (e.g. today's slides). A searchable multi-select over the class library,
 * with "Upload new…" at the end; picked materials show as removable badges.
 * Notes when any of them are still processing.
 */
function SessionMaterialsPicker({
  materials,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  onUploadNew,
  placeholder = "Select materials",
  disabled = false,
  id,
  "aria-label": ariaLabel,
  className,
}: {
  /** The class's materials library */
  materials: CourseMaterial[]
  /** Ids of the picked materials */
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  /** Adds an "Upload new…" item; open `UploadMaterialsSheet` */
  onUploadNew?: () => void
  placeholder?: string
  disabled?: boolean
  id?: string
  /** Accessible name when there's no visible <label htmlFor={id}> */
  "aria-label"?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = useControllableState({
    value: valueProp,
    defaultValue,
    onChange: onValueChange,
  })

  const choices = materials.filter((material) => material.status !== "failed")
  const picked = value
    .map((materialId) => materials.find((m) => m.id === materialId))
    .filter((material): material is CourseMaterial => material !== undefined)
  const processing = picked.filter(
    (material) =>
      material.status === "uploading" || material.status === "processing"
  ).length

  const toggle = (materialId: string) =>
    setValue(
      value.includes(materialId)
        ? value.filter((item) => item !== materialId)
        : [...value, materialId]
    )

  return (
    <div
      data-slot="session-materials-picker"
      className={cn("flex flex-col gap-2", className)}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-label={ariaLabel}
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between font-normal"
          >
            <span
              className={cn(
                "truncate",
                value.length === 0 && "text-muted-foreground"
              )}
            >
              {value.length === 0 ? placeholder : `${value.length} selected`}
            </span>
            <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) min-w-64 p-0"
        >
          <Command>
            <CommandInput placeholder="Search materials…" />
            <CommandList>
              <CommandEmpty>
                {choices.length === 0
                  ? "No materials in this class yet."
                  : "No material found."}
              </CommandEmpty>
              {choices.length > 0 && (
                <CommandGroup>
                  {choices.map((material) => {
                    const Icon = materialIcon(material.name)
                    const note =
                      material.status === "ready"
                        ? material.type && MATERIAL_TYPE_LABELS[material.type]
                        : "Processing"
                    return (
                      <CommandItem
                        key={material.id}
                        value={material.name}
                        keywords={[material.id]}
                        onSelect={() => toggle(material.id)}
                      >
                        <Icon className="text-muted-foreground" />
                        <span className="min-w-0 flex-1 truncate">
                          {material.name}
                        </span>
                        {note && (
                          <span className="shrink-0 text-xs text-muted-foreground">
                            {note}
                          </span>
                        )}
                        <CheckIcon
                          className={cn(
                            "shrink-0",
                            !value.includes(material.id) && "invisible"
                          )}
                        />
                      </CommandItem>
                    )
                  })}
                </CommandGroup>
              )}
              {onUploadNew && (
                <>
                  {choices.length > 0 && <CommandSeparator />}
                  <CommandGroup>
                    <CommandItem
                      value="Upload new"
                      forceMount
                      onSelect={() => {
                        setOpen(false)
                        onUploadNew()
                      }}
                    >
                      <UploadIcon />
                      Upload new…
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {picked.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {picked.map((material) => (
            <Badge
              key={material.id}
              variant="secondary"
              className="max-w-full gap-1"
            >
              <span className="truncate">{material.name}</span>
              <button
                type="button"
                aria-label={`Remove ${material.name}`}
                disabled={disabled}
                onClick={() => toggle(material.id)}
                className="rounded-full outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <XIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        {processing > 0
          ? `${processing} still processing — Q&A uses ${processing === 1 ? "it" : "them"} once ready.`
          : "Answers in this session look here first, then the rest of the class's materials."}
      </p>
    </div>
  )
}

export { SessionMaterialsPicker }
