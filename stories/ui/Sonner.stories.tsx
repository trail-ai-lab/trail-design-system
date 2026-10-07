import type { Meta, StoryObj } from "@storybook/nextjs"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/sonner"

const meta: Meta<typeof Toaster> = {
  title: "UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Toaster>

/** Every toast kind used across the apps. Mount `<Toaster />` once at the root. */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success("Session started")}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast.error("Couldn't upload recording")}>
        Error
      </Button>
      <Button variant="outline" onClick={() => toast.info("Link copied")}>
        Info
      </Button>
      <Button variant="outline" onClick={() => toast.warning("Audio may be too noisy")}>
        Warning
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast("Check your email", {
            description: "We sent a verification link to your inbox.",
          })
        }
      >
        With description
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "Uploading…",
            success: "Uploaded",
            error: "Failed",
          })
        }
      >
        Promise
      </Button>
    </div>
  ),
}
