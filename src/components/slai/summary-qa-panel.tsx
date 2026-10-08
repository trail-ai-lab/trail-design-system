"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SessionChatCard } from "@/components/slai/session-chat"
import { SummaryCard } from "@/components/slai/summary-card"

export type SummaryQaTab = "summary" | "qa"

/**
 * The AI side panel shared by Live and Session review: Summary and Q&A as tabs,
 * always in the left-hand column (AI on the left, content on the right).
 */
function SummaryQaPanel({
  summary,
  chat,
  value,
  defaultValue = "summary",
  onValueChange,
  className,
}: {
  /** Props for the Summary tab's SummaryCard */
  summary: React.ComponentProps<typeof SummaryCard>
  /** Props for the Q&A tab's SessionChatCard */
  chat: React.ComponentProps<typeof SessionChatCard>
  value?: SummaryQaTab
  defaultValue?: SummaryQaTab
  onValueChange?: (value: SummaryQaTab) => void
  className?: string
}) {
  return (
    <Tabs
      data-slot="summary-qa-panel"
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(next as SummaryQaTab)}
      className={cn("min-h-0", className)}
    >
      <TabsList className="w-full">
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="qa">Q&amp;A</TabsTrigger>
      </TabsList>
      <TabsContent value="summary" className="min-h-0">
        <SummaryCard {...summary} className={cn("h-full", summary.className)} />
      </TabsContent>
      <TabsContent value="qa" className="min-h-0">
        <SessionChatCard {...chat} className={cn("h-full", chat.className)} />
      </TabsContent>
    </Tabs>
  )
}

export { SummaryQaPanel }
