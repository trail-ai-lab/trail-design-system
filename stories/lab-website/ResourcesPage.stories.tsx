import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { PageHeader } from "@/components/lab-website/page-header"
import { ResourceCard, type Resource } from "@/components/lab-website/resource-card"
import { ROUTES } from "@/components/lab-website/lib/routes"

const CATEGORIES: { category: string; items: Resource[] }[] = [
  {
    category: "Tools",
    items: [
      {
        type: "tool",
        id: "tool-4",
        title: "SLAI: Bridging Science and Language using AI",
        description:
          "A teacher tool to support students' translanguaging in small group discussions.",
        image: "/images/tools/slai.png",
        link: "https://trail.wcer.wisc.edu/slai",
      },
      {
        type: "tool",
        id: "tool-6",
        title: "CLUE-AI: Critical Literacy for Uncovering Errors in AI",
        description: "A classroom activity for teaching students to spot AI errors and bias.",
        image: "/images/tools/aibat.png",
        link: "",
        hideLink: true,
      },
    ],
  },
  {
    category: "Tutorials",
    items: [
      {
        type: "tutorial",
        id: "tutorial-aibat-aied2026",
        title: "Stakeholder-Driven Contextual Evaluation of Language Models in Education",
        description: "A hands-on tutorial on contextual LLM evaluation for education stakeholders.",
        conference: "AIED 2026",
        year: 2026,
        link: "/tutorials/tutorial-aibat-aied2026",
        status: "upcoming",
      },
    ],
  },
]

function ResourcesPage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/resources" />

      <PageHeader
        eyebrow="Resources"
        title="Tools, tutorials, and materials."
        description="Everything the lab builds and shares — teacher-facing tools, workshop materials, datasets, and talks."
      />

      {CATEGORIES.map((group) => (
        <section key={group.category} className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
            <h2 className="font-heading text-xl tracking-tight text-foreground">
              {group.category}
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {group.items.map((item) => (
                <ResourceCard key={item.id} resource={item} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  )
}

const meta: Meta<typeof ResourcesPage> = {
  title: "LabWebsite/Pages/Resources",
  component: ResourcesPage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof ResourcesPage>

export const Default: Story = {}
