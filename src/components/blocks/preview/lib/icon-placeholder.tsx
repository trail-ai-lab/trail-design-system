"use client"

import * as LucideIcons from "lucide-react"
import { SquareIcon } from "lucide-react"

export function IconPlaceholder({
  lucide,
  ...props
}: {
  lucide?: string
  tabler?: string
  hugeicons?: string
  phosphor?: string
  remixicon?: string
} & React.ComponentProps<"svg">) {
  if (!lucide) return <SquareIcon {...props} />
  const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<React.ComponentProps<"svg">>>)[lucide]
  if (!Icon) return <SquareIcon {...props} />
  return <Icon {...props} />
}
