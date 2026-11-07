"use client"

import * as React from "react"
import {
  CheckIcon,
  CopyIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
} from "lucide-react"
import QRCode from "react-qr-code"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ConfirmDialog } from "@/components/patterns/confirm-dialog"

/**
 * QR code + join link for students to enter the session.
 * Usable standalone (e.g. projected full screen) or inside the sheet below.
 * Without a `joinUrl` (the link is still being created) it shows placeholders
 * and "Generating link…", with the link actions disabled.
 */
function InvitePanel({
  joinUrl,
  onGenerateNewLink,
  className,
}: {
  /** Omit while the link is being created */
  joinUrl?: string
  onGenerateNewLink?: () => void
  className?: string
}) {
  const uid = React.useId()
  const [copied, setCopied] = React.useState(false)

  const copyLink = async () => {
    if (!joinUrl) return
    try {
      await navigator.clipboard.writeText(joinUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — leave state unchanged
    }
  }

  return (
    <div data-slot="invite-panel" className={className}>
      <div className="flex flex-col items-center gap-3">
        {/* QR quiet zone must stay white in both themes or scanners fail */}
        {/* eslint-disable-next-line trail/no-raw-colors -- QR codes need a white background to scan */}
        <div className="rounded-3xl border border-border bg-white p-6">
          {joinUrl ? (
            <QRCode
              value={joinUrl}
              size={192}
              aria-label="Session join QR code"
            />
          ) : (
            <Skeleton className="size-48" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          Scan with a mobile device to join
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <FieldLabel htmlFor={`${uid}-join-link`}>Join link</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id={`${uid}-join-link`}
            readOnly
            value={joinUrl ?? ""}
            placeholder="Generating link…"
            className="font-mono text-xs"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Copy join link"
              disabled={!joinUrl}
              onClick={copyLink}
            >
              {copied ? <CheckIcon className="text-primary" /> : <CopyIcon />}
            </InputGroupButton>
            {joinUrl && (
              <InputGroupButton
                size="icon-xs"
                aria-label="Open join link"
                asChild
              >
                <a href={joinUrl} target="_blank" rel="noreferrer">
                  <ExternalLinkIcon />
                </a>
              </InputGroupButton>
            )}
          </InputGroupAddon>
        </InputGroup>
      </div>

      <ConfirmDialog
        trigger={
          <Button variant="outline" className="mt-4 w-full" disabled={!joinUrl}>
            <RefreshCwIcon data-icon="inline-start" />
            Generate new link
          </Button>
        }
        variant="default"
        title="Generate a new link?"
        description="The current link and QR code will stop working. Students who haven't joined yet will need the new one."
        confirmLabel="Generate new link"
        onConfirm={() => onGenerateNewLink?.()}
      />
    </div>
  )
}

/**
 * Side panel wrapping the invite QR code and join link. With
 * `onVoiceSamplesEnabledChange`, a switch also lets students record their own
 * voiceprints when they join.
 */
function InviteStudentsSheet({
  open,
  onOpenChange,
  joinUrl,
  onGenerateNewLink,
  voiceSamplesEnabled = false,
  onVoiceSamplesEnabledChange,
  voiceSamplesRecorded,
  voiceSamplesTotal,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Omit while the link is being created */
  joinUrl?: string
  onGenerateNewLink?: () => void
  /** Students can record their own voiceprints in this session */
  voiceSamplesEnabled?: boolean
  /** Shows the switch */
  onVoiceSamplesEnabledChange?: (enabled: boolean) => void
  /** Students on the roster with a voiceprint, shown while the switch is on */
  voiceSamplesRecorded?: number
  /** Students on the roster */
  voiceSamplesTotal?: number
  children?: React.ReactNode
}) {
  const voiceSwitchId = React.useId()
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {children}
      <SheetContent className="flex w-full flex-col gap-0 sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="font-heading">Invite students</SheetTitle>
          <SheetDescription>
            Share the link or have students scan the QR code to join this
            session.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto px-6 pt-1 pb-6">
          <InvitePanel
            joinUrl={joinUrl}
            onGenerateNewLink={onGenerateNewLink}
          />
          {onVoiceSamplesEnabledChange && (
            <Field orientation="horizontal" className="mt-6 border-t pt-6">
              <FieldContent>
                <FieldLabel htmlFor={voiceSwitchId}>
                  Let students record their voiceprints
                </FieldLabel>
                <FieldDescription>
                  Turn this on only if students have agreed to be recorded. They
                  pick their name and record on the join page. You can listen to
                  or delete any voiceprint on the Students page.
                </FieldDescription>
                {voiceSamplesEnabled && voiceSamplesTotal !== undefined && (
                  <FieldDescription className="font-medium text-foreground tabular-nums">
                    {voiceSamplesRecorded ?? 0} of {voiceSamplesTotal} students
                    recorded
                  </FieldDescription>
                )}
              </FieldContent>
              <Switch
                id={voiceSwitchId}
                checked={voiceSamplesEnabled}
                onCheckedChange={onVoiceSamplesEnabledChange}
              />
            </Field>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { InvitePanel, InviteStudentsSheet }
