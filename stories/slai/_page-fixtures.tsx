import {
  SlaiSidebar,
  type SlaiNavId,
  type SidebarClass,
  type SidebarStudent,
} from "@/components/slai/slai-sidebar"

/** Shared sample data so every page story shows the same sidebar. */
export const CLASSES: SidebarClass[] = [
  { name: "Biology", sessions: [{ name: "Period 1" }, { name: "Period 6" }] },
  {
    name: "Physics",
    sessions: [{ name: "Period 1" }, { name: "Period 3 — Aug 21" }],
  },
  { name: "Science", sessions: [] },
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

export const STUDENTS: SidebarStudent[] = [
  { id: "mei", name: "Mei", language: "Mandarin" },
  { id: "liam", name: "Liam", language: "English" },
  { id: "rosa", name: "Rosa", language: "Spanish" },
]

/**
 * The one sidebar every SLAI page story renders. Pass what's active; never
 * fork the data per page, or the stories drift apart.
 */
export function PageSidebar({
  activeNav,
  activeSession,
  activeSource,
  activeStudent,
  showStudents = false,
  liveSessionActive = false,
}: {
  activeNav?: SlaiNavId
  /** Highlights a session in the tree, e.g. { className: "Physics", session: "Period 3 — Aug 21" } */
  activeSession?: { className: string; session: string }
  activeSource?: string
  activeStudent?: string
  /** Show the Students group (student progress pages) */
  showStudents?: boolean
  /** A session is running now; marks the Live nav item */
  liveSessionActive?: boolean
}) {
  const classes = CLASSES.map((klass) => ({
    ...klass,
    sessions: klass.sessions.map((session) => ({
      ...session,
      active:
        klass.name === activeSession?.className &&
        session.name === activeSession?.session,
    })),
  }))
  return (
    <SlaiSidebar
      classes={classes}
      sources={SOURCES}
      user={SIDEBAR_USER}
      activeNav={activeNav}
      liveSessionActive={liveSessionActive}
      activeSource={activeSource}
      students={showStudents ? STUDENTS : undefined}
      activeStudent={activeStudent}
      defaultOpenClass={activeSession?.className ?? "Physics"}
    />
  )
}
