"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react"

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
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  languageLabel,
  toLanguageOptions,
  type LanguageOptions,
} from "@/components/slai/lib/language-option"

/**
 * Searchable multi-select for languages. Selected languages are listed as
 * removable badges under the trigger; `helperText` explains the field.
 * Options can be `{ value, label }` pairs: `value` holds the option values,
 * badges show the labels.
 */
function LanguageMultiSelect({
  options,
  value: valueProp,
  defaultValue = [],
  onValueChange,
  placeholder = "Select languages",
  helperText,
  disabled = false,
  id,
  "aria-label": ariaLabel,
  className,
}: {
  options: LanguageOptions
  /** The selected options' values */
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (value: string[]) => void
  placeholder?: string
  helperText?: string
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

  const choices = toLanguageOptions(options)

  const toggle = (language: string) =>
    setValue(
      value.includes(language)
        ? value.filter((item) => item !== language)
        : [...value, language]
    )

  return (
    <div
      data-slot="language-multi-select"
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
          className="w-(--radix-popover-trigger-width) min-w-56 p-0"
        >
          <Command>
            <CommandInput placeholder="Search languages…" />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {choices.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    keywords={[option.value]}
                    onSelect={() => toggle(option.value)}
                  >
                    {option.label}
                    {value.includes(option.value) && (
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
              {languageLabel(choices, language)}
              <button
                type="button"
                aria-label={`Remove ${languageLabel(choices, language)}`}
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
