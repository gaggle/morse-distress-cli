const expect = require("chai").expect
const _ = require("lodash")
const morseify = require("../lib/morseify")

describe("morseify", () => {
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
  }, (morse, char) => {
    it(`converts ${char} to ${morse}`, () => {
      expect(morseify(char))
        .to.eql([morse])
    })
  })

  it("preserves spaces", () => {
    expect(morseify("A A"))
      .to.eql([".-", " ", ".-"])
  })

  it("preserves newlines", () => {
    expect(morseify("A\nA"))
      .to.eql([".-", "\n", ".-"])
  })
})
