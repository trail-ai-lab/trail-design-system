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

/**
 * Side panel for changing language settings on an active session.
 */
function LanguageSettingsSheet({
  open,
  onOpenChange,
  value,
  onChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  value?: LanguageSettingsValue
  onChange?: (value: LanguageSettingsValue) => void
  children?: React.ReactNode
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children}
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading">Language settings</SheetTitle>
          <SheetDescription>
            Changes may take up to 5 minutes to apply to active recordings.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-4 pb-6">
          <LanguageSettingsForm value={value} onChange={onChange} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { LanguageSettingsSheet }
