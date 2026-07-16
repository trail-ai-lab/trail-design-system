import { Frown } from "lucide-react"

import { Button } from "@/components/ui/button"

export interface NotFoundProps {
  homeHref?: string
}

export function NotFound({ homeHref = "/" }: NotFoundProps) {
  return (
    <div className="flex min-h-[32rem] flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <Frown className="size-10 text-muted-foreground" strokeWidth={1.25} />
      <h1 className="font-heading text-3xl tracking-tight text-foreground">
        Oops, page not found!
      </h1>
      <p className="max-w-xl text-lg text-muted-foreground">
        I apologize for any inconvenience caused. It seems that you are trying to access a
        page that has either been deleted or never existed.
      </p>
      <Button size="lg" className="mt-4" asChild>
        <a href={homeHref}>Back to home</a>
      </Button>
    </div>
  )
}
