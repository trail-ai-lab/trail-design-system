import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { PageHeader } from "@/components/lab-website/page-header"
import { ResearchCard } from "@/components/lab-website/research-card"
import { ROUTES } from "@/components/lab-website/lib/routes"

const RESEARCH_AREAS = [
  {
    index: "01",
    title:
      "Reliability Issues in Current Approaches to Identify and Mitigate AI Bias",
    funders: ["NSF", "Google"],
    href: "/research/research-1",
  },
  {
    index: "02",
    title:
      "Teachers as Mediators: Understanding Practices and Values to Support Human–AI Partnerships",
    funders: ["NSF", "Google"],
    href: "/research/research-3",
  },
  {
    index: "03",
    title:
      "Tools, Analytics, and Professional Development to Facilitate Teachers' Use of AI in Enacting Equitable Practices",
    funders: ["NSF", "Google"],
    href: "/research/research-4",
  },
]

function ResearchPage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/research" />

      <PageHeader
        eyebrow="Research"
        title="The questions we are working through."
        description="Our research spans AI bias auditing, teacher–AI partnership, and the analytics infrastructure needed to study classrooms responsibly."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {RESEARCH_AREAS.map((area) => (
              <ResearchCard key={area.index} research={area} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

const meta: Meta<typeof ResearchPage> = {
  title: "LabWebsite/Pages/Research",
  component: ResearchPage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof ResearchPage>

export const Default: Story = {}
