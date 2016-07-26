var expect = require("chai").expect
var _ = require("lodash")
var morseify = require("../lib/morseify")

describe("morseify", function () {
  _.forEach({
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    ".": ".-.-.-",
    ",": "--..--"
  }, function (morse, char) {
    it(`converts ${char} to ${morse}`, function () {
      expect(morseify(char))
        .to.eql([morse])
    })
  })

  it("preserves spaces", function () {
    expect(morseify("A A"))
      .to.eql([".-", " ", ".-"])
  })

  it("preserves newlines", function () {
    expect(morseify("A\nA"))
      .to.eql([".-", "\n", ".-"])
  })
})
