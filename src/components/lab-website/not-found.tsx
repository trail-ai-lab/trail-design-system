import { Frown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"

export interface NotFoundProps {
  homeHref?: string
  className?: string
}

/**
 * 404 page content — icon, message, and a "back home" action. Pair with
 * Header/Footer the same as any other page.
 */
export function NotFound({ homeHref = "/", className }: NotFoundProps) {
  return (
    <Empty className={cn("min-h-[32rem] px-6 py-24", className)}>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Frown />
        </EmptyMedia>
        <EmptyTitle className="text-3xl">Oops, page not found!</EmptyTitle>
        <EmptyDescription className="text-lg">
          I apologize for any inconvenience caused. It seems that you are trying to access a
          page that has either been deleted or never existed.
        </EmptyDescription>
      </EmptyHeader>
      <Button size="lg" className="mt-4" asChild>
        <a href={homeHref}>Back to home</a>
      </Button>
    </Empty>
  )
}
