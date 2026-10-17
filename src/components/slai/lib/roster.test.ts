import { describe, expect, it } from "vitest"

import { parseRoster } from "./roster"

describe("parseRoster", () => {
  it("reads one name per line, skipping blanks", () => {
    expect(parseRoster("Mei\n\n  Liam  \r\nRosa\n")).toEqual([
      { name: "Mei" },
      { name: "Liam" },
      { name: "Rosa" },
    ])
  })

  it("returns nothing for empty text", () => {
    expect(parseRoster("  \n\n")).toEqual([])
  })

  it("reads a CSV with name, language and grade columns", () => {
    expect(
      parseRoster(
        "Name,Primary Language,Grade\nMei,Mandarin,3\nLiam,,4\n,Spanish,3"
      )
    ).toEqual([
      { name: "Mei", language: "Mandarin", grade: "3" },
      { name: "Liam", grade: "4" },
    ])
  })

  it("honours quoted cells containing commas", () => {
    expect(parseRoster('student,language\n"Lin, Mei",Mandarin')).toEqual([
      { name: "Lin, Mei", language: "Mandarin" },
    ])
  })

  it("reads tab-separated text pasted from a spreadsheet", () => {
    expect(parseRoster("first name\tgrade\nRosa\t5")).toEqual([
      { name: "Rosa", grade: "5" },
    ])
  })

  it("drops a one-column header and a byte-order mark", () => {
    expect(parseRoster("﻿name\nSofia")).toEqual([{ name: "Sofia" }])
  })

  it("treats comma lines without a name header as names", () => {
    expect(parseRoster('"Mei"\nDiego, Jr.')).toEqual([
      { name: "Mei" },
      { name: "Diego, Jr." },
    ])
  })
})
