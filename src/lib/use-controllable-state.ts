import * as React from "react"

/**
 * State that a parent may control (`value` + `onChange`) or leave to the
 * component (`defaultValue`), the Radix convention for `value` /
 * `defaultValue` / `onValueChange` and `open` / `defaultOpen` /
 * `onOpenChange`. `onChange` fires in both modes.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T
  defaultValue: T
  onChange?: (value: T) => void
}): [T, (next: T) => void] {
  const [internal, setInternal] = React.useState(defaultValue)
  const isControlled = value !== undefined
  const current = isControlled ? value : internal

  const setValue = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  return [current, setValue]
}
