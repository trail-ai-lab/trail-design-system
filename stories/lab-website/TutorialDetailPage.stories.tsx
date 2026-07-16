import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { EventDetail, type EventDetailData } from "@/components/lab-website/event-detail"
import { ROUTES } from "@/components/lab-website/lib/routes"

const TUTORIAL: EventDetailData = {
  title: "Stakeholder-Driven Contextual Evaluation of Language Models in Education",
  conference: "AIED 2026",
  year: 2026,
  status: "upcoming",
  about: [
    "Large language models are increasingly deployed in education, yet standard benchmarks rarely capture what matters to the teachers, students, and administrators who actually use them.",
    "This tutorial introduces AIBAT, a framework for stakeholder-driven contextual evaluation, and walks participants through applying it to their own education AI use case.",
    "Participants will leave with a working evaluation rubric grounded in the values of the stakeholders they design for.",
  ],
  topics: [
    "Stakeholder elicitation methods",
    "Contextual bias auditing",
    "Rubric co-design with educators",
    "Applying AIBAT to a live LLM",
    "Reporting findings to non-technical audiences",
    "Limitations of benchmark-only evaluation",
  ],
  importantDates: [
    { label: "Tutorial session", date: "Jul 2026" },
  ],
  schedule: [
    { duration: "0:00", title: "Welcome & framing", description: "Why standard benchmarks miss classroom context." },
    { duration: "0:20", title: "Introducing AIBAT", description: "Walkthrough of the evaluation framework." },
    { duration: "1:00", title: "Hands-on stakeholder elicitation" },
    { duration: "1:40", title: "Applying AIBAT to a live model" },
    { duration: "2:20", title: "Reporting & discussion" },
  ],
  organizers: [
    { name: "Shamya Karumbaiah", affiliation: "UW–Madison", href: "/people/shamya-karumbaiah" },
    { name: "Kaycie Barron", affiliation: "UW–Madison", href: "/people/kaycie-barron" },
  ],
  toolLink: { label: "Try AIBAT", href: "https://trail.wcer.wisc.edu/aibat" },
}

function TutorialDetailPage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/resources" />
      <EventDetail event={TUTORIAL} />
      <Footer />
    </div>
  )
}

const meta: Meta<typeof TutorialDetailPage> = {
  title: "LabWebsite/Pages/TutorialDetail",
  component: TutorialDetailPage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof TutorialDetailPage>

export const Default: Story = {}
