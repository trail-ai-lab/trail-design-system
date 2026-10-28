"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import type { ButtonSize } from "@/lib/types"
import { Button } from "@/components/ui/button"

export interface ModeToggleProps {
  /** Button size; `icon-sm` fits dense app headers */
  size?: Extract<ButtonSize, "icon" | "icon-sm">
  className?: string
}

/**
 * One-click light/dark switch. Each click flips the theme currently shown, so
 * a `system` default (the provider's `defaultTheme`) applies until the first
 * click. Requires a `next-themes` `ThemeProvider` with `attribute="class"`
 * higher in the tree — this component only calls `useTheme()`.
 */
export function ModeToggle({ size = "icon", className }: ModeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <Button
      data-slot="mode-toggle"
      variant="ghost"
      size={size}
      className={cn(className)}
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {/* Icons switch with the `dark` class so server and client render the same. */}
      <Sun className="dark:hidden" />
      <Moon className="hidden dark:block" />
    </Button>
  )
}
