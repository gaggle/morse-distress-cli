"use strict";
/**
 * For each morse element,
 * replace the number of consecutive dots with a number,
 * and replace the number of consecutive dashes
 * with the letter of the alphabet at that position.
 * E.g. S = ... = 3,
 *      Q = --.- = b1a,
 *      F = ..-. = 2a1.
 *
 * @param {String[]} morseElements
 * @returns {String[]}
 */
module.exports = (morseElements) => {
  return Array.from(morseElements, obfuscate)
}

const obfuscate = morsecode => {
  let lastchar = null
  let accumulator = 0
  let result = []

  for (let i in morsecode) {
    let ch = morsecode[i]
    let theFirst = i == 0
    let theLast = i >= morsecode.length - 1
    if (ch == lastchar) {
      accumulator++
    } else {
      if (!theFirst)
        commitToStack(lastchar, accumulator, result)
      lastchar = ch
      accumulator = 1
    }
    if (theLast || ch != lastchar) {
      commitToStack(lastchar, accumulator, result)
    }
  }
  return result.join("")
}

const commitToStack = (character, accumulator, stack) => {
  if (character == ".")
    stack.push(String(accumulator))
  else if (character == "-")
    stack.push(" ABCDEFGHIJKLMNOPQRSTUVWXYZ"[accumulator])
  else {
    stack.push(character)
  }
}
