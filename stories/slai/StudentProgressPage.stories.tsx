import type { Meta, StoryObj } from "@storybook/nextjs"

import { AppShell } from "@/components/slai/app-shell"
import { SlaiSidebar } from "@/components/slai/slai-sidebar"
import { StudentProgressView } from "@/components/slai/student-progress-view"
import { SESSIONS, SIDEBAR_USER, SOURCES } from "./_page-fixtures"
import { MEI, SESSION_LABELS } from "./_student-fixtures"

function StudentProgressPage() {
  return (
    <AppShell
      sidebar={
        <SlaiSidebar
          sessions={SESSIONS}
          sources={SOURCES}
          user={SIDEBAR_USER}
          activeStudent="mei"
          students={[
            { id: "mei", name: "Mei", language: "Mandarin" },
            { id: "liam", name: "Liam", language: "English" },
            { id: "rosa", name: "Rosa", language: "Spanish" },
          ]}
        />
      }
      title={
        <>
          <span className="text-muted-foreground">Students</span>
          <span className="text-muted-foreground">/</span>
          <span className="font-medium">Mei</span>
        </>
      }
    >
      <StudentProgressView
        className="min-h-0 flex-1 p-(--shell-px)"
        student={MEI}
        sessionLabels={SESSION_LABELS}
        standardLabel="CCSS"
        insight="Mei's WIDA score has climbed from 2.4 to 3.4 across four sessions."
      />
    </AppShell>
  )
}

const meta: Meta = {
  title: "SLAI/Pages/StudentProgress",
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj

export const Default: Story = { render: () => <StudentProgressPage /> }
