import type { Meta, StoryObj } from "@storybook/react-vite"

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

// a11y: scrollable-region-focusable disabled. Upstream: Radix ScrollArea's viewport isn't keyboard-focusable.
const A11Y = {
  config: {
    rules: [{ id: "scrollable-region-focusable", enabled: false }],
  },
}

const meta: Meta<typeof SessionChatCard> = {
  title: "SLAI/SessionChat",
  component: SessionChatCard,
  tags: ["autodocs"],
  parameters: { layout: "padded", a11y: A11Y },
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

/** Answers cite course materials (with page or slide) alongside transcript sources. */
export const MaterialCitations: Story = {
  args: {
    scopeLabel: "Group 1",
    className: "h-full",
    materials: { ready: 3, processing: 1 },
    onMaterialsClick: () => {},
    messages: [
      {
        id: "1",
        role: "user",
        content: "Is Group 1's explanation of acceleration correct?",
      },
      {
        id: "2",
        role: "assistant",
        content:
          "Mostly. They say a steeper ramp makes the ball faster, which matches the Unit 3 slides, but they haven't separated speed from acceleration yet — the lab handout asks them to compare times over equal distances to see it.",
        sources: ["Group 1 · 3:40 PM"],
        materials: [
          { name: "Unit 3 — Forces and motion.pptx", location: "slide 14" },
          { name: "Inclined plane lab handout.docx", location: "p. 2" },
        ],
      },
    ],
  },
}

/** No materials yet: the header says answers use the transcript only and links to add some. */
export const NoMaterials: Story = {
  args: {
    messages: [],
    scopeLabel: "All groups",
    className: "h-full",
    materials: { ready: 0 },
    onMaterialsClick: () => {},
    suggestions: ["Which group needs help?", "Summarize misconceptions"],
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
