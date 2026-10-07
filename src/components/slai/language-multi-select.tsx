"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

/**
 * Searchable multi-select for languages. Selected languages are listed as
 * removable badges under the trigger; `helperText` explains the field.
 */
function LanguageMultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select languages",
  helperText,
  disabled = false,
  id,
  className,
}: {
  options: string[]
  value: string[]
  onChange: (value: string[]) => void
  placeholder?: string
  helperText?: string
  disabled?: boolean
  id?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)

  const toggle = (language: string) =>
    onChange(
      value.includes(language)
        ? value.filter((item) => item !== language)
        : [...value, language]
    )

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className="w-full justify-between font-normal"
          >
            <span
              className={cn("truncate", value.length === 0 && "text-muted-foreground")}
            >
              {value.length === 0
                ? placeholder
                : `${value.length} selected`}
            </span>
            <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-(--radix-popover-trigger-width) min-w-56 p-0"
        >
          <Command>
            <CommandInput placeholder="Search languages..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {options.map((language) => (
                  <CommandItem
                    key={language}
                    value={language}
                    onSelect={() => toggle(language)}
                  >
                    {language}
                    {value.includes(language) && (
                      <CheckIcon className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((language) => (
            <Badge key={language} variant="secondary" className="gap-1">
              {language}
              <button
                type="button"
                aria-label={`Remove ${language}`}
                disabled={disabled}
                onClick={() => toggle(language)}
                className="rounded-full outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
              >
                <XIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  )
}

export { LanguageMultiSelect }
