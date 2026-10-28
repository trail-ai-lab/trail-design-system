/**
 * What makes two names the same (a class name must be unique per teacher):
 * case and spacing are ignored, so "Grade 5  science" matches "grade 5 Science".
 */
export function nameKey(name: string): string {
  return name.split(/\s+/).filter(Boolean).join(" ").toLocaleLowerCase()
}

/** Whether `name` matches one of `names` by `nameKey`. */
export function isNameTaken(name: string, names: readonly string[]): boolean {
  const key = nameKey(name)
  return key.length > 0 && names.some((taken) => nameKey(taken) === key)
}
