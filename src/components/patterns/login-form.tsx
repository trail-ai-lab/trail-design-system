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
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { GoogleButton } from "@/components/patterns/google-button"

/**
 * Email + password sign-in with a Google option. Presentational: the app
 * owns authentication and passes back `loading`, `googleLoading` and
 * `error`. Hide Google by omitting `onGoogle`.
 */
function LoginForm({
  onSubmit,
  onGoogle,
  loading = false,
  googleLoading = false,
  error,
  forgotPasswordHref,
  signupHref,
  className,
}: {
  onSubmit: (values: { email: string; password: string }) => void
  onGoogle?: () => void
  loading?: boolean
  googleLoading?: boolean
  error?: string
  forgotPasswordHref?: string
  signupHref?: string
  className?: string
}) {
  const uid = React.useId()
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const busy = loading || googleLoading

  return (
    <Card className={className}>
      <CardHeader className="text-center">
        <CardTitle className="text-h3">Welcome back</CardTitle>
        <CardDescription>Sign in to continue</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            onSubmit({ email: email.trim(), password })
          }}
        >
          <FieldGroup>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Field>
              <FieldLabel htmlFor={`${uid}-email`}>Email</FieldLabel>
              <Input
                id={`${uid}-email`}
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
              <div className="flex items-center">
                <FieldLabel htmlFor={`${uid}-password`}>Password</FieldLabel>
                {forgotPasswordHref && (
                  <a
                    href={forgotPasswordHref}
                    className="ml-auto text-sm text-muted-foreground underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </a>
                )}
              </div>
              <Input
                id={`${uid}-password`}
                type="password"
                autoComplete="current-password"
                required
                disabled={busy}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Field>
            <Button type="submit" disabled={busy}>
              {loading && <Spinner data-icon="inline-start" />}
              {loading ? "Signing in…" : "Sign in"}
            </Button>
            {onGoogle && (
              <>
                <FieldSeparator>or continue with</FieldSeparator>
                <GoogleButton
                  loading={googleLoading}
                  disabled={loading}
                  onClick={onGoogle}
                />
              </>
            )}
            {signupHref && (
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <a
                  href={signupHref}
                  className="text-foreground underline underline-offset-4"
                >
                  Sign up
                </a>
              </p>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export { LoginForm }
