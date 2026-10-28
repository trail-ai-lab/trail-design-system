import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, screen } from "storybook/test"

import { NewSessionForm } from "@/components/slai/new-session-form"
import { PHYSICS_MATERIALS } from "./_material-fixtures"
import { NewSessionWithMaterials } from "./_new-session-with-materials"

const CLASSES = [
  "Bio 1",
  "Biology",
  "Gravity",
  "Mathematics",
  "Physics",
  "Pune",
  "Science",
  "Science 23",
]

// a11y: scrollable-region-focusable disabled. Upstream: Radix ScrollArea's viewport isn't keyboard-focusable.
const A11Y = {
  config: {
    rules: [{ id: "scrollable-region-focusable", enabled: false }],
  },
}

const meta: Meta<typeof NewSessionForm> = {
  title: "SLAI/NewSessionForm",
  parameters: { a11y: A11Y },
  component: NewSessionForm,
  tags: ["autodocs"],
  args: {
    classes: CLASSES,
    className: "w-full max-w-xl",
  },
}

export default meta
type Story = StoryObj<typeof NewSessionForm>

export const Default: Story = {}

export const WithClassPreselected: Story = {
  args: { defaultClass: "Physics" },
}

export const Starting: Story = {
  args: { defaultClass: "Physics", loading: true },
}

export const AllowNewClass: Story = {
  args: { allowNewClass: true },
}

/** A new class can't reuse an existing class's name (ignoring case and spacing). */
export const NewClassNameTaken: Story = {
  args: { allowNewClass: true },
  play: async ({ canvas, userEvent }) => {
    const [classSelect] = canvas.getAllByRole("combobox")
    await userEvent.click(classSelect)
    await userEvent.click(
      await screen.findByRole("option", { name: "+ New class" })
    )
    await userEvent.type(canvas.getByLabelText("New class name"), "physics")
    await expect(
      canvas.getByText("This class already exists. Pick it from the list.")
    ).toBeVisible()
    await expect(
      canvas.getByRole("button", { name: "Start session" })
    ).toBeDisabled()
  },
}

/**
 * With `materials`, picking a class reveals an optional "Course materials"
 * section: which of the class's materials this session looks at first.
 * Biology has none yet — the picker offers only "Upload new…".
 */
export const WithCourseMaterials: Story = {
  args: {
    defaultClass: "Physics",
    materials: { Physics: PHYSICS_MATERIALS, Biology: [] },
    onUploadMaterials: () => {},
  },
}

/**
 * Before a class is picked the section still shows, so teachers know it's
 * there; the picker and Upload wait for a class.
 */
export const CourseMaterialsBeforeClass: Story = {
  args: {
    materials: { Physics: PHYSICS_MATERIALS, Biology: [] },
    onUploadMaterials: () => {},
  },
}

/**
 * Upload while creating the session: the Upload button (or "Upload new…" in
 * the picker) opens `UploadMaterialsSheet` for the picked class. New files
 * join the class library and are pre-selected for this session. Try Biology,
 * which has no materials yet.
 */
export const UploadWhileCreating: Story = {
  render: (args) => (
    <NewSessionWithMaterials
      classes={args.classes}
      defaultClass="Physics"
      className={args.className}
    />
  ),
}
