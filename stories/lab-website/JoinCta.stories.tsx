import type { Meta, StoryObj } from "@storybook/nextjs"

import { JoinCta } from "@/components/lab-website/join-cta"

const meta: Meta<typeof JoinCta> = {
  title: "LabWebsite/JoinCta",
  component: JoinCta,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "§ 04 · An invitation",
    title: "Join the inquiry.",
    description:
      "We work with educators, students, scholars, and engineers — anyone willing to sit with hard questions about AI in learning.",
    primaryAction: { label: "Meet the team", href: "/people" },
    secondaryAction: { label: "Get in touch", href: "mailto:shamya.karumbaiah@wisc.edu" },
  },
}
export default meta

type Story = StoryObj<typeof JoinCta>

export const Default: Story = {}
