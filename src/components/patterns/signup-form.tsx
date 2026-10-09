"use client"

import * as React from "react"

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
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { GoogleButton } from "@/components/patterns/google-button"
import { AppLink } from "@/components/patterns/link-provider"

/** Create-account form: name, email, password (min 6) and Google. */
function SignupForm({
  onSubmit,
  onGoogle,
  loading = false,
  googleLoading = false,
  error,
  loginHref,
  description = "Get started in a minute",
  className,
}: {
  onSubmit: (values: { name: string; email: string; password: string }) => void
  onGoogle?: () => void
  loading?: boolean
  googleLoading?: boolean
  error?: string
  loginHref?: string
  /** Line under the title, e.g. "Sign up to access SLAI and other TRAIL Lab tools" */
  description?: React.ReactNode
  className?: string
}) {
  const uid = React.useId()
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const busy = loading || googleLoading

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="text-h3">Create an account</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit({ name: name.trim(), email: email.trim(), password })
          }}
        >
          <FieldGroup>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Field>
              <FieldLabel htmlFor={`${uid}-name`}>Full name</FieldLabel>
              <Input
                id={`${uid}-name`}
                autoComplete="name"
                required
                disabled={busy}
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${uid}-signup-email`}>Email</FieldLabel>
              <Input
                id={`${uid}-signup-email`}
                type="email"
                autoComplete="email"
                placeholder="you@school.edu"
                required
                disabled={busy}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`${uid}-signup-password`}>
                Password
              </FieldLabel>
              <Input
                id={`${uid}-signup-password`}
                type="password"
                autoComplete="new-password"
                minLength={6}
                required
                disabled={busy}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <FieldDescription>At least 6 characters.</FieldDescription>
            </Field>
            <Button type="submit" disabled={busy}>
              {loading && <Spinner data-icon="inline-start" />}
              {loading ? "Creating account…" : "Create account"}
            </Button>
            {onGoogle && (
              <>
                {/* The label masks the line with a background; on a card that must be
                    the card color, or it shows as a box in dark mode. */}
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                  or continue with
                </FieldSeparator>
                <GoogleButton
                  loading={googleLoading}
                  disabled={loading}
                  onClick={onGoogle}
                />
              </>
            )}
            {loginHref && (
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <AppLink
                  href={loginHref}
                  className="text-foreground underline underline-offset-4"
                >
                  Sign in
                </AppLink>
              </p>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export { SignupForm }
