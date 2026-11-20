"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { StatusBadge } from "@/components/patterns/status-badge"
import { useClueAiLabels } from "./lib/labels"

/**
 * The case opener, styled as a front page: a "Breaking news" kicker and
 * masthead, the headline, a photo and the story. `facts` sits under the story
 * (e.g. the coroner's report as an Alert); `children` is the footer — usually
 * Sherlock's challenge and the button to take the case.
 */
function BreakingNewsCard({
  masthead,
  dateline,
  headline,
  imageUrl,
  imageAlt = "",
  imageCaption,
  facts,
  children,
  className,
  body,
}: {
  /** Paper name, e.g. "The London Ledger" */
  masthead: string
  /** e.g. "Harpe Estate, Surrey · Friday" */
  dateline?: string
  headline: React.ReactNode
  imageUrl?: string
  imageAlt?: string
  imageCaption?: React.ReactNode
  /** The story, as paragraphs */
  body?: React.ReactNode
  /** Under the story, e.g. the coroner's report */
  facts?: React.ReactNode
  /** Card footer */
  children?: React.ReactNode
  className?: string
}) {
  const labels = useClueAiLabels()
  return (
    <Card data-slot="breaking-news-card" className={cn("gap-0", className)}>
      <CardContent className="flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <StatusBadge tone="primary" dot pulse>
            {labels.breakingNews.kicker}
          </StatusBadge>
          {dateline && (
            <span className="text-caption text-muted-foreground">
              {dateline}
            </span>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p className="font-heading text-label tracking-widest text-muted-foreground uppercase">
            {masthead}
          </p>
          <h1 className="text-h2 text-balance md:text-h1">{headline}</h1>
        </div>
        <Separator />
        <div className={cn("grid gap-5", imageUrl && "md:grid-cols-5")}>
          {imageUrl && (
            <figure className="flex flex-col gap-2 md:col-span-2">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="aspect-4/5 w-full rounded-2xl bg-muted object-cover"
              />
              {imageCaption && (
                <figcaption className="text-caption text-muted-foreground">
                  {imageCaption}
                </figcaption>
              )}
            </figure>
          )}
          <div className="flex flex-col gap-4 md:col-span-3">
            <div className="flex flex-col gap-3 text-body text-pretty text-muted-foreground [&_p:first-child]:text-foreground">
              {body}
            </div>
            {facts}
          </div>
        </div>
      </CardContent>
      {children && (
        <>
          <Separator className="mt-(--card-spacing)" />
          <CardFooter className="pt-(--card-spacing)">{children}</CardFooter>
        </>
      )}
    </Card>
  )
}

export { BreakingNewsCard }
