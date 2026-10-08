import type { Meta, StoryObj } from "@storybook/react-vite"

import { ResourceCard } from "@/components/lab-website/resource-card"

const meta: Meta<typeof ResourceCard> = {
  title: "LabWebsite/ResourceCard",
  component: ResourceCard,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}
export default meta

type Story = StoryObj<typeof ResourceCard>

export const Tool: Story = {
  args: {
    resource: {
      variant: "tool",
      id: "tool-4",
      title: "SLAI: Bridging Science and Language using AI",
      description:
        "A teacher tool to support students' translanguaging in small group discussions.",
      image: "/images/tools/slai.png",
      link: "https://trail.wcer.wisc.edu/slai",
    },
  },
  render: (args) => (
    <div className="max-w-sm">
      <ResourceCard {...args} />
    </div>
  ),
}

export const Dataset: Story = {
  args: {
    resource: {
      variant: "dataset",
      id: "dataset-1",
      title: "Classroom Discourse Corpus",
      description:
        "Anonymized transcripts from multilingual classroom discussions.",
      downloadUrl: "#",
    },
  },
  render: (args) => (
    <div className="max-w-sm">
      <ResourceCard {...args} />
    </div>
  ),
}

export const Workshop: Story = {
  args: {
    resource: {
      variant: "workshop",
      id: "workshop-aibat-aied2026",
      title:
        "Stakeholder-Driven Contextual Evaluation of Language Models in Education",
      conference: "AIED 2026",
      year: 2026,
      status: "upcoming",
      link: "/workshops/workshop-aibat-aied2026",
    },
  },
  render: (args) => (
    <div className="max-w-sm">
      <ResourceCard {...args} />
    </div>
  ),
}

export const Video: Story = {
  args: {
    resource: {
      variant: "video",
      id: "video-1",
      title: "SLAI in a Multilingual Science Classroom",
      description:
        "A two-minute walkthrough of SLAI during a group discussion.",
      youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    },
  },
  render: (args) => (
    <div className="max-w-sm">
      <ResourceCard {...args} />
    </div>
  ),
}

export const Pdf: Story = {
  args: {
    resource: {
      variant: "pdf",
      id: "pdf-1",
      title: "SLAI Teacher Guide",
      fileUrl: "#",
    },
  },
  render: (args) => (
    <div className="max-w-sm">
      <ResourceCard {...args} />
    </div>
  ),
}

/** Tutorials share the workshop layout; shown here as a past event with a description. */
export const Tutorial: Story = {
  args: {
    resource: {
      variant: "tutorial",
      id: "tutorial-aibat-aied2025",
      title: "Contextual Evaluation of Language Models in Education",
      description:
        "A hands-on tutorial on evaluating LLMs with teachers as stakeholders.",
      conference: "AIED 2025",
      year: 2025,
      status: "past",
      link: "/tutorials/tutorial-aibat-aied2025",
    },
  },
  render: (args) => (
    <div className="max-w-sm">
      <ResourceCard {...args} />
    </div>
  ),
}
