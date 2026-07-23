"use client"

import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export interface ModeToggleProps {
  className?: string
}

/**
 * Light/dark/system theme switcher. Requires a `next-themes` `ThemeProvider`
 * higher in the tree — this component only calls `useTheme()`.
 */
export function ModeToggle({ className }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={cn(className)} aria-label="Change theme">
          {theme === "dark" ? <Moon /> : <Sun />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-4">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Theme</p>
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
