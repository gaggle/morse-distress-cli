"use strict";
const fs = require("fs")
const morseify = require("./lib/morseify")
const obfuscator = require("./lib/obfuscator")
const utils = require("./lib/utils")

const DEFAULT_CONVERTTEXT_OPTIONS = {obfuscate: false, separators: {char: "|", word: "/"}}

const addPunctuation = (value, prevVal, wordSeparator, charSeparator) => {
  charSeparator = charSeparator || ""
  wordSeparator = wordSeparator || " "
  if (value === " ") {
    return [wordSeparator]
  } else if (value === "\n" || prevVal === "\n" || prevVal === wordSeparator) {
    return [value]
  } else {
    return [charSeparator, value]
  }
}

exports.processArgv = (argv) => {
  const msg = argv._.join(" ") || fs.readFileSync(argv.file, "utf8")
  const output = exports.convertText(msg, {obfuscate: argv.obfuscate})
  if (argv.write) {
    fs.writeFileSync(argv.write, output)
    console.log(`Wrote output to ${argv.write}`)
  } else {
    console.log(output)
  }
}

exports.convertText = (message, opts) => {
  opts = Object.assign({}, DEFAULT_CONVERTTEXT_OPTIONS, opts)
  const morsed = morseify(message)
  const output = opts.obfuscate ? obfuscator(morsed) : morsed

  return output.reduce((result, value) => {
    if (result.length === 0) {
      result.push(value)
    } else {
      result.push(...addPunctuation(value, utils.last(result), opts.separators.word, opts.separators.char))
    }
    return result
  }, []).join("")
}
