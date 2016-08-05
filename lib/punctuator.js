"use strict";
const utils = require("./utils")

const punctuateElement = (value, prevVal, wordSep, charSep) => {
  charSep = charSep || ""
  wordSep = wordSep || " "
  if (value === " ") {
    return [wordSep]
  } else if (value === "\n" || prevVal === "\n" || prevVal === wordSep) {
    return [value]
  } else {
    return [charSep, value]
  }
}

/**
 * @param {String[]} textElements
 * @param {Object} [opts]
 * @param {String} [opts.char] Separator used between characters
 * @param {String} [opts.word] Separator used between words
 * @returns {String[]}
 */
module.exports = (textElements, opts) => {
  opts = opts || {}
  return textElements.reduce((result, value) => {
    if (result.length === 0) {
      result.push(value)
    } else {
      result.push(...punctuateElement(value, utils.last(result), opts.word, opts.char))
    }
    return result
  }, [])
}
