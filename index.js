"use strict";
const fs = require("fs")
const _ = require("lodash")
const morseify = require("./lib/morseify")
const obfuscator = require("./lib/obfuscator")

const DEFAULT_CONVERTTEXT_OPTIONS = {obfuscate: false, separators: {char: "|", word: "/"}}

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
    if (result.length == 0) {
      result.push(value)
    } else {
      result.push(...converter(value, _.last(result), opts.separators))
    }
    return result
  }, []).join("")
}

const converter = (value, prevVal, separators) => {
  if (value == " ")
    return [separators.word]
  else if (value == "\n" || prevVal == "\n" || prevVal == separators.word)
    return [value]
  else
    return [separators.char, value]
}
