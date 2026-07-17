import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { PageHeader } from "@/components/lab-website/page-header"
import { PublicationList, type Publication } from "@/components/lab-website/publication-list"
import { ROUTES } from "@/components/lab-website/lib/routes"

const PUBLICATIONS: Publication[] = [
  {
    id: "publication-9",
    title:
      "Multimodal Analytics for Collaborative Teacher Reflection of Human-AI Hybrid Teaching: Design Opportunities and Constraints",
    authors: ["Shamya Karumbaiah"],
    year: 2024,
    publisher: "Proceedings of the International Conference on Learning Analytics & Knowledge",
    link: "",
  },
  {
    id: "publication-6",
    title: "Optimizing philosophies for predictive models in learning analytics",
    authors: ["Shane Hutt", "Shamya Karumbaiah", "Joshua Ocumpaugh"],
    year: 2021,
    publisher: "Journal of Educational Data Mining",
    link: "",
  },
  {
    id: "publication-1",
    title:
      "Phishing training: A Preliminary Look at the Effects of Different Types of Training",
    authors: [
      "Shamya Karumbaiah",
      "Ryan T Wright",
      "Alexandra Durcikova",
      "Matthew L Jensen",
    ],
    year: 2016,
    publisher: "Proceedings of the 11th Pre-ICIS Workshop on Information Security and Privacy (WISP)",
    link: "https://core.ac.uk/download/pdf/301371589.pdf",
  },
]

function PublicationsPage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/publications" />

      <PageHeader
        eyebrow="Publications"
        title="The written record."
        description="Conference proceedings, journal articles, workshop papers — 61 entries spanning 2016 – 2025."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
          <PublicationList items={PUBLICATIONS} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

const meta: Meta<typeof PublicationsPage> = {
  title: "LabWebsite/Pages/Publications",
  component: PublicationsPage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof PublicationsPage>

export const Default: Story = {}
