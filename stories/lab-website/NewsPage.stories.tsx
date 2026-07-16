import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { PageHeader } from "@/components/lab-website/page-header"
import { NewsArchive, type NewsEntry } from "@/components/lab-website/news-archive"
import { ROUTES } from "@/components/lab-website/lib/routes"

const NEWS: NewsEntry[] = [
  {
    date: "Jul 24, 2025",
    text: 'Alina Guha presented on "Teacher Perceptions on AI Support for Bi/multilingual Learners" at the Artificial Intelligence in Education conference.',
  },
  {
    date: "2024",
    text: "Shamya Karumbaiah publishes on optimizing predictive model philosophies for learning analytics.",
  },
  {
    date: "Jan 22, 2018",
    text: 'Shamya Karumbaiah gave an invited talk on "Student Frustration and Learning Game Design" at the Human Computer Interaction Institute, Carnegie Mellon University.',
  },
]

function NewsPage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/news" />

      <PageHeader
        eyebrow="News"
        title="Talks, papers, panels, awards."
        description="The full record of the lab's activity, in reverse chronological order."
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-4 lg:px-8">
          <NewsArchive items={NEWS} />
        </div>
      </section>

      <Footer />
    </div>
  )
}

const meta: Meta<typeof NewsPage> = {
  title: "LabWebsite/Pages/News",
  component: NewsPage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof NewsPage>

export const Default: Story = {}
