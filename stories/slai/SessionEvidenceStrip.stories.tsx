import type { Meta, StoryObj } from "@storybook/nextjs"

import {
  SessionEvidenceCard,
  SessionEvidenceStrip,
} from "@/components/slai/session-evidence-strip"
import { LIAM, MEI } from "./_student-fixtures"

const meta: Meta<typeof SessionEvidenceStrip> = {
  title: "SLAI/SessionEvidenceStrip",
  component: SessionEvidenceStrip,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: { sessions: MEI.sessions, standardLabel: "CCSS" },
  decorators: [
    (Story) => (
      <div className="w-full max-w-3xl">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof SessionEvidenceStrip>

export const Default: Story = {}

export const NativeEnglish: Story = { args: { sessions: LIAM.sessions } }

export const SingleCard: Story = {
  render: () => (
    <SessionEvidenceCard
      session={MEI.sessions[2]}
      standardLabel="CCSS"
      isLatest
    />
  ),
}
