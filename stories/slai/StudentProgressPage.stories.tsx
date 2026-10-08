import type { Meta, StoryObj } from "@storybook/react-vite"

import { AppShell } from "@/components/slai/app-shell"
import { StudentProgressView } from "@/components/slai/student-progress-view"
import { PageSidebar } from "./_page-fixtures"
import { MEI, SESSION_LABELS } from "./_student-fixtures"
import { PageBreadcrumb } from "@/components/patterns/page-breadcrumb"

function StudentProgressPage() {
  return (
    <AppShell
      sidebar={<PageSidebar showStudents activeStudent="mei" />}
      title={
        <PageBreadcrumb items={[{ label: "Students" }, { label: "Mei" }]} />
      }
    >
      <StudentProgressView
        className="min-h-0 flex-1 p-(--shell-gap)"
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
