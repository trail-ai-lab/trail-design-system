import type { Meta, StoryObj } from "@storybook/react-vite"

import { LabFooter } from "@/components/lab-website/lab-footer"

const meta: Meta<typeof LabFooter> = {
  title: "LabWebsite/LabFooter",
  component: LabFooter,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    address: ["1025 W Johnson St", "Madison, WI 53706"],
    email: "shamya.karumbaiah@wisc.edu",
    mapLink:
      "https://www.google.com/maps/place/1025+W+Johnson+St,+Madison,+WI+53706",
    contactLinks: [
      {
        icon: <span aria-hidden>✉</span>,
        label: "Email",
        href: "mailto:shamya.karumbaiah@wisc.edu",
      },
      {
        icon: <span aria-hidden>in</span>,
        label: "LinkedIn",
        href: "https://www.linkedin.com",
      },
      {
        icon: <span aria-hidden>gh</span>,
        label: "GitHub",
        href: "https://github.com/trail-ai-lab",
      },
    ],
    affiliations: [
      { label: "Data Science Institute", href: "https://dsi.wisc.edu/" },
      {
        label: "Department of Curriculum & Instruction",
        href: "https://ci.education.wisc.edu/",
      },
      { label: "Holtz Center", href: "https://sts.wisc.edu/" },
      {
        label: "Institute for Diversity Science",
        href: "https://ids.wisc.edu/",
      },
      {
        label: "Multilingual Learning Research Center (MLRC)",
        href: "https://mlrc.wisc.edu/",
      },
    ],
    feedbackEmail: "shamya.karumbaiah@wisc.edu",
  },
}
export default meta

type Story = StoryObj<typeof LabFooter>

export const Default: Story = {}

export const Minimal: Story = {
  args: {
    address: undefined,
    email: undefined,
    mapLink: undefined,
    contactLinks: undefined,
    affiliations: undefined,
    feedbackEmail: undefined,
  },
}
