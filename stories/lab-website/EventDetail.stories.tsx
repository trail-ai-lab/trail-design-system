import type { Meta, StoryObj } from "@storybook/nextjs"

import { EventDetail } from "@/components/lab-website/event-detail"

const meta: Meta<typeof EventDetail> = {
  title: "LabWebsite/EventDetail",
  component: EventDetail,
  tags: ["autodocs"],
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

export const FullDetails: Story = {
  args: {
    event: {
      title: "Bias Auditing for AI Tutoring Systems",
      conference: "AIED 2026",
      year: 2026,
      status: "upcoming",
      about: [
        "This tutorial walks participants through a full stakeholder-driven bias audit of a deployed AI tutoring system, from elicitation to remediation.",
      ],
      conferenceInfo: {
        name: "27th International Conference on Artificial Intelligence in Education",
        venue: "Palais des Congrès",
        city: "Montreal",
        country: "Canada",
        dates: "Jul 14–18, 2026",
        theme: "AI in Education for a Sustainable Future",
        link: "https://www.aied2026.org",
      },
      session: {
        code: "T4",
        location: "Room 517D",
        date: "Jul 15, 2026",
        time: "1:30 PM – 5:00 PM",
      },
      callForParticipation: [
        "We invite researchers, practitioners, and graduate students working on AI in education to attend. No prior bias-auditing experience is required.",
      ],
      topics: ["Stakeholder elicitation", "Contextual bias auditing", "Remediation workflows"],
      importantDates: [
        { label: "Early registration", date: "Jun 1, 2026" },
        { label: "Tutorial session", date: "Jul 15, 2026" },
      ],
      submissionGuidelines: {
        intro: "Position statements are optional but encouraged for participants who want feedback during the working session.",
        types: [
          { title: "Position statement", description: "A one-page summary of a bias concern in your own AI deployment." },
          { title: "Dataset walkthrough", description: "A short walkthrough of a dataset you'd like audited live." },
        ],
        format: ["PDF, max 2 pages", "Anonymized submission not required"],
        portalLink: "https://cmt3.research.microsoft.com/AIED2026",
        portalLabel: "Submission portal",
      },
      schedule: [
        { duration: "0:00", title: "Welcome & framing", description: "Overview of the audit lifecycle." },
        { duration: "0:30", title: "Stakeholder elicitation exercise" },
        { duration: "1:30", title: "Hands-on audit of a sample dataset" },
      ],
      relatedPapers: [
        {
          id: "paper-1",
          title: "Reliability Issues in Current Approaches to Identify and Mitigate AI Bias",
          publisher: "NSF · Google",
          year: 2025,
          link: "https://example.org/paper-1",
        },
      ],
      organizers: [
        {
          name: "Shamya Karumbaiah",
          affiliation: "UW–Madison",
          href: "/people/shamya-karumbaiah",
          image: "https://i.pravatar.cc/128?img=5",
        },
        { name: "Jung Woo Chun", affiliation: "UW–Madison", href: "/people/jung-woo-chun" },
      ],
      toolLink: { label: "Try AIBAT", href: "https://trail.wcer.wisc.edu/aibat" },
    },
    actions: (
      <span className="inline-flex items-center rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground">
        RSVP
      </span>
    ),
  },
}
