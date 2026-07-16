import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { PersonProfile, type PersonProfileData } from "@/components/lab-website/person-profile"
import { ROUTES } from "@/components/lab-website/lib/routes"

const DIRECTOR: PersonProfileData = {
  id: "shamya-karumbaiah",
  name: "Shamya Karumbaiah",
  designation: "Lab Director",
  category: "People",
  website: "https://shamya.github.io/",
  bio: "Shamya Karumbaiah is an Assistant Professor at the University of Wisconsin–Madison, directing the TRAIL Lab. Her research examines the responsible use of AI in real-world classrooms, spanning learning analytics, AI ethics, and human-centered design.",
  research: [
    {
      id: "research-1",
      title: "Reliability Issues in Current Approaches to Identify and Mitigate AI Bias",
    },
    {
      id: "research-2",
      title: "Teachers as Mediators: Understanding Practices and Values",
    },
  ],
}

function PersonProfilePage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/people" />
      <PersonProfile person={DIRECTOR} />
      <Footer />
    </div>
  )
}

const meta: Meta<typeof PersonProfilePage> = {
  title: "LabWebsite/Pages/PersonProfile",
  component: PersonProfilePage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof PersonProfilePage>

export const Default: Story = {}

export const Student: Story = {
  render: () => (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/people" />
      <PersonProfile
        person={{
          id: "yaxuan-yin",
          name: "Yaxuan Yin",
          designation: "PhD Student",
          category: "People",
          website: "https://shellyyin96.github.io/",
          advisor: "Jacob Thebault-Spieker",
          advisorUrl: "https://ischool.wisc.edu/staff/thebault-spieker-jacob/",
        }}
      />
      <Footer />
    </div>
  ),
}
