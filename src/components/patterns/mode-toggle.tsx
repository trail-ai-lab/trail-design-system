"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import type { ButtonSize } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionLabel } from "@/components/patterns/section-label"

export interface ModeToggleProps {
  /** Trigger button size; `icon-sm` fits dense app headers */
  size?: Extract<ButtonSize, "icon" | "icon-sm">
  className?: string
}

/**
 * Light/dark/system theme switcher. Requires a `next-themes` `ThemeProvider`
 * higher in the tree — this component only calls `useTheme()`.
 */
export function ModeToggle({ size = "icon", className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size={size}
          className={cn(className)}
          aria-label="Change theme"
        >
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <SectionLabel asChild>
          <p>Theme</p>
        </SectionLabel>
        <Tabs defaultValue={theme}>
          <TabsList className="w-full">
            <TabsTrigger value="light" onClick={() => setTheme("light")}>
              <Sun className="mr-1" />
              Light
            </TabsTrigger>
            <TabsTrigger value="dark" onClick={() => setTheme("dark")}>
              <Moon className="mr-1" />
              Dark
            </TabsTrigger>
            <TabsTrigger value="system" onClick={() => setTheme("system")}>
              <Monitor className="mr-1" />
              System
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </PopoverContent>
    </Popover>
  )
}
