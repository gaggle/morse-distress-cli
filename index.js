"use strict";
var fs = require("fs")
var _ = require("lodash")
var morseify = require("./lib/morseify")
var obfuscator = require("./lib/obfuscator")

exports.process_argv = function (argv) {
  var msg = argv._.join(" ") || fs.readFileSync(argv.file, "utf8")
  var output = exports.convert_text(msg, {obfuscate: argv.obfuscate})
  if (argv.write) {
    fs.writeFileSync(argv.write, output)
    console.log(`Wrote output to ${argv.write}`)
  } else {
    console.log(output)
  }
}

const DEFAULT_OPTS = {obfuscate: false, seperators: {char: "|", word: "/"}}
exports.convert_text = function (message, opts) {
  opts = _.merge({}, DEFAULT_OPTS, opts)
  var morsed = morseify(message)
  var output = opts.obfuscate ? obfuscator(morsed) : morsed

  return _.reduce(output, function (result, value) {
    if (result.length == 0)
      result.push(value)
    else if (value == " ")
      result.push(opts.seperators.word)
    else if (_.last(result) == opts.seperators.word)
      result.push(value)
    else if (value == "\n")
      result.push(value)
    else if (_.last(result) == "\n")
      result.push(value)
    else
      result.push(opts.seperators.char, value)
    return result
  }, []).join("")
}
