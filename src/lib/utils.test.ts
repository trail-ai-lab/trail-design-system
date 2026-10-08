import { describe, expect, it } from "vitest"

import { cn } from "@/lib/utils"

describe("cn", () => {
  it("joins conditional classes like clsx", () => {
    expect(cn("bg-primary", false, { "text-white": true }, null)).toBe(
      "bg-primary text-white"
    )
  })

  it("resolves standard Tailwind conflicts (last wins)", () => {
    expect(cn("px-2 py-1", "p-3")).toBe("p-3")
    expect(cn("bg-primary", "bg-success/10")).toBe("bg-success/10")
  })

  // Trail's named scales (src/tokens/scales.css, semantic.css) must be known to
  // the merge config, or a size gets mistaken for a color and silently dropped.
  it("keeps a type-scale size when combined with a text color", () => {
    expect(cn("text-label text-muted-foreground uppercase")).toBe(
      "text-label text-muted-foreground uppercase"
    )
    expect(cn("text-h1", "text-foreground")).toBe("text-h1 text-foreground")
  })

  it("treats type-scale steps as font sizes", () => {
    expect(cn("text-body-sm", "text-sm")).toBe("text-sm")
    expect(cn("text-sm", "text-h3")).toBe("text-h3")
    expect(cn("text-h1", "md:text-display", "lg:text-hero")).toBe(
      "text-h1 md:text-display lg:text-hero"
    )
    expect(cn("text-display", "text-hero")).toBe("text-hero")
  })

  it("resolves the elevation, radius, motion and stacking scales", () => {
    expect(cn("shadow-raised", "shadow-md")).toBe("shadow-md")
    expect(cn("rounded-card", "rounded-2xl")).toBe("rounded-2xl")
    expect(cn("duration-fast", "duration-200")).toBe("duration-200")
    expect(cn("ease-standard", "ease-linear")).toBe("ease-linear")
    expect(cn("z-overlay", "z-10")).toBe("z-10")
  })
})
