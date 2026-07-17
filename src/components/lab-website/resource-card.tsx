import { ArrowUpRight, Download, FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

export type Resource =
  | { variant: "tool"; id: string; title: string; description?: string; image: string; link: string; hideLink?: boolean }
  | { variant: "video"; id: string; title: string; description?: string; youtubeUrl: string }
  | { variant: "pdf"; id: string; title: string; fileUrl: string }
  | { variant: "dataset"; id: string; title: string; description?: string; downloadUrl: string }
  | { variant: "workshop" | "tutorial"; id: string; title: string; description?: string; conference: string; year: number; link: string; status: "upcoming" | "past" }

export interface ResourceCardProps {
  resource: Resource
  className?: string
}

/**
 * Card for one resource in a grid on the Resources page — `variant`
 * determines the layout (tool/video/pdf/dataset/workshop/tutorial). For a
 * research project card, use ResearchCard; for an academic citation list,
 * use PublicationList.
 */
export function ResourceCard({ resource, className }: ResourceCardProps) {
  if (resource.variant === "tool") {
    return (
      <Card className={cn("pt-0", className)}>
        <div className="aspect-video bg-muted bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-[length:20px_20px]" />
        <CardContent className="flex flex-1 flex-col gap-2">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          {resource.description ? (
            <CardDescription className="leading-relaxed">
              {resource.description}
            </CardDescription>
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
        </CardContent>
      </Card>
    )
  }

  if (resource.variant === "video") {
    const embedUrl = resource.youtubeUrl.replace("watch?v=", "embed/")
    return (
      <Card className={className}>
        <CardContent className="flex flex-col gap-3">
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <iframe
              src={embedUrl}
              title={resource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          </div>
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          {resource.description ? (
            <CardDescription className="leading-relaxed">
              {resource.description}
            </CardDescription>
          ) : null}
        </CardContent>
      </Card>
    )
  }

  if (resource.variant === "pdf") {
    return (
      <Card className={cn("relative transition-colors hover:bg-accent", className)}>
        <a
          href={resource.fileUrl}
          className="absolute inset-0"
          aria-label={`Download PDF: ${resource.title}`}
        />
        <CardContent className="flex items-center gap-3">
          <FileText className="size-5 shrink-0 text-primary" />
          <span className="flex-1 text-sm font-medium text-foreground">{resource.title}</span>
          <span className="text-xs font-medium text-primary">Download PDF</span>
        </CardContent>
      </Card>
    )
  }

  if (resource.variant === "dataset") {
    return (
      <Card className={className}>
        <CardContent className="flex flex-1 flex-col gap-3">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          {resource.description ? (
            <CardDescription className="leading-relaxed">
              {resource.description}
            </CardDescription>
          ) : null}
          <a
            href={resource.downloadUrl}
            className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            <Download className="size-3.5" />
            Download dataset
          </a>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn("relative transition-colors hover:bg-accent", className)}>
      <a href={resource.link} className="absolute inset-0" aria-label={resource.title} />
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {resource.conference} · {resource.year}
          </span>
          <Badge variant={resource.status === "upcoming" ? "default" : "secondary"}>
            {resource.status === "upcoming" ? "Upcoming" : "Past"}
          </Badge>
        </div>
        <CardTitle className="text-lg">{resource.title}</CardTitle>
        {resource.description ? (
          <CardDescription className="leading-relaxed">
            {resource.description}
          </CardDescription>
        ) : null}
      </CardContent>
    </Card>
  )
}
