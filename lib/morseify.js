"use strict";
const CHAR_TO_MORSE = {
  "A": ".-",
  "B": "-...",
  "C": "-.-.",
  "D": "-..",
  "E": ".",
  "F": "..-.",
  "G": "--.",
  "H": "....",
  "I": "..",
  "J": ".---",
  "K": "-.-",
  "L": ".-..",
  "M": "--",
  "N": "-.",
  "O": "---",
  "P": ".--.",
  "Q": "--.-",
  "R": ".-.",
  "S": "...",
  "T": "-",
  "U": "..-",
  "V": "...-",
  "W": ".--",
  "X": "-..-",
  "Y": "-.--",
  "Z": "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  ".": ".-.-.-",
  ",": "--..--"
}

/**
 * @param {String} message Input to be turned into morse code
 * @returns {String[]} Array of input characters converted to morse code
 *
 * Returns array so you can make sense of character delimitation, spaces, newlines, etc.
 */
module.exports = (message) => {
  return Array.from(message.toUpperCase(), (ch) => {
    const morse = CHAR_TO_MORSE[ch]
    return morse || ch
  })
}
