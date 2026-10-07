"use client"

import { MailIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"

/**
 * "Verify your email" screen. Shows the address, a resend button with a
 * cooldown countdown, and an "I've verified" check. `linkProcessing` covers
 * arriving from the emailed link; without an `email` it falls back to a
 * prompt to sign in again.
 */
function VerifyEmailCard({
  email,
  sending = false,
  checking = false,
  linkProcessing = false,
  cooldownSeconds = 0,
  sentOnce = false,
  onResend,
  onCheck,
  onLogin,
  className,
}: {
  email?: string
  sending?: boolean
  checking?: boolean
  linkProcessing?: boolean
  /** Seconds until resend is allowed again; 0 enables the button */
  cooldownSeconds?: number
  /** A verification email has already been (re)sent this visit */
  sentOnce?: boolean
  onResend?: () => void
  onCheck?: () => void
  onLogin?: () => void
  className?: string
}) {
  if (linkProcessing) {
    return (
      <Card className={className}>
        <CardHeader className="items-center text-center">
          <Spinner className="mb-2 size-6" />
          <CardTitle className="font-heading text-xl">
            Verifying your email...
          </CardTitle>
          <CardDescription>This only takes a moment.</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (!email) {
    return (
      <Card className={className}>
        <CardHeader className="items-center text-center">
          <CardTitle className="font-heading text-xl">Sign in again</CardTitle>
          <CardDescription>
            We couldn&apos;t find your session. Sign in to continue verifying
            your email.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button className="w-full" onClick={onLogin}>
            Go to sign in
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const cooling = cooldownSeconds > 0
  return (
    <Card className={className}>
      <CardHeader className="items-center text-center">
        <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted">
          <MailIcon className="size-6" />
        </div>
        <CardTitle className="font-heading text-xl">Verify your email</CardTitle>
        <CardDescription>
          We sent a verification link to{" "}
          <span className="font-medium text-foreground">{email}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Button disabled={checking} onClick={onCheck}>
          {checking && <Spinner data-icon="inline-start" />}
          {checking ? "Checking..." : "I've verified my email"}
        </Button>
        <Button
          variant="outline"
          disabled={sending || cooling}
          onClick={onResend}
        >
          {sending && <Spinner data-icon="inline-start" />}
          {sending
            ? "Sending..."
            : cooling
              ? `Resend in ${cooldownSeconds}s`
              : sentOnce
                ? "Resend again"
                : "Resend verification email"}
        </Button>
      </CardContent>
      {sentOnce && (
        <CardFooter className="justify-center text-sm text-muted-foreground">
          Email sent. Check your spam folder if you don&apos;t see it.
        </CardFooter>
      )}
    </Card>
  )
}

export { VerifyEmailCard }
