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
    messages: MESSAGES.slice(0, 2).map((message) =>
      message.role === "assistant"
        ? { ...message, grounding: "transcript" as const }
        : message
    ),
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

/** Answers cite course materials (with page or slide) alongside transcript
 * sources, in one list. A badge above each answer says what it drew on; a
 * material with an `excerpt` opens the cited passage. */
export const MaterialCitations: Story = {
  args: {
    scopeLabel: "Group 1",
    className: "h-full",
    materials: { ready: 3, processing: 1 },
    onMaterialsClick: () => {},
    defaultCurriculum: true,
    onCurriculumChange: () => {},
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
        grounding: "transcript-curriculum",
        sources: ["Group 1 · 3:40 PM"],
        materials: [
          {
            name: "Unit 3 — Forces and motion.pptx",
            location: "slide 14",
            excerpt:
              "Acceleration is how quickly velocity changes. On a steeper ramp, a larger share of gravity acts along the slope, so the ball's speed increases faster.",
          },
          {
            name: "Inclined plane lab handout.docx",
            section: "Part B > Equal distances",
            location: "p. 2",
            excerpt:
              "Mark three equal distances on the ramp and time each one. If the ball covers each later distance in less time, it is accelerating.",
          },
        ],
      },
    ],
  },
}

/** Long file names and section headings wrap in the opened list of sources. */
export const LongMaterialCitations: Story = {
  args: {
    scopeLabel: "Arcadia Long",
    className: "h-full",
    materials: { ready: 1 },
    onMaterialsClick: () => {},
    messages: [
      { id: "1", role: "user", content: "What is Lesson 16 about?" },
      {
        id: "2",
        role: "assistant",
        content:
          "The teacher edition says Lesson 16 asks students to design a cup system that slows energy transfer into the liquid inside it. In the recording, Alice connects this to the tinfoil reflecting heat.",
        sources: ["Alice", "Group 1 — Mei"],
        materials: [
          {
            name: "Teacher Edition  Lessons 16-18 with a very long file name.pdf",
            section:
              "LESSON 16: How can we design a cup system to slow energy transfer into the liquid inside it? > Lesson 16 • Learning Plan Snapshot",
            location: "p. 3",
            excerpt:
              "Students design a cup system that slows energy transfer into the liquid. They test materials and explain, using the particle model, why some layers slow the transfer more than others.",
          },
          { name: "Teacher Edition  Lessons 16-18.pdf", location: "p. 5" },
        ],
      },
    ],
  },
}

/** The row under the input: course materials on the left (with Manage), and
 * on the right a picker for what new answers draw on — transcript only (the
 * default) or transcript + curriculum. Each answer keeps the badge for what it
 * was answered from, so switching doesn't relabel earlier answers. */
export const CurriculumPicker: Story = {
  args: {
    scopeLabel: "Group 1",
    className: "h-full",
    materials: { ready: 3 },
    onMaterialsClick: () => {},
    onCurriculumChange: () => {},
    messages: [
      { id: "1", role: "user", content: "What is Group 1 testing?" },
      {
        id: "2",
        role: "assistant",
        content: "How the ramp's angle changes the time the ball takes.",
        grounding: "transcript",
        sources: ["Group 1 · 3:38 PM"],
      },
      { id: "3", role: "user", content: "Is that what the lab asks for?" },
      {
        id: "4",
        role: "assistant",
        content:
          "Partly. The lab handout asks them to time equal distances, not the whole ramp, so they can see the ball speeding up.",
        grounding: "transcript-curriculum",
        sources: ["Group 1 · 3:40 PM"],
        materials: [
          {
            name: "Inclined plane lab handout.docx",
            location: "p. 2",
            excerpt:
              "Mark three equal distances on the ramp and time each one. If the ball covers each later distance in less time, it is accelerating.",
          },
        ],
      },
    ],
  },
}

/** No materials yet: the line offers to add some, and the picker can't turn
 * curriculum on until there are. */
export const NoMaterials: Story = {
  args: {
    messages: [],
    scopeLabel: "All groups",
    className: "h-full",
    materials: { ready: 0 },
    onMaterialsClick: () => {},
    onCurriculumChange: () => {},
    suggestions: ["Which group needs help?", "Summarize misconceptions"],
  },
}

/** Without the picker (curriculum flag off), the line keeps saying what
 * answers use: "Transcript + 3 course materials". */
export const MaterialsWithoutPicker: Story = {
  args: {
    messages: [],
    scopeLabel: "All groups",
    className: "h-full",
    materials: { ready: 3 },
    onMaterialsClick: () => {},
  },
}

/** `showDisclaimer` is deprecated: it only shows when the row under the
 * input (materials, curriculum picker) isn't used. */
export const WithWelcomeAndDisclaimer: Story = {
  args: {
    messages: [],
    scopeLabel: "Group 1",
    className: "h-full",
    welcomeMessage: "Hi! Ask me anything about what Group 1 has discussed.",
    showDisclaimer: true,
  },
}

/** Answers list their sources under a count that opens them; with
 * `onSourceClick` each one is a button that shows that passage in the
 * transcript, and the answer text isn't clickable. An answer without sources
 * (older answers) keeps `onMessageClick` on its text. */
export const WithSourcesAndHighlight: Story = {
  args: {
    scopeLabel: "Group 1",
    className: "h-full",
    onMessageClick: () => {},
    onSourceClick: () => {},
    messages: [
      { id: "1", role: "user", content: "Who mentioned friction?" },
      {
        id: "2",
        role: "assistant",
        content: "Student 2 brought up friction when comparing the ramps.",
        highlight: "entry-4",
        sources: ["Group 1 · 10:44 AM", "Group 3 · 10:51 AM"],
      },
      { id: "3", role: "user", content: "What did they test first?" },
      {
        id: "4",
        role: "assistant",
        content: "They timed the ball on the shallowest ramp first.",
        highlight: "entry-2",
      },
    ],
  },
}

/** The count opens the list of cited passages and materials; with
 * `onSourceClick` each passage is a button (e.g. to show it in the transcript)
 * and the answer itself isn't. */
export const ClickableSources: Story = {
  args: {
    scopeLabel: "Team Beta",
    className: "h-full",
    welcomeMessage: "Hi, how can I help you today?",
    materials: { ready: 1 },
    onMaterialsClick: () => {},
    defaultCurriculum: true,
    onCurriculumChange: () => {},
    onMessageClick: () => {},
    onSourceClick: () => {},
    messages: [
      {
        id: "1",
        role: "user",
        content:
          "What is the conversation about? Summarize it in one line for the whole group.",
      },
      {
        id: "2",
        role: "assistant",
        content:
          "The conversation is about how gravity and air resistance affect falling objects, specifically exploring why heavier objects do not necessarily fall faster than lighter ones.",
        grounding: "transcript-curriculum",
        highlight: "The worksheet says objects fall because of gravity.",
        sources: [
          "Lucía: “The worksheet says objects fall because of gravity. But why do bigger things not always hit the ground first?”",
          "Aarav: “So gravity pulls everything equally, but other stuff like air resistance changes how fast things actually fall.”",
          "Mei: “Like a feather and a rock.”",
          "Lucía: “So the feather is slower because of the air, not because it is lighter?”",
          "Aarav: “Reflecta.”",
        ],
        materials: [
          {
            name: "Teacher Edition  Lessons 16-18.pdf",
            section: "Lesson 16 > Learning Plan Snapshot",
            location: "p. 3",
            excerpt:
              "Students explain that all objects fall at the same rate without air, and that air resistance is why a feather falls more slowly than a rock.",
          },
        ],
      },
    ],
  },
}
