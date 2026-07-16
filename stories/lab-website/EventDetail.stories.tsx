import type { Meta, StoryObj } from "@storybook/nextjs"

import { EventDetail } from "@/components/lab-website/event-detail"

const meta: Meta<typeof EventDetail> = {
  title: "LabWebsite/EventDetail",
  component: EventDetail,
  parameters: { layout: "fullscreen" },
  args: {
    event: {
      title: "Stakeholder-Driven Contextual Evaluation of Language Models in Education",
      conference: "AIED 2026",
      year: 2026,
      status: "upcoming",
      about: [
        "Large language models are increasingly deployed in education, yet standard benchmarks rarely capture what matters to the people who use them.",
      ],
      topics: ["Stakeholder elicitation", "Contextual bias auditing"],
      importantDates: [{ label: "Tutorial session", date: "Jul 2026" }],
      schedule: [{ duration: "0:00", title: "Welcome & framing" }],
      organizers: [{ name: "Shamya Karumbaiah", affiliation: "UW–Madison", href: "/people/shamya-karumbaiah" }],
      toolLink: { label: "Try AIBAT", href: "https://trail.wcer.wisc.edu/aibat" },
    },
  },
}
export default meta

type Story = StoryObj<typeof EventDetail>

export const Default: Story = {}
