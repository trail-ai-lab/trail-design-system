import type { DestinationClass } from "@/components/slai/session-destination-fields"

/** Classes with the ended sessions a recording can join. */
export const DESTINATION_CLASSES: DestinationClass[] = [
  {
    id: "physics",
    name: "Physics",
    sessions: [
      { id: "physics-period-1", name: "Period 1" },
      { id: "physics-period-3", name: "Period 3 — Aug 21" },
    ],
  },
  { id: "biology", name: "Biology", sessions: [] },
]
