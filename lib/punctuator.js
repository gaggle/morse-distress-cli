"use strict";
const utils = require("./utils")

/**
 * @param {String[]} text_elements
 * @param {Object} [opts]
 * @param {String} [opts.char] Separator used between characters
 * @param {String} [opts.word] Separator used between words
 * @returns {String[]}
 */
module.exports = (text_elements, opts) => {
  opts = opts || {}
  return text_elements.reduce((result, value) => {
    if (result.length === 0) {
      result.push(value)
    } else {
      result.push(...punctuate_element(value, utils.last(result), opts.word, opts.char))
    }
    return result
  }, [])
}

const punctuate_element = (value, prevVal, wordSep, charSep) => {
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
