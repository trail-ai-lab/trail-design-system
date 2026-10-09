"use client"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  LanguageSettingsForm,
  type LanguageSettingsValue,
} from "@/components/slai/language-settings-form"
import type { LanguageOptions } from "@/components/slai/lib/language-option"

/**
 * Side panel for changing language settings on an active session.
 */
function LanguageSettingsSheet({
  open,
  defaultOpen,
  onOpenChange,
  value,
  defaultValue,
  onValueChange,
  languages,
  spokenLanguages,
  translationLanguages,
  showProfanityFilter,
  description = "Changes may take up to 5 minutes to apply to active recordings.",
  children,
}: {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
  value?: LanguageSettingsValue
  defaultValue?: LanguageSettingsValue
  onValueChange?: (value: LanguageSettingsValue) => void
  /** Language lists, passed to `LanguageSettingsForm` */
  languages?: LanguageOptions
  spokenLanguages?: LanguageOptions
  translationLanguages?: LanguageOptions
  showProfanityFilter?: boolean
  /** Line under the title */
  description?: string
  /** Optional trigger, e.g. <SheetTrigger asChild><Button/></SheetTrigger> */
  children?: React.ReactNode
}) {
  return (
    <Sheet open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {children}
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading">Language settings</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 pt-1 pb-6">
          <LanguageSettingsForm
            value={value}
            defaultValue={defaultValue}
            onValueChange={onValueChange}
            languages={languages}
            spokenLanguages={spokenLanguages}
            translationLanguages={translationLanguages}
            showProfanityFilter={showProfanityFilter}
          />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { LanguageSettingsSheet }
