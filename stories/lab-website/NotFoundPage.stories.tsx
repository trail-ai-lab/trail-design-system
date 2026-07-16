import type { Meta, StoryObj } from "@storybook/nextjs"

import { Header } from "@/components/lab-website/header"
import { Footer } from "@/components/lab-website/footer"
import { NotFound } from "@/components/lab-website/not-found"
import { ROUTES } from "@/components/lab-website/lib/routes"

function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header routes={ROUTES} />
      <div className="flex flex-1 items-center justify-center">
        <NotFound />
      </div>
      <Footer />
    </div>
  )
}

const meta: Meta<typeof NotFoundPage> = {
  title: "LabWebsite/Pages/NotFound",
  component: NotFoundPage,
  parameters: { layout: "fullscreen" },
}
export default meta

type Story = StoryObj<typeof NotFoundPage>

export const Default: Story = {}
