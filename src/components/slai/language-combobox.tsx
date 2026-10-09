"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon, LanguagesIcon } from "lucide-react"

import { cn } from "@/lib/utils"
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
 * Searchable single-select language picker. `noneLabel` adds a leading
 * option that clears the value — e.g. "Original" for a translation picker
 * (show the untranslated text) or "None" for an optional second language.
 * Options can be `{ value, label }` pairs (store a code, show a name);
 * search matches both.
 */
function LanguageCombobox({
  value,
  onValueChange,
  languages,
  placeholder = "Select a language…",
  noneLabel,
  disabled = false,
  id,
  "aria-label": ariaLabel,
  className,
}: {
  /** The chosen option's `value` */
  value?: string
  /** Receives the chosen option's `value`, or `undefined` when the
   * `noneLabel` option is chosen */
  onValueChange: (value: string | undefined) => void
  languages: LanguageOptions
  placeholder?: string
  noneLabel?: string
  disabled?: boolean
  id?: string
  /** Accessible name when there's no visible <label htmlFor={id}> */
  "aria-label"?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const options = toLanguageOptions(languages)
  const label = value !== undefined ? languageLabel(options, value) : noneLabel

  const choose = (next: string | undefined) => {
    onValueChange(next)
    setOpen(false)
  }

  return (
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
          className={cn("w-full justify-between font-normal", className)}
        >
          <span
            className={cn(
              "flex min-w-0 items-center gap-2",
              !label && "text-muted-foreground"
            )}
          >
            <LanguagesIcon className="size-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{label ?? placeholder}</span>
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
              {noneLabel && (
                <CommandItem
                  value={noneLabel}
                  onSelect={() => choose(undefined)}
                >
                  {noneLabel}
                  {value === undefined && <CheckIcon className="ml-auto" />}
                </CommandItem>
              )}
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.label}
                  keywords={[option.value]}
                  onSelect={() => choose(option.value)}
                >
                  {option.label}
                  {value === option.value && <CheckIcon className="ml-auto" />}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { LanguageCombobox }
