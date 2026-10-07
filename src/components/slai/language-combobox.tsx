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

/**
 * Searchable single-select language picker. `noneLabel` adds a leading
 * option that clears the value — e.g. "Original" for a translation picker
 * (show the untranslated text) or "None" for an optional second language.
 */
function LanguageCombobox({
  value,
  onValueChange,
  languages,
  placeholder = "Select a language...",
  noneLabel,
  disabled = false,
  id,
  className,
}: {
  value?: string
  /** Receives `undefined` when the `noneLabel` option is chosen */
  onValueChange: (value: string | undefined) => void
  languages: string[]
  placeholder?: string
  noneLabel?: string
  disabled?: boolean
  id?: string
  className?: string
}) {
  const [open, setOpen] = React.useState(false)
  const label = value ?? (noneLabel && value === undefined ? noneLabel : undefined)

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
          <CommandInput placeholder="Search languages..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {noneLabel && (
                <CommandItem value={noneLabel} onSelect={() => choose(undefined)}>
                  {noneLabel}
                  {value === undefined && <CheckIcon className="ml-auto" />}
                </CommandItem>
              )}
              {languages.map((language) => (
                <CommandItem
                  key={language}
                  value={language}
                  onSelect={() => choose(language)}
                >
                  {language}
                  {value === language && <CheckIcon className="ml-auto" />}
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
