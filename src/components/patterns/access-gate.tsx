"use client"

import * as React from "react"
import { ClockIcon, MailWarningIcon, ShieldAlertIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Skeleton } from "@/components/ui/skeleton"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"

export type AccessGateStatus =
  "loading" | "error" | "unverified" | "pending" | "none"

/**
 * Full-screen gate shown before a signed-in user can use a tool. One card
 * for each access state: checking (`loading`), couldn't check (`error`),
 * email not verified (`unverified`), request submitted (`pending`), and the
 * request-access form (`none`). Render the app instead once access is
 * granted.
 */
function AccessGate({
  status,
  email,
  errorDetail,
  onRetry,
  onSubmit,
  submitting = false,
  submitError,
  messageMaxLength,
  className,
}: {
  status: AccessGateStatus
  /** Signed-in address, shown so users spot the wrong account */
  email?: string
  errorDetail?: string
  /** Retry the access check (`error`) or re-check verification (`unverified`) */
  onRetry?: () => void
  /** Submit an access request with an optional note */
  onSubmit?: (message: string) => void
  submitting?: boolean
  submitError?: string
  /** Longest message the request accepts; shows a character count */
  messageMaxLength?: number
  className?: string
}) {
  const [message, setMessage] = React.useState("")

  return (
    <div
      data-slot="access-gate"
      className={
        className ??
        "flex min-h-svh items-center justify-center bg-background p-6"
      }
    >
      <Card className="w-full max-w-md">
        {status === "loading" && (
          <CardContent className="flex flex-col gap-3" aria-busy>
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        )}

        {status === "error" && (
          <CardContent className="p-0">
            <Empty className="p-4" role="alert">
              <EmptyHeader>
                <EmptyMedia
                  variant="icon"
                  className="bg-destructive/10 text-destructive"
                >
                  <ShieldAlertIcon />
                </EmptyMedia>
                <EmptyTitle>Couldn&apos;t verify your access</EmptyTitle>
                <EmptyDescription>
                  {errorDetail ?? "Something went wrong. Please try again."}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={onRetry}>Try again</Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        )}

        {status === "unverified" && (
          <CardContent className="p-0">
            <Empty className="p-4">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <MailWarningIcon />
                </EmptyMedia>
                <EmptyTitle>Verify your email</EmptyTitle>
                <EmptyDescription>
                  Confirm {email ?? "your email address"} using the link we
                  sent, then check again.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button onClick={onRetry}>Check again</Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        )}

        {status === "pending" && (
          <CardContent className="p-0">
            <Empty className="p-4">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <ClockIcon />
                </EmptyMedia>
                <EmptyTitle>Request pending</EmptyTitle>
                <EmptyDescription>
                  Your request is being reviewed. You&apos;ll get access once
                  it&apos;s approved.
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        )}

        {status === "none" && (
          <form
            onSubmit={(event) => {
              event.preventDefault()
              onSubmit?.(message.trim())
            }}
            className="contents"
          >
            <CardHeader className="text-center">
              <CardTitle className="text-h3">Request access</CardTitle>
              <CardDescription>
                {email ? (
                  <>
                    Signed in as{" "}
                    <span className="font-medium text-foreground">{email}</span>
                    .
                  </>
                ) : (
                  "You don't have access to this tool yet."
                )}{" "}
                Tell us a bit about how you&apos;d use it.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Textarea
                aria-label="Message"
                placeholder="Optional message"
                rows={4}
                disabled={submitting}
                value={message}
                maxLength={messageMaxLength}
                onChange={(event) => setMessage(event.target.value)}
              />
              {messageMaxLength !== undefined && (
                <p
                  aria-live="polite"
                  className="text-right text-xs text-muted-foreground tabular-nums"
                >
                  {message.length}/{messageMaxLength}
                </p>
              )}
              {submitError && (
                <Alert variant="destructive">
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting && <Spinner data-icon="inline-start" />}
                {submitting ? "Submitting…" : "Request access"}
              </Button>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  )
}

export { AccessGate }
