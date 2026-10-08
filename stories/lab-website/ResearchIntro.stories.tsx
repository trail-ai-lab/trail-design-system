import type { Meta, StoryObj } from "@storybook/react-vite"

import { ResearchIntro } from "@/components/lab-website/research-intro"

const meta: Meta<typeof ResearchIntro> = {
  title: "LabWebsite/ResearchIntro",
  component: ResearchIntro,
  tags: ["autodocs"],
  args: {
    eyebrow: "§ What drives the work",
    title: (
      <>
        The lab takes the question <span className="italic">seriously</span>.
      </>
    ),
    description:
      "Artificial intelligence (AI) exacerbates educational inequities by threatening heterogeneity and promoting cultural and linguistic hierarchies. When used in learners' contexts that differ from the majority, AI tends to perform significantly worse.",
    faqs: [
      {
        question: "What does TRAIL Lab aim to solve through its research?",
        answer:
          "TRAIL Lab's research addresses persistent educational inequities that arise when AI is introduced into classrooms.",
      },
      {
        question: "How does TRAIL Lab tackle these challenges?",
        answer:
          "By working at the intersection of learning sciences, learning analytics, AI, and human-centered design, TRAIL Lab develops new methods to identify and mitigate AI biases.",
      },
      {
        question: "What role do teachers play in TRAIL Lab's research?",
        answer:
          "A key part of our work is enabling K–12 teachers to use AI in ways that recognize and amplify students' linguistic and cultural assets.",
      },
    ],
  },
}
export default meta

type Story = StoryObj<typeof ResearchIntro>

export const Default: Story = {}
