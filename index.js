"use strict";
const fs = require("fs")
const _ = require("lodash")
const morseify = require("./lib/morseify")
const obfuscator = require("./lib/obfuscator")

exports.processArgv = function (argv) {
  const msg = argv._.join(" ") || fs.readFileSync(argv.file, "utf8")
  const output = exports.convertText(msg, {obfuscate: argv.obfuscate})
  if (argv.write) {
    fs.writeFileSync(argv.write, output)
    console.log(`Wrote output to ${argv.write}`)
  } else {
    console.log(output)
  }
}

const DEFAULT_OPTS = {obfuscate: false, separators: {char: "|", word: "/"}}
exports.convertText = function (message, opts) {
  opts = _.merge({}, DEFAULT_OPTS, opts)
  const morsed = morseify(message)
  const output = opts.obfuscate ? obfuscator(morsed) : morsed

  return _.reduce(output, function (result, value) {
    if (result.length == 0)
      result.push(value)
    else if (value == " ")
      result.push(opts.separators.word)
    else if (_.last(result) == opts.separators.word)
      result.push(value)
    else if (value == "\n")
      result.push(value)
    else if (_.last(result) == "\n")
      result.push(value)
    else
      result.push(opts.separators.char, value)
    return result
  }, []).join("")
}
