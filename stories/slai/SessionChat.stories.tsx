import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  SessionChatCard,
  type ChatMessage,
} from "@/components/slai/session-chat"

const MESSAGES: ChatMessage[] = [
  {
    id: "1",
    role: "user",
    content: "Which group is closest to identifying acceleration?",
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Group 1 — Aarav linked a steeper ramp angle to the ball speeding up, and the group is now timing runs at three angles.",
  },
  {
    id: "3",
    role: "user",
    content: "Any misconceptions I should address?",
  },
]

const meta: Meta<typeof SessionChatCard> = {
  title: "SLAI/SessionChat",
  component: SessionChatCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  decorators: [
    // Full-height component: needs a sized parent or h-full collapses.
    (Story) => (
      <div className="h-[420px] w-full max-w-md">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SessionChatCard>

export const Empty: Story = {
  args: {
    messages: [],
    scopeLabel: "Group 2",
    className: "h-full",
    suggestions: ["Which group needs help?", "Summarize misconceptions"],
  },
}

export const Conversation: Story = {
  args: {
    messages: MESSAGES.slice(0, 2),
    scopeLabel: "All groups",
    className: "h-full",
  },
}

export const Loading: Story = {
  args: {
    messages: MESSAGES,
    scopeLabel: "Group 1",
    loading: true,
    className: "h-full",
  },
}

export const WithWelcomeAndDisclaimer: Story = {
  args: {
    messages: [],
    scopeLabel: "Group 1",
    className: "h-full",
    welcomeMessage: "Hi! Ask me anything about what Group 1 has discussed.",
    showDisclaimer: true,
  },
}

/** Answers can cite sources, and a `highlight` makes the answer clickable so
 * the transcript can scroll to the sentence it came from. */
export const WithSourcesAndHighlight: Story = {
  args: {
    scopeLabel: "Group 1",
    className: "h-full",
    onMessageClick: () => {},
    messages: [
      { id: "1", role: "user", content: "Who mentioned friction?" },
      {
        id: "2",
        role: "assistant",
        content: "Student 2 brought up friction when comparing the ramps.",
        highlight: "entry-4",
        sources: ["Group 1 · 10:44 AM", "Group 3 · 10:51 AM"],
      },
    ],
  },
}
