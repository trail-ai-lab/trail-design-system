import { ArrowUpRight, Download, FileText, PlayCircle } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export type Resource =
  | { type: "tool"; id: string; title: string; description?: string; image: string; link: string; hideLink?: boolean }
  | { type: "video"; id: string; title: string; description?: string; youtubeUrl: string }
  | { type: "pdf"; id: string; title: string; fileUrl: string }
  | { type: "dataset"; id: string; title: string; description?: string; downloadUrl: string }
  | { type: "workshop" | "tutorial"; id: string; title: string; description?: string; conference: string; year: number; link: string; status: "upcoming" | "past" }

export interface ResourceCardProps {
  resource: Resource
}

export function ResourceCard({ resource }: ResourceCardProps) {
  if (resource.type === "tool") {
    return (
      <div className="flex flex-col overflow-hidden rounded-4xl border border-border bg-card">
        <div className="aspect-video bg-muted bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-[length:20px_20px]" />
        <div className="flex flex-1 flex-col gap-2 p-6">
          <h3 className="font-heading text-lg text-foreground">{resource.title}</h3>
          {resource.description ? (
            <p className="text-sm leading-relaxed text-muted-foreground">
              {resource.description}
            </p>
          ) : null}
          {!resource.hideLink ? (
            <a
              href={resource.link}
              className="mt-auto inline-flex items-center gap-1 pt-2 text-sm font-medium text-primary hover:underline"
            >
              Visit tool
              <ArrowUpRight className="size-3.5" />
            </a>
          ) : null}
        </div>
      </div>
    )
  }

  if (resource.type === "video") {
    return (
      <div className="flex flex-col gap-3 rounded-4xl border border-border bg-card p-6">
        <div className="flex aspect-video items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <PlayCircle className="size-10" strokeWidth={1.25} />
        </div>
        <h3 className="font-heading text-lg text-foreground">{resource.title}</h3>
        {resource.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {resource.description}
          </p>
        ) : null}
      </div>
    )
  }

  if (resource.type === "pdf") {
    return (
      <a
        href={resource.fileUrl}
        className="flex items-center gap-3 rounded-4xl border border-border bg-card p-6 transition-colors hover:bg-accent"
      >
        <FileText className="size-5 shrink-0 text-primary" />
        <span className="flex-1 text-sm font-medium text-foreground">{resource.title}</span>
        <span className="text-xs font-medium text-primary">Download PDF</span>
      </a>
    )
  }

  if (resource.type === "dataset") {
    return (
      <div className="flex flex-col gap-3 rounded-4xl border border-border bg-card p-6">
        <h3 className="font-heading text-lg text-foreground">{resource.title}</h3>
        {resource.description ? (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {resource.description}
          </p>
        ) : null}
        <a
          href={resource.downloadUrl}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <Download className="size-3.5" />
          Download dataset
        </a>
      </div>
    )
  }

  return (
    <a
      href={resource.link}
      className="flex flex-col gap-3 rounded-4xl border border-border bg-card p-6 transition-colors hover:bg-accent"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
          {resource.conference} · {resource.year}
        </span>
        <Badge variant={resource.status === "upcoming" ? "default" : "secondary"}>
          {resource.status === "upcoming" ? "Upcoming" : "Past"}
        </Badge>
      </div>
      <h3 className="font-heading text-lg text-foreground">{resource.title}</h3>
      {resource.description ? (
        <p className="text-sm leading-relaxed text-muted-foreground">
          {resource.description}
        </p>
      ) : null}
    </a>
  )
}
