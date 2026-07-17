import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  BookOpen,
  LineChart,
  ShieldCheck,
  Users,
  School,
  FlaskConical,
} from "lucide-react"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { Hero } from "@/components/lab-website/hero"
import { Pillars } from "@/components/lab-website/pillars"
import { FocusAreas } from "@/components/lab-website/focus-areas"
import { PullQuote } from "@/components/lab-website/pull-quote"
import { JoinCta } from "@/components/lab-website/join-cta"
import { RecentNews } from "@/components/lab-website/recent-news"
import { ROUTES } from "@/components/lab-website/lib/routes"

function HomePage() {
  return (
    <div className="bg-background">
      <Header routes={ROUTES} activePath="/" />

      <Hero
        eyebrow="The Responsible AI for Learning Lab · UW–Madison"
        title={
          <>
            We ask <span className="text-primary">where and whether</span>{" "}
            AI belongs in classrooms — not just how to put it there.
          </>
        }
        description="TRAIL Lab is an interdisciplinary research group at the University of Wisconsin–Madison studying the responsible use of AI in real-world classrooms. We work with teachers, students, researchers, engineers, and the complex contexts in which learning happens."
        primaryAction={{ label: "Explore the research", href: "/research" }}
        secondaryAction={{ label: "Read the work", href: "/publications" }}
        meta={[
          { label: "PI", value: "Shamya Karumbaiah" },
          { label: "Established", value: "2023 · Madison, WI" },
        ]}
      />

      <Pillars
        eyebrow="§ 01 · Disciplines"
        title="Four disciplines we focus on"
        items={[
          {
            icon: BookOpen,
            index: "01",
            title: "Learning Sciences",
            body: "Understanding how people learn across cognition, culture, and context to support their learning.",
          },
          {
            icon: ShieldCheck,
            index: "02",
            title: "AI Ethics",
            body: "Addressing bias, privacy, and equity concerns to ensure responsible AI use in education.",
          },
          {
            icon: LineChart,
            index: "03",
            title: "Learning Analytics",
            body: "Mining patterns in process data to surface key moments in teaching and learning.",
          },
          {
            icon: Users,
            index: "04",
            title: "Human-Centered Design",
            body: "Co-designing with educators and learners from the get-go, with iterative improvements from classroom implementations.",
          },
        ]}
      />

      <FocusAreas
        eyebrow="§ 02 · Focus areas"
        title="Where the lab points its tools."
        items={[
          {
            icon: School,
            tag: "Field site",
            title: "Classroom Integration",
            body: "AI does not enter education in the abstract — it enters fifth-period algebra, a multilingual ELA cohort, a fifteen-minute lesson with thirty learners. We study what integration means inside those rooms, in partnership with the teachers who run them.",
          },
          {
            icon: ShieldCheck,
            tag: "Inquiry",
            title: "Ethical AI",
            body: "We audit language models for the biases they carry into student-facing settings, examine consent and surveillance in classroom analytics, and ask whose values get encoded as defaults.",
          },
          {
            icon: FlaskConical,
            tag: "Method",
            title: "Evidence-Based Research",
            body: "We build the empirical record on what AI actually does for learning — through controlled studies, longitudinal partnerships, and methodological work on how to measure bias reliably for small groups.",
          },
        ]}
      />

      <PullQuote
        eyebrow="A defining stance"
        quote={
          <>
            “Should AI be in education at all? That is the question we are
            willing to answer no to. The work begins there — with consent,
            evidence, and the people who live with the consequences.”
          </>
        }
        cite="TRAIL Lab — research stance"
      />

      <RecentNews
        eyebrow="§ 03 · News"
        title="Recent news."
        description="Talks, papers, panels, awards. The work in motion."
        viewAllHref="/news"
        totalCount={68}
        items={[
          {
            date: "Jul 24, 2025",
            text: "Alina Guha presented on Teacher Perceptions on AI Support for Bi/multilingual Learners at the Artificial Intelligence in Education conference.",
          },
          {
            date: "2026",
            text: "TRAIL Lab's tutorial on stakeholder-driven contextual evaluation of language models accepted at AIED 2026.",
          },
          {
            date: "2024",
            text: "Shamya Karumbaiah publishes on optimizing predictive model philosophies for learning analytics.",
          },
        ]}
      />

      <JoinCta
        eyebrow="§ 04 · An invitation"
        title="Join the inquiry."
        description="We work with educators, students, scholars, and engineers — anyone willing to sit with hard questions about AI in learning and answer them with evidence. Whether you are a prospective PhD student, a teacher curious about co-designing tools, or a researcher looking to collaborate, we want to hear from you."
        primaryAction={{ label: "Meet the team", href: "/people" }}
        secondaryAction={{ label: "Get in touch", href: "mailto:shamya.karumbaiah@wisc.edu" }}
      />

      <Footer />
    </div>
  )
}

const meta: Meta<typeof HomePage> = {
  title: "LabWebsite/Pages/Home",
  component: HomePage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof HomePage>

export const Default: Story = {}
