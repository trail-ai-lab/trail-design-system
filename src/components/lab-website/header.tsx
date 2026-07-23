"use client"

import * as React from "react"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Logo } from "@/components/trail"

export interface NavRoute {
  path: string
  label: string
}

export interface HeaderProps {
  logoText?: string
  routes: NavRoute[]
  activePath?: string
  className?: string
}

/**
 * Site-wide nav bar with logo and route links, highlighting the active
 * route via `activePath`. Rendered once per page, typically first.
 */
export function Header({
  logoText = "TRAIL Lab",
  routes,
  activePath = "/",
  className,
}: HeaderProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur",
        className
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="/" className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-foreground">
          <Logo className="h-7 text-primary" />
          {logoText}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {routes.map((route) => (
            <a
              key={route.path}
              href={route.path}
              data-active={route.path === activePath}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-foreground"
            >
              {route.label}
            </a>
          ))}
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>{logoText}</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-6 pb-6">
              {routes.map((route) => (
                <SheetClose key={route.path} asChild>
                  <a
                    href={route.path}
                    data-active={route.path === activePath}
                    className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground data-[active=true]:bg-accent data-[active=true]:text-foreground"
                  >
                    {route.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
          </SheetContent>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Menu />
          </Button>
        </Sheet>
      </div>
    </header>
  )
}
