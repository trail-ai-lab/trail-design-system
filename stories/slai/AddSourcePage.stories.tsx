import type { Meta, StoryObj } from "@storybook/nextjs"

import { AddSourceForm } from "@/components/slai/add-source-form"
import { AppShell } from "@/components/slai/app-shell"
import { DEFAULT_LANGUAGES } from "@/components/slai/language-settings-form"
import { PageSidebar } from "./_page-fixtures"

function AddSourcePage({ uploading = false }: { uploading?: boolean }) {
  return (
    <AppShell
      sidebar={<PageSidebar activeNav="source" />}
      title={<span className="font-medium">Add Source</span>}
    >
      <div className="flex flex-1 items-center justify-center overflow-y-auto p-(--shell-px)">
        <AddSourceForm
          className="w-full max-w-md"
          languageOptions={DEFAULT_LANGUAGES}
          uploading={uploading}
        />
      </div>
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/AddSource",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Default: Story = { render: () => <AddSourcePage /> }

export const Uploading: Story = { render: () => <AddSourcePage uploading /> }
