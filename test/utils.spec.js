"use strict";
const expect = require("chai").expect
const utils = require('../lib/utils')

describe('utils', () => {
  describe('#last', ()=> {
    it('returns last element in array', () => {
      expect(utils.last(['a', 'b'])).to.eql('b')
    })
  })
})
