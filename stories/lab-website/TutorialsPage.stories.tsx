import type { Meta, StoryObj } from "@storybook/react-vite"

import { Header } from "@/components/lab-website/header"
import { LabFooter } from "@/components/lab-website/lab-footer"
import { labFooterDemoProps } from "./lab-footer-demo-props"
import { PageHeader } from "@/components/lab-website/page-header"
import {
  EventCard,
  type EventCardItem,
} from "@/components/lab-website/event-card"
import { ROUTES } from "@/components/lab-website/lib/routes"

const UPCOMING: EventCardItem[] = [
  {
    id: "tutorial-aibat-aied2026",
    title:
      "Stakeholder-Driven Contextual Evaluation of Language Models in Education",
    conference: "AIED 2026",
    year: 2026,
    status: "upcoming",
    href: "/tutorials/tutorial-aibat-aied2026",
  },
]

function TutorialsPage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/resources" />

      <PageHeader
        eyebrow="Tutorials"
        title="Hands-on sessions we're running."
        description="Conference tutorials led by the lab on evaluating and auditing AI systems for education."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <h2 className="text-h3 text-foreground">Upcoming</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {UPCOMING.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      <LabFooter {...labFooterDemoProps} />
    </div>
  )
}

const meta: Meta<typeof TutorialsPage> = {
  title: "LabWebsite/Pages/Tutorials",
  component: TutorialsPage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof TutorialsPage>

export const Default: Story = {}
