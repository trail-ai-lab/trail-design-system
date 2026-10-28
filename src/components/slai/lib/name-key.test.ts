import { describe, expect, it } from "vitest"

import { isNameTaken, nameKey } from "./name-key"

describe("nameKey", () => {
  it("ignores case and spacing", () => {
    expect(nameKey("  Grade 5   Science ")).toBe(nameKey("grade 5 science"))
  })
})

describe("isNameTaken", () => {
  it("matches an existing name however it is typed", () => {
    expect(isNameTaken(" PHYSICS", ["Physics", "Biology"])).toBe(true)
  })

  it("is false for a new name or a blank one", () => {
    expect(isNameTaken("Chemistry", ["Physics"])).toBe(false)
    expect(isNameTaken("   ", [""])).toBe(false)
  })
})
