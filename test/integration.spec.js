"use strict";
const expect = require("chai").expect
const index = require("../index")

describe("integration testing", () => {
  it("translates to morse as expected", () => {
    expect(index.convertText("I AM IN TROUBLE"))
      .to.eql("../.-|--/..|-./-|.-.|---|..-|-...|.-..|.")
  })

  it("obfuscates as expected", () => {
    expect(index.convertText("I AM IN TROUBLE", {obfuscate: true}))
      .to.eql("2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1")
  })

  it("supports newlines as expected", () => {
    expect(index.convertText("HELLO\nI AM IN TROUBLE"))
      .to.eql("....|.|.-..|.-..|---\n../.-|--/..|-./-|.-.|---|..-|-...|.-..|.")
  })

  it("obfuscates newlines as expected", () => {
    expect(index.convertText("HELLO\nI AM IN TROUBLE", {obfuscate: true}))
      .to.eql("4|1|1A2|1A2|C\n2/1A|B/2|A1/A|1A1|C|2A|A3|1A2|1")
  })
})
