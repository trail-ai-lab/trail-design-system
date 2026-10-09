import * as React from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/patterns/logo"

export interface AuthTool {
  name: string
  href: string
}

/**
 * Brand panel shown beside the auth forms: the lab mark, the tool's name and
 * tagline, and links to the lab's other tools. Hidden below `lg` by
 * AuthLayout.
 */
function AuthAside({
  toolName,
  title,
  tagline,
  homeHref,
  labName = "TRAIL Lab",
  tools = [],
  className,
}: {
  /** Short tool name, e.g. "SLAI" */
  toolName: string
  /** Expanded name, e.g. "Bridging Science and Language using AI" */
  title?: React.ReactNode
  tagline?: string
  homeHref?: string
  labName?: string
  /** Other lab tools to link to */
  tools?: AuthTool[]
  className?: string
}) {
  return (
    <aside
      data-slot="auth-aside"
      className={cn("flex h-full flex-col bg-muted p-8", className)}
    >
      <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
        <a href={homeHref} aria-label={`${labName} homepage`}>
          <Logo className="h-24 text-foreground" />
        </a>
        <h2 className="text-h2">
          {toolName}
          {title && (
            <>
              : <span className="text-muted-foreground">{title}</span>
            </>
          )}
        </h2>
        {tagline && (
          <p className="max-w-xl text-lg text-muted-foreground">{tagline}</p>
        )}
      </div>
      {tools.length > 0 && (
        <div className="flex flex-col items-center gap-4 pt-10">
          <h3 className="text-body-sm font-semibold">
            More tools from {labName}
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {tools.map((tool) => (
              <Button key={tool.name} asChild variant="outline" size="sm">
                <a href={tool.href}>{tool.name}</a>
              </Button>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

/**
 * Split-screen page for every auth route: the form on one side, the brand
 * `aside` (an AuthAside) on the other. The aside is hidden on small screens.
 * `header` sits at the top of the form side (e.g. a small logo link, so
 * phones still show the brand); `footer` sits under the form (e.g. a consent
 * note).
 */
function AuthLayout({
  aside,
  header,
  footer,
  children,
  className,
}: {
  aside?: React.ReactNode
  /** Top of the form side, e.g. a logo link */
  header?: React.ReactNode
  /** Under the form, e.g. a consent note */
  footer?: React.ReactNode
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      data-slot="auth-layout"
      className={cn("grid min-h-svh bg-background lg:grid-cols-2", className)}
    >
      <div className="flex flex-col gap-6 p-6 md:p-10">
        {header && <div className="flex justify-start">{header}</div>}
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <div className="w-full max-w-sm">{children}</div>
          {footer && (
            <div className="w-full max-w-sm text-center text-xs text-balance text-muted-foreground">
              {footer}
            </div>
          )}
        </div>
      </div>
      {aside && <div className="hidden lg:block">{aside}</div>}
    </div>
  )
}

export { AuthLayout, AuthAside }
