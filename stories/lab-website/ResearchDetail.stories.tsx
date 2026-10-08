import type { Meta, StoryObj } from "@storybook/react-vite"

import { ResearchDetail } from "@/components/lab-website/research-detail"
import { PublicationList } from "@/components/lab-website/publication-list"

const meta: Meta<typeof ResearchDetail> = {
  title: "LabWebsite/ResearchDetail",
  component: ResearchDetail,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    research: {
      title:
        "Reliability Issues in Current Approaches to Identify and Mitigate AI Bias",
      funders: ["NSF", "Google"],
      content: (
        <>
          <p>
            Large language models are increasingly deployed in classrooms, yet
            the standard benchmarks used to certify them as &ldquo;fair&rdquo;
            rarely capture what fairness means to the students and teachers who
            actually use them.
          </p>
          <p>
            This project audits the reliability of existing bias-detection
            methods across demographic and linguistic subgroups, and proposes
            stakeholder-driven alternatives grounded in real classroom
            deployments.
          </p>
        </>
      ),
      people: [
        {
          name: "Shamya Karumbaiah",
          designation: "Principal Investigator",
          href: "/people/shamya-karumbaiah",
        },
        {
          name: "Anurag Maravi",
          designation: "Graduate Researcher",
          href: "/people/anurag-maravi",
        },
      ],
    },
  },
}
export default meta

type Story = StoryObj<typeof ResearchDetail>

export const Default: Story = {}

export const WithPublications: Story = {
  args: {
    publications: (
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <PublicationList
          items={[
            {
              id: "publication-1",
              title:
                "Stakeholder-Driven Contextual Evaluation of AI Bias in Education",
              authors: "S. Karumbaiah, A. Maravi",
              year: 2025,
              publisher: "AIED",
              link: "https://example.com",
            },
          ]}
        />
      </section>
    ),
  },
}

export const NoPeopleOrFunders: Story = {
  args: {
    research: {
      title:
        "Tools, Analytics, and Professional Development to Facilitate Teachers' Use of AI",
      content: (
        <p>
          An emerging line of inquiry with no associated people or funders yet.
        </p>
      ),
    },
  },
}
