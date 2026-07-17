import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { PageHeader } from "@/components/lab-website/page-header"
import { PersonCard, type Person } from "@/components/lab-website/person-card"
import { ROUTES } from "@/components/lab-website/lib/routes"

const GROUPS: { category: string; people: Person[] }[] = [
  {
    category: "People",
    people: [
      { id: "shamya-karumbaiah", name: "Shamya Karumbaiah", designation: "Lab Director" },
      { id: "kaycie-barron", name: "Kaycie Barron", designation: "PhD Student" },
      { id: "yaxuan-yin", name: "Yaxuan Yin", designation: "PhD Student" },
    ],
  },
  {
    category: "Collaborators",
    people: [
      {
        id: "daniel-bolt",
        name: "Daniel Bolt",
        designation: "University of Wisconsin–Madison, Educational Psychology",
      },
    ],
  },
  {
    category: "Alumni",
    people: [
      {
        id: "cynthia-baeza",
        name: "Cynthia Baeza",
        designation: "Assistant Professor, University of Arkansas",
      },
    ],
  },
]

function PeoplePage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/people" />

      <PageHeader
        eyebrow="People"
        title="Who does the work."
        description="Students, collaborators, and alumni working across learning sciences, AI ethics, and analytics."
      />

      {GROUPS.map((group) => (
        <section key={group.category} className="border-b border-border">
          <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
            <h2 className="font-heading text-xl tracking-tight text-foreground">
              {group.category}
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.people.map((person) => (
                <PersonCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  )
}

const meta: Meta<typeof PeoplePage> = {
  title: "LabWebsite/Pages/People",
  component: PeoplePage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof PeoplePage>

export const Default: Story = {}
