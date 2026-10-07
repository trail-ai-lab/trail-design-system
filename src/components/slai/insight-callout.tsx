import { InfoIcon, TriangleAlertIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"

/**
 * Highlighted note for an auto-generated insight. `variant="warning"` flags
 * something needing the teacher's attention (amber); `info` is neutral (blue).
 */
function InsightCallout({
  variant = "info",
  children,
  className,
}: {
  variant?: "info" | "warning"
  children: React.ReactNode
  className?: string
}) {
  const warning = variant === "warning"
  const Icon = warning ? TriangleAlertIcon : InfoIcon
  return (
    <Alert
      className={cn(
        warning
          ? "border-status-paused/40 bg-status-paused/10 text-status-paused"
          : "border-status-uploaded/40 bg-status-uploaded/10 text-status-uploaded",
        className
      )}
    >
      <Icon />
      <AlertDescription
        className={warning ? "text-status-paused" : "text-status-uploaded"}
      >
        {children}
      </AlertDescription>
    </Alert>
  )
}

export { InsightCallout }
