import type { Meta, StoryObj } from "@storybook/react-vite"
import { BarChart3, Bot, GraduationCap, Scale } from "lucide-react"

import { Header } from "@/components/lab-website/header"
import { LabFooter } from "@/components/lab-website/lab-footer"
import { labFooterDemoProps } from "./lab-footer-demo-props"
import { PageHeader } from "@/components/lab-website/page-header"
import { ResearchIntro } from "@/components/lab-website/research-intro"
import { Pillars } from "@/components/lab-website/pillars"
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

const CONTRIBUTIONS = [
  {
    icon: Bot,
    index: "01",
    title: "Educational AI",
    body: "We design multilingual and multicultural large language models (LLMs) and develop stakeholder-driven, context-aware methods for evaluating AI in education.",
  },
  {
    icon: Scale,
    index: "02",
    title: "AI Fairness",
    body: "We create novel approaches to measuring AI bias that go beyond traditional demographic categories, accounting for context, lived experience, and power dynamics.",
  },
  {
    icon: BarChart3,
    index: "03",
    title: "Learning Analytics",
    body: "We develop analytics to capture the non-dominant ways students express meaning, communicate, and learn — for example, by surfacing cultural assets in scientific argumentation.",
  },
  {
    icon: GraduationCap,
    index: "04",
    title: "Teacher Tools",
    body: "We build tools that support equitable classroom practices, such as real-time assistance for culturally sustaining pedagogy and multimodal analytics for teacher reflection.",
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

      <ResearchIntro
        eyebrow="§ What drives the work"
        title={
          <>
            The lab takes the question <span className="italic">seriously</span>
            .
          </>
        }
        description="Artificial intelligence (AI) exacerbates educational inequities by threatening heterogeneity and promoting cultural and linguistic hierarchies. When used in learners' contexts that differ from the majority, AI tends to perform significantly worse — leading to biased assessments, perpetuated cultural stereotypes, increased hallucinations, and a failure to capture linguistic and cultural nuance."
        faqs={[
          {
            question: "What does TRAIL Lab aim to solve through its research?",
            answer:
              "TRAIL Lab's research addresses persistent educational inequities that arise when AI is introduced into classrooms. These inequities often affect historically marginalized students and are rooted in how AI systems are designed, evaluated, and used in real-world educational settings.",
          },
          {
            question: "How does TRAIL Lab tackle these challenges?",
            answer:
              "By working at the intersection of learning sciences, learning analytics, AI, and human-centered design, TRAIL Lab develops new methods to identify and mitigate AI biases. We center the lived experiences of historically marginalized students in our design processes to ensure AI systems reflect their realities.",
          },
          {
            question: "What role do teachers play in TRAIL Lab's research?",
            answer:
              "A key part of our work is enabling K–12 teachers to use AI in ways that recognize and amplify students' linguistic and cultural assets. Our tools and methods are designed to support educators in creating more inclusive, responsive, and equitable learning environments.",
          },
        ]}
      />

      <Pillars
        eyebrow="§ Contributions"
        title={
          <>
            Methodological, empirical, and design contributions{" "}
            <span className="italic">to the field</span>.
          </>
        }
        items={CONTRIBUTIONS}
      />

      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
            § Research areas
          </p>
          <h2 className="mt-4 text-h2 text-foreground md:text-h1">
            Active <span className="italic">lines of inquiry</span>.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {RESEARCH_AREAS.map((area) => (
              <ResearchCard key={area.index} research={area} />
            ))}
          </div>
        </div>
      </section>

      <LabFooter {...labFooterDemoProps} />
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
