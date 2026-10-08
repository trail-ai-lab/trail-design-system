import { describe, expect, it } from "vitest"

import {
  formatBytes,
  formatClock,
  formatDuration,
  formatElapsed,
  initials,
} from "@/lib/format"

describe("format", () => {
  it("formatClock: m:ss for media", () => {
    expect(formatClock(0)).toBe("0:00")
    expect(formatClock(247)).toBe("4:07")
    expect(formatClock(3725)).toBe("62:05")
  })

  it("formatElapsed: mm:ss for timers", () => {
    expect(formatElapsed(65)).toBe("01:05")
  })

  it("formatDuration: hh:mm:ss for recordings", () => {
    expect(formatDuration(3725)).toBe("01:02:05")
  })

  it("formatBytes: human file size", () => {
    expect(formatBytes(512)).toBe("512 B")
    expect(formatBytes(320 * 1024)).toBe("320 KB")
    expect(formatBytes(1.4 * 1024 * 1024)).toBe("1.4 MB")
  })

  it("initials: up to two letters, uppercased", () => {
    expect(initials("Mei Chen")).toBe("MC")
    expect(initials("  student 1 ")).toBe("S1")
    expect(initials("Rosa")).toBe("R")
  })
})
