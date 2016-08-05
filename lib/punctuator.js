"use strict";
const utils = require("./utils")

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

const punctuate_element = (value, prevVal, wordSeparator, charSeparator) => {
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
