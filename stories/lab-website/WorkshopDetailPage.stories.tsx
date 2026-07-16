import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { EventDetail, type EventDetailData } from "@/components/lab-website/event-detail"
import { ROUTES } from "@/components/lab-website/lib/routes"

const WORKSHOP: EventDetailData = {
  title: "Stakeholder-Driven Contextual Evaluation of Language Models in Education",
  conference: "AIED 2026",
  year: 2026,
  status: "upcoming",
  about: [
    "This workshop brings together researchers and practitioners working on the evaluation of language models for education, with an emphasis on methods that center the people affected by these systems.",
    "We invite submissions describing evaluation frameworks, case studies, and position papers on the limits of current benchmarking practice.",
  ],
  topics: [
    "Stakeholder-centered evaluation",
    "Bias auditing in education AI",
    "Case studies from deployed systems",
    "Position papers on benchmark limitations",
  ],
  importantDates: [
    { label: "Submission deadline", date: "TBD" },
    { label: "Notification", date: "TBD" },
    { label: "Workshop date", date: "TBD" },
  ],
  schedule: [
    { duration: "0:00", title: "Opening remarks" },
    { duration: "0:15", title: "Paper session 1" },
    { duration: "1:00", title: "Panel discussion" },
    { duration: "1:45", title: "Paper session 2" },
    { duration: "2:30", title: "Closing & next steps" },
  ],
  organizers: [
    { name: "Shamya Karumbaiah", affiliation: "UW–Madison", href: "/people/shamya-karumbaiah" },
    { name: "Kaycie Barron", affiliation: "UW–Madison", href: "/people/kaycie-barron" },
  ],
}

function WorkshopDetailPage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/resources" />
      <EventDetail event={WORKSHOP} />
      <Footer />
    </div>
  )
}

const meta: Meta<typeof WorkshopDetailPage> = {
  title: "LabWebsite/Pages/WorkshopDetail",
  component: WorkshopDetailPage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof WorkshopDetailPage>

export const Default: Story = {}
