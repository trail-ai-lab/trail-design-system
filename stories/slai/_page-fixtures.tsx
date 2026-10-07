import {
  SlaiSidebar,
  type SlaiNavId,
  type SidebarSession,
} from "@/components/slai/slai-sidebar"

/** Shared sample data so the page stories show the same sidebar. */
export const SESSIONS: SidebarSession[] = [
  { name: "Biology", periods: [{ name: "Period 1" }, { name: "Period 6" }] },
  { name: "Physics", periods: [{ name: "Period 1" }, { name: "Period 3 — Aug 21" }] },
  { name: "Science", periods: [] },
]

export const SOURCES = [
  "Inclined Plane Lab",
  "Photosynthesis Discussion",
  "Newton's Laws Review",
]

export const SIDEBAR_USER = {
  name: "Anurag Maravi",
  email: "amaravi@wisc.edu",
  initials: "AM",
}

export function PageSidebar({
  activeNav,
  activeSource,
}: {
  activeNav?: SlaiNavId
  activeSource?: string
}) {
  return (
    <SlaiSidebar
      sessions={SESSIONS}
      sources={SOURCES}
      user={SIDEBAR_USER}
      activeNav={activeNav}
      activeSource={activeSource}
      defaultOpenSession="Physics"
    />
  )
}
