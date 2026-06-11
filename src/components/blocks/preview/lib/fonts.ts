export const FONTS = [
  { name: "Geist", value: "geist", font: { family: "Geist", style: { fontFamily: "Geist, sans-serif" } } },
  { name: "Inter", value: "inter", font: { family: "Inter", style: { fontFamily: "Inter, sans-serif" } } },
  { name: "Montserrat", value: "montserrat", font: { family: "Montserrat", style: { fontFamily: "Montserrat, sans-serif" } } },
] as const

export type Font = (typeof FONTS)[number]

export const FONT_HEADING_OPTIONS = [
  { name: "Inherit", value: "inherit", font: null },
  ...FONTS,
] as const
