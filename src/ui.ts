// @trail-ai-lab/trail-design-system/ui — lighter-weight UI primitives entry
//
// Same as the default "." entry, minus Chart (recharts), Calendar
// (react-day-picker), and Combobox (@base-ui/react directly, not via the
// radix-ui unified package). Those three drag in dependency chains built
// against newer React majors that break under React 18/Next.js 14's webpack
// SSR bundling (`TypeError: g.createContext is not a function`, reproduced
// with only Button+Separator on the barrel) — since this file, like the
// default barrel, is a single bundled entry, importing ANY export forces
// Node to evaluate the whole module graph, so those three poison every
// consumer of the barrel regardless of which name they actually import.
//
// Use this entry from apps on React 18/Next.js 14 (e.g. trail-lab-website)
// that don't need Chart/Calendar/Combobox. The default "." entry is
// unchanged for apps that do need them and are on a newer React/Next.

export * from "@/components/ui/accordion"
export * from "@/components/ui/alert"
export * from "@/components/ui/alert-dialog"
export * from "@/components/ui/avatar"
export * from "@/components/ui/badge"
export * from "@/components/ui/breadcrumb"
export * from "@/components/ui/button"
export * from "@/components/ui/button-group"
export * from "@/components/ui/card"
export * from "@/components/ui/checkbox"
export * from "@/components/ui/dialog"
export * from "@/components/ui/dropdown-menu"
export * from "@/components/ui/empty"
export * from "@/components/ui/field"
export * from "@/components/ui/input"
export * from "@/components/ui/input-group"
export * from "@/components/ui/item"
export * from "@/components/ui/kbd"
export * from "@/components/ui/label"
export * from "@/components/ui/native-select"
export * from "@/components/ui/popover"
export * from "@/components/ui/progress"
export * from "@/components/ui/radio-group"
export * from "@/components/ui/select"
export * from "@/components/ui/separator"
export * from "@/components/ui/sheet"
export * from "@/components/ui/sidebar"
export * from "@/components/ui/skeleton"
export * from "@/components/ui/slider"
export * from "@/components/ui/spinner"
export * from "@/components/ui/switch"
export * from "@/components/ui/table"
export * from "@/components/ui/tabs"
export * from "@/components/ui/textarea"
export * from "@/components/ui/toggle"
export * from "@/components/ui/toggle-group"
export * from "@/components/ui/tooltip"
