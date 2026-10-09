/**
 * A language choice: `value` is what's stored and reported (e.g. a BCP-47
 * code like "en-US"), `label` is what people see ("English (US)").
 */
export interface LanguageOption {
  value: string
  label: string
}

/**
 * Languages offered by a picker. A plain string is both value and label, so
 * simple lists like `["English", "Spanish"]` keep working.
 */
export type LanguageOptions = ReadonlyArray<string | LanguageOption>

export function toLanguageOptions(options: LanguageOptions): LanguageOption[] {
  return options.map((option) =>
    typeof option === "string" ? { value: option, label: option } : option
  )
}

/** The label for a stored value; the value itself when it isn't listed. */
export function languageLabel(options: LanguageOption[], value: string) {
  return options.find((option) => option.value === value)?.label ?? value
}
