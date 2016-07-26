var expect = require("chai").expect
var obfuscator = require("../lib/obfuscator")

describe("obfuscator", function () {
  it("replaces a dot with 1", function () {
    expect(obfuscator(["."]))
      .to.eql(["1"])
  })

  it("replaces dots with numbers", function () {
    var H = ["...."]
    expect(obfuscator(H))
      .to.eql(["4"])
  })

  it("replaces a dash with A", function () {
    expect(obfuscator(["-"]))
      .to.eql(["A"])
  })

  it("replaces dashes with letter in the alphabet", function () {
    var O = ["---"]
    expect(obfuscator(O))
      .to.eql(["C"])
  })

  it("replaces all groups in one morse letter", function () {
    var B = ["-."]
    expect(obfuscator(B))
      .to.eql(["A1"])
  })

  it("preserves spaces", function () {
    expect(obfuscator([".", " ", "."]))
      .to.eql(["1", " ", "1"])
  })

  it("preserves newlines", function () {
    expect(obfuscator([".","\n", "."]))
      .to.eql(["1", "\n", "1"])
  })
})