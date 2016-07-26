"use strict";
const _ = require("lodash")

/**
 * For each morse element,
 * replace the number of consecutive dots with a number,
 * and replace the number of consecutive dashes
 * with the letter of the alphabet at that position.
 * E.g. S = ... = 3,
 *      Q = --.- = b1a,
 *      F = ..-. = 2a1.
 *
 * @param {String[]} morse_elements
 * @returns {String[]}
 */
module.exports = function (morse_elements) {
  return _.map(morse_elements, obfuscate)
}

var obfuscate = function (morsecode) {
  var lastchar = null
  var accumulator = 0
  var result = []

  for (var i in morsecode) {
    var ch = morsecode[i]
    var first = i == 0
    var the_end = i >= morsecode.length - 1
    if (ch == lastchar) {
      accumulator++
    } else {
      if (!first)
        commit_to_stack(lastchar, accumulator, result)
      lastchar = ch
      accumulator = 1
    }
    if (ch != lastchar || the_end) {
      commit_to_stack(lastchar, accumulator, result)
    }
  }
  return result.join("")
}

var commit_to_stack = function (character, accumulator, stack) {
  if (character == ".")
    stack.push(String(accumulator))
  else if (character == "-")
    stack.push(' ABCDEFGHIJKLMNOPQRSTUVWXYZ'[accumulator])
  else {
    stack.push(character)
  }
}
