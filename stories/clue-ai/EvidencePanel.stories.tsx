import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  EvidenceFigure,
  EvidencePanel,
  EvidenceSection,
} from "@/components/clue-ai/evidence-panel"
import { DetailList } from "@/components/patterns/detail-list"
import { DOCUMENTS, citedBy } from "./_case-fixtures"
import shoes from "./assets/suspect-shoes.jpg"

const meta: Meta<typeof EvidencePanel> = {
  title: "ClueAI/EvidencePanel",
  component: EvidencePanel,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex h-160 w-full max-w-md flex-col">
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof EvidencePanel>

export const Voicemail: Story = {
  args: {
    document: DOCUMENTS.voicemail.document,
    citedBy: citedBy("voicemail"),
    onClose: () => {},
    children: DOCUMENTS.voicemail.body("fl_2"),
  },
}

export const Interview: Story = {
  args: {
    document: DOCUMENTS.interview.document,
    citedBy: citedBy("interview"),
    onClose: () => {},
    children: DOCUMENTS.interview.body("fl_4"),
  },
}

export const Record: Story = {
  args: {
    document: DOCUMENTS.demographics.document,
    citedBy: citedBy("demographics"),
    onClose: () => {},
    children: DOCUMENTS.demographics.body(),
  },
}

export const Photo: Story = {
  args: {
    document: {
      id: "footprints",
      title: "Footprint match",
      fileName: "Forensics_Footprints.pdf",
      kind: "photo",
    },
    citedBy: [4],
    onClose: () => {},
    children: (
      <>
        <EvidenceFigure
          src={shoes}
          alt="Loafers recovered from Eddie Raymond's room"
          caption="Exhibit 14 — loafers recovered from Eddie Raymond's room."
        />
        <EvidenceSection title="Forensics">
          <DetailList
            items={[
              { label: "Found", value: "Below the study window" },
              { label: "Match", value: "Size 10 loafer, worn heel" },
              { label: "Confidence", value: "Partial match" },
            ]}
          />
        </EvidenceSection>
      </>
    ),
  },
}

export const NoSourceOpen: Story = { args: { document: null } }
