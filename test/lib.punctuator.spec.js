"use strict";
const expect = require("chai").expect
const punctuator = require("../lib/punctuator")

describe("punctuator", () => {
  it("inserts per character punctuation", () => {
    expect(punctuator(["a", "b"], {char: "|"}))
      .to.eql(["a", "|", "b"])
  })

  it("inserts per word punctuation", () => {
    expect(punctuator(["a", " ", "b"], {word: "/"}))
      .to.eql(["a", "/", "b"])
  })

  it("has sensible defaults", () => {
    expect(punctuator(["a", "b", " ", "c"]))
      .to.eql(["a", "", "b", " ", "c"])
  })
})
