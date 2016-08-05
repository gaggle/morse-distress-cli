"use strict";
const fs = require("fs")
const _ = require("lodash")
const morseify = require("./lib/morseify")
const obfuscator = require("./lib/obfuscator")

const DEFAULT_CONVERTTEXT_OPTIONS = {obfuscate: false, separators: {char: "|", word: "/"}}

exports.processArgv = argv => {
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
    if (result.length == 0)
      result.push(value)
    else {
      const lastElement = _.last(result);
      if (value == " ")
        result.push(opts.separators.word)
      else if (value == "\n" || lastElement == "\n" || lastElement == opts.separators.word)
        result.push(value)
      else
        result.push(opts.separators.char, value)
    }
    return result
  }, []).join("")
}
