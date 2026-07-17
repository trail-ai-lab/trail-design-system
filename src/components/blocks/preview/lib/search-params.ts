"use client"

export type DesignSystemParams = {
  style: string
  font: string
  fontHeading: string
  baseColor: string
  theme: string
  iconLibrary: string
  menuAccent: string
  menuColor: string
  radius: string
}

const DEFAULT_PARAMS: DesignSystemParams = {
  style: "radix-rhea",
  font: "inter",
  fontHeading: "montserrat",
  baseColor: "olive",
  theme: "olive",
  iconLibrary: "lucide",
  menuAccent: "subtle",
  menuColor: "default",
  radius: "default",
}

export function useDesignSystemSearchParams(): [DesignSystemParams, () => void] {
  return [DEFAULT_PARAMS, () => {}]
}
