import { ArrowUpRight, Download, FileText } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CardLink } from "@/components/patterns/card-link"
import { IconTile } from "@/components/patterns/icon-tile"
import { EventStatusBadge, type EventStatus } from "./event-status-badge"

export type Resource =
  | {
      variant: "tool"
      id: string
      title: string
      description?: string
      image: string
      link: string
      hideLink?: boolean
    }
  | {
      variant: "video"
      id: string
      title: string
      description?: string
      youtubeUrl: string
    }
  | { variant: "pdf"; id: string; title: string; fileUrl: string }
  | {
      variant: "dataset"
      id: string
      title: string
      description?: string
      downloadUrl: string
    }
  | {
      variant: "workshop" | "tutorial"
      id: string
      title: string
      description?: string
      conference: string
      year: number
      link: string
      status: EventStatus
    }

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
        {/* The dotted pattern is the empty/loading state; the screenshot sits on
            top of it when the resource has one. Card is overflow-hidden, so the
            top corners clip without any rounding here. */}
        <div className="aspect-video bg-muted bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-[length:20px_20px]">
          {resource.image ? (
            <img
              src={resource.image}
              alt=""
              loading="lazy"
              className="size-full object-cover"
            />
          ) : null}
        </div>
        <CardHeader>
          <CardTitle>{resource.title}</CardTitle>
          {resource.description ? (
            <CardDescription className="leading-relaxed">
              {resource.description}
            </CardDescription>
          ) : null}
        </CardHeader>
        {!resource.hideLink ? (
          <CardFooter className="mt-auto">
            <Button variant="link" className="h-auto px-0" asChild>
              <a href={resource.link}>
                Visit tool
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Button>
          </CardFooter>
        ) : null}
      </Card>
    )
  }

  if (resource.variant === "video") {
    const embedUrl = resource.youtubeUrl.replace("watch?v=", "embed/")
    return (
      <Card className={className}>
        <CardContent>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
            <iframe
              src={embedUrl}
              title={resource.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 size-full"
            />
          </div>
        </CardContent>
        <CardHeader>
          <CardTitle>{resource.title}</CardTitle>
          {resource.description ? (
            <CardDescription className="leading-relaxed">
              {resource.description}
            </CardDescription>
          ) : null}
        </CardHeader>
      </Card>
    )
  }

  if (resource.variant === "pdf") {
    return (
      <Card
        className={cn("relative transition-colors hover:bg-accent", className)}
      >
        <CardLink
          href={resource.fileUrl}
          label={`Download PDF: ${resource.title}`}
        />
        <CardContent className="flex items-center gap-3">
          <IconTile variant="primary" size="sm">
            <FileText />
          </IconTile>
          <span className="flex-1 text-sm font-medium text-foreground">
            {resource.title}
          </span>
          <span className="text-xs font-medium text-primary">Download PDF</span>
        </CardContent>
      </Card>
    )
  }

  if (resource.variant === "dataset") {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>{resource.title}</CardTitle>
          {resource.description ? (
            <CardDescription className="leading-relaxed">
              {resource.description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardFooter className="mt-auto">
          <Button variant="link" className="h-auto px-0" asChild>
            <a href={resource.downloadUrl}>
              <Download data-icon="inline-start" />
              Download dataset
            </a>
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card
      className={cn("relative transition-colors hover:bg-accent", className)}
    >
      <CardLink href={resource.link} label={resource.title} />
      <CardHeader>
        <CardDescription className="font-mono text-xs tracking-wider uppercase">
          {resource.conference} · {resource.year}
        </CardDescription>
        <CardTitle>{resource.title}</CardTitle>
        <CardAction>
          <EventStatusBadge status={resource.status} />
        </CardAction>
      </CardHeader>
      {resource.description ? (
        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {resource.description}
          </p>
        </CardContent>
      ) : null}
    </Card>
  )
}
