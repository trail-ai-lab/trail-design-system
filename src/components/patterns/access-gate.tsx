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
          <>
            <CardHeader className="items-center text-center">
              <ShieldAlertIcon className="mb-2 size-8 text-destructive" />
              <CardTitle className="text-h3">
                Couldn&apos;t verify your access
              </CardTitle>
              <CardDescription>
                {errorDetail ?? "Something went wrong. Please try again."}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" onClick={onRetry}>
                Try again
              </Button>
            </CardFooter>
          </>
        )}

        {status === "unverified" && (
          <>
            <CardHeader className="items-center text-center">
              <MailWarningIcon className="mb-2 size-8 text-muted-foreground" />
              <CardTitle className="text-h3">Verify your email</CardTitle>
              <CardDescription>
                Confirm {email ?? "your email address"} using the link we sent,
                then check again.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button className="w-full" onClick={onRetry}>
                Check again
              </Button>
            </CardFooter>
          </>
        )}

        {status === "pending" && (
          <CardHeader className="items-center text-center">
            <ClockIcon className="mb-2 size-8 text-muted-foreground" />
            <CardTitle className="text-h3">Request pending</CardTitle>
            <CardDescription>
              Your request is being reviewed. You&apos;ll get access once
              it&apos;s approved.
            </CardDescription>
          </CardHeader>
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
                onChange={(event) => setMessage(event.target.value)}
              />
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
