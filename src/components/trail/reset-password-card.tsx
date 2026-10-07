"use client"

import * as React from "react"
import { LinkIcon } from "lucide-react"

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
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"

export type ResetPasswordStatus =
  | "validating"
  | "invalid"
  | "ready"
  | "submitting"
  | "done"

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
  className,
}: {
  status: ResetPasswordStatus
  onSubmit?: (password: string) => void
  onRequestNewLink?: () => void
  error?: string
  className?: string
}) {
  const [password, setPassword] = React.useState("")
  const [confirm, setConfirm] = React.useState("")
  const tooShort = password.length > 0 && password.length < 6
  const mismatch = confirm.length > 0 && confirm !== password
  const valid = password.length >= 6 && password === confirm

  if (status === "validating" || status === "done") {
    return (
      <Card className={className}>
        <CardHeader className="items-center text-center">
          {status === "validating" ? (
            <Spinner className="mb-2 size-6" />
          ) : null}
          <CardTitle className="font-heading text-xl">
            {status === "validating"
              ? "Checking your link..."
              : "Password updated"}
          </CardTitle>
          <CardDescription>
            {status === "validating"
              ? "One moment while we verify your reset link."
              : "Redirecting you to sign in..."}
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (status === "invalid") {
    return (
      <Card className={className}>
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <LinkIcon className="size-6" />
          </div>
          <CardTitle className="font-heading text-xl">Link expired</CardTitle>
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
        <CardTitle className="font-heading text-xl">Set a new password</CardTitle>
        <CardDescription>Choose a password you haven&apos;t used here.</CardDescription>
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
              <FieldLabel htmlFor="auth-new-password">New password</FieldLabel>
              <Input
                id="auth-new-password"
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
              <FieldLabel htmlFor="auth-confirm-password">
                Confirm password
              </FieldLabel>
              <Input
                id="auth-confirm-password"
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
              {submitting ? "Saving..." : "Reset password"}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export { ResetPasswordCard }
