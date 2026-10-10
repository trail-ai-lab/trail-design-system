"use client"

import * as React from "react"
import { CheckCircle2Icon } from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

export type ResetPasswordStatus =
  "validating" | "invalid" | "ready" | "submitting" | "done"

/**
 * Set a new password from an emailed link. `validating` while the link is
 * checked, `invalid` for an expired or used link (offers a new one), `ready`
 * and `submitting` for the form, `done` once saved. Validates length (6+)
 * and that both entries match before submitting.
 */
function ResetPasswordCard({
  status,
  onSubmit,
  onRequestNewLink,
  error,
  email,
  className,
}: {
  status: ResetPasswordStatus
  /** The account being reset, named in the form's description when known */
  email?: string
  onSubmit?: (password: string) => void
  onRequestNewLink?: () => void
  error?: string
  className?: string
}) {
  const uid = React.useId()
  const [password, setPassword] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const tooShort = password.length > 0 && password.length < 6
  const mismatch = confirm.length > 0 && confirm !== password
  const valid = password.length >= 6 && password === confirm

  if (status === "validating" || status === "done") {
    return (
      <Card className={className}>
        <CardContent className="p-0">
          <Empty className="p-4" role="status">
            <EmptyHeader>
              {status === "validating" ? (
                <EmptyMedia variant="icon">
                  <Spinner />
                </EmptyMedia>
              ) : (
                <EmptyMedia
                  variant="icon"
                  className="bg-success/10 text-success"
                >
                  <CheckCircle2Icon />
                </EmptyMedia>
              )}
              <EmptyTitle>
                {status === "validating"
                  ? "Checking your link…"
                  : "Password updated"}
              </EmptyTitle>
              <EmptyDescription>
                {status === "validating"
                  ? "One moment while we verify your reset link."
                  : "Redirecting you to sign in…"}
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        </CardContent>
      </Card>
    )
  }

  if (status === "invalid") {
    return (
      <Card className={className}>
        <CardHeader className="items-center text-center">
          <CardTitle className="text-h3">Link expired</CardTitle>
          <CardDescription>
            {error ?? "This reset link is invalid or has already been used."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full" onClick={onRequestNewLink}>
            Request a new link
          </Button>
        </CardContent>
      </Card>
    )
  }

  const submitting = status === "submitting"
  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="text-h3">Set a new password</CardTitle>
        <CardDescription>
          {email ? (
            <>
              Choose a new password for{" "}
              <span className="font-medium text-foreground">{email}</span>.
            </>
          ) : (
            "Choose a password you haven't used here."
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (valid) onSubmit?.(password)
          }}
        >
          <FieldGroup>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Field data-invalid={tooShort || undefined}>
              <FieldLabel htmlFor={`${uid}-new-password`}>
                New password
              </FieldLabel>
              <Input
                id={`${uid}-new-password`}
                type="password"
                autoComplete="new-password"
                aria-invalid={tooShort}
                disabled={submitting}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {tooShort ? (
                <FieldError>Use at least 6 characters.</FieldError>
              ) : (
                <FieldDescription>At least 6 characters.</FieldDescription>
              )}
            </Field>
            <Field data-invalid={mismatch || undefined}>
              <FieldLabel htmlFor={`${uid}-confirm-password`}>
                Confirm password
              </FieldLabel>
              <Input
                id={`${uid}-confirm-password`}
                type="password"
                autoComplete="new-password"
                aria-invalid={mismatch}
                disabled={submitting}
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
              />
              {mismatch && <FieldError>Passwords don&apos;t match.</FieldError>}
            </Field>
            <Button type="submit" disabled={!valid || submitting}>
              {submitting && <Spinner data-icon="inline-start" />}
              {submitting ? "Saving…" : "Reset password"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export { ResetPasswordCard }
