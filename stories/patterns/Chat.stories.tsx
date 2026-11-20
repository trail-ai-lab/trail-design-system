import type { Meta, StoryObj } from "@storybook/react-vite"
import { SparklesIcon } from "lucide-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  ChatComposer,
  ChatLog,
  ChatRow,
  ChatTypingRow,
} from "@/components/patterns/chat"

const AVATAR = (
  <Avatar size="sm" aria-hidden>
    <AvatarFallback>
      <SparklesIcon className="size-3 text-primary" />
    </AvatarFallback>
  </Avatar>
)

const meta: Meta<typeof ChatLog> = {
  title: "Patterns/Chat",
  component: ChatLog,
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ChatLog>

export const Conversation: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ChatLog>
        <ChatRow from="self">Which group is closest to the answer?</ChatRow>
        <ChatRow
          from="other"
          avatar={AVATAR}
          header={
            <Badge
              variant="outline"
              className="font-normal text-muted-foreground"
            >
              Transcript
            </Badge>
          }
          footer={
            <span className="text-xs text-muted-foreground">2 sources</span>
          }
        >
          Group 1 — they linked a steeper ramp to the ball speeding up.
        </ChatRow>
        <ChatTypingRow avatar={AVATAR} label="Replying" />
      </ChatLog>
      <ChatComposer
        placeholder="Ask a question…"
        onSend={() => {}}
        toolbar={<span>Transcript only</span>}
      />
    </div>
  ),
}

export const ComposerDisabled: Story = {
  render: () => (
    <ChatComposer placeholder="Chat is closed" disabled onSend={() => {}} />
  ),
}
