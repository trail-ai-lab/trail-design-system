import type { Meta, StoryObj } from "@storybook/nextjs"
import { FlaskConical, School, ShieldCheck } from "lucide-react"

import { FocusAreas } from "@/components/lab-website/focus-areas"

const meta: Meta<typeof FocusAreas> = {
  title: "LabWebsite/FocusAreas",
  component: FocusAreas,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    eyebrow: "§ 02 · Focus areas",
    title: "Where the lab points its tools.",
    items: [
      { icon: School, tag: "Field site", title: "Classroom Integration", body: "AI does not enter education in the abstract — it enters real classrooms." },
      { icon: ShieldCheck, tag: "Inquiry", title: "Ethical AI", body: "We audit language models for the biases they carry into student-facing settings." },
      { icon: FlaskConical, tag: "Method", title: "Evidence-Based Research", body: "We build the empirical record on what AI actually does for learning." },
    ],
  },
}
export default meta

type Story = StoryObj<typeof FocusAreas>

export const Default: Story = {}
