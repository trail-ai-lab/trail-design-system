"use client"

import * as React from "react"
import { CheckIcon, CopyIcon, ExternalLinkIcon, RefreshCwIcon } from "lucide-react"
import QRCode from "react-qr-code"

import { Button } from "@/components/ui/button"
import { FieldLabel } from "@/components/ui/field"
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

/**
 * QR code + join link for students to enter the session.
 * Usable standalone (e.g. projected full screen) or inside the sheet below.
 */
function InvitePanel({
  joinUrl,
  onGenerateNewLink,
  className,
}: {
  joinUrl: string
  onGenerateNewLink?: () => void
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(joinUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — leave state unchanged
    }
  }

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-3">
        {/* QR quiet zone must stay white in both themes or scanners fail */}
        <div className="rounded-3xl border border-border bg-white p-6">
          <QRCode value={joinUrl} size={192} aria-label="Session join QR code" />
        </div>
        <p className="text-sm text-muted-foreground">
          Scan with a mobile device to join
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <FieldLabel htmlFor="slai-join-link">Join link</FieldLabel>
        <InputGroup>
          <InputGroupInput
            id="slai-join-link"
            readOnly
            value={joinUrl}
            className="font-mono text-xs"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              size="icon-xs"
              aria-label="Copy join link"
              onClick={copyLink}
            >
              {copied ? <CheckIcon className="text-primary" /> : <CopyIcon />}
            </InputGroupButton>
            <InputGroupButton size="icon-xs" aria-label="Open join link" asChild>
              <a href={joinUrl} target="_blank" rel="noreferrer">
                <ExternalLinkIcon />
              </a>
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </div>

      <Button
        variant="outline"
        className="mt-4 w-full"
        onClick={onGenerateNewLink}
      >
        <RefreshCwIcon data-icon="inline-start" />
        Generate new link
      </Button>
    </div>
  )
}

/**
 * Side panel wrapping the invite QR code and join link.
 */
function InviteStudentsSheet({
  open,
  onOpenChange,
  joinUrl,
  onGenerateNewLink,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  joinUrl: string
  onGenerateNewLink?: () => void
  children?: React.ReactNode
}) {
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
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <InvitePanel joinUrl={joinUrl} onGenerateNewLink={onGenerateNewLink} />
        </div>
      </SheetContent>
    </Sheet>
  )
}

export { InvitePanel, InviteStudentsSheet }
