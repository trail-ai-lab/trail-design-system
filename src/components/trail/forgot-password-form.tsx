"use client"

import * as React from "react"
import { MailCheckIcon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

/**
 * Request a password-reset email. Moves from `idle` to `sending` to `sent`
 * (a confirmation view with a way back to sign-in).
 */
function ForgotPasswordForm({
  status = "idle",
  onSubmit,
  error,
  loginHref,
  className,
}: {
  status?: "idle" | "sending" | "sent"
  onSubmit: (email: string) => void
  error?: string
  loginHref?: string
  className?: string
}) {
  const [email, setEmail] = React.useState("")

  if (status === "sent") {
    return (
      <Card className={className}>
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-muted">
            <MailCheckIcon className="size-6" />
          </div>
          <CardTitle className="font-heading text-xl">Check your email</CardTitle>
          <CardDescription>
            If an account exists for {email || "that address"}, we sent a link
            to reset your password.
          </CardDescription>
        </CardHeader>
        {loginHref && (
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <a href={loginHref}>Back to sign in</a>
            </Button>
          </CardContent>
        )}
      </Card>
    )
  }

  const sending = status === "sending"
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="font-heading text-xl">Forgot password?</CardTitle>
        <CardDescription>
          Enter your email and we&apos;ll send you a reset link.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit(email.trim())
          }}
        >
          <FieldGroup>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Field>
              <FieldLabel htmlFor="auth-forgot-email">Email</FieldLabel>
              <Input
                id="auth-forgot-email"
                type="email"
                autoComplete="email"
                required
                disabled={sending}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Field>
            <Button type="submit" disabled={sending}>
              {sending && <Spinner data-icon="inline-start" />}
              {sending ? "Sending..." : "Send reset link"}
            </Button>
            {loginHref && (
              <p className="text-center text-sm text-muted-foreground">
                <a
                  href={loginHref}
                  className="text-foreground underline underline-offset-4"
                >
                  Back to sign in
                </a>
              </p>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export { ForgotPasswordForm }
