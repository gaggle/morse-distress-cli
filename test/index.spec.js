"use strict";
var chai = require("chai")
var fs = require("fs")
var _ = require("lodash")
var mock_fs = require("mock-fs")
var mockery = require("mockery")
var rewire = require("rewire")
var sinon = require("sinon")
var sinonChai = require("sinon-chai")
var expect = chai.expect
chai.use(sinonChai)

describe("index", function () {
  var sandbox

  beforeEach(function () {
    sandbox = sinon.sandbox.create()
    mockery.enable({warnOnUnregistered: false, useCleanCache: true})
  })

  afterEach(function () {
    mockery.deregisterAll();
    sandbox.restore()
  })

  describe("#convert_text", function () {
    var index, morseify, obfuscator

    beforeEach(function () {
      morseify = sandbox.stub()
      mockery.registerMock("./lib/morseify", morseify)
      obfuscator = sandbox.stub()
      mockery.registerMock("./lib/obfuscator", obfuscator)
      index = rewire("../index")
    })

    it("calls morseify", function () {
      index.convert_text("foo")
      expect(morseify).to.have.been.calledWith("foo")
    })

    it("calls obfuscation", function () {
      morseify.returns(["...."])
      index.convert_text("foo", {obfuscate: true})
      expect(obfuscator).to.have.been.calledWith(["...."])
    })

    it("inserts pipe separator betwen letters by default", function() {
      morseify.returns(["....", "...."])
      var res = index.convert_text()
      expect(res).to.eql("....|....")
    })

    it("replaces spaces between words with forward slash by default", function() {
      morseify.returns(["....", " ", "...."])
      var res = index.convert_text()
      expect(res).to.eql("..../....")
    })
  })

  describe("#process_argv", function () {
   var index, convert_text, logger

   beforeEach(function () {
     index = rewire("../index")
     convert_text = sandbox.stub(index, "convert_text")
     logger = sandbox.spy(console, "log")
     mock_fs()
   })

   afterEach(function () {
     mock_fs.restore()
   })

   it("calls text converter", function () {
     index.process_argv(with_args({_: ["foo", "bar"]}))
     expect(convert_text).to.have.been.calledWith("foo bar")
   })

   it("reads input file if requested", function () {
     mock_fs({'input.txt': "secrets..."});
     index.process_argv(with_args({file: "input.txt"}))
     expect(convert_text).to.have.been.calledWith("secrets...")
   })

   it("reads obfuscation bool", function () {
     index.process_argv(with_args({_: ["foo"], obfuscate: true}))
     expect(convert_text).to.have.been.calledWith("foo", {obfuscate: true})
   })

   it("outputs result by default", function () {
     convert_text.returns("output")
     index.process_argv(with_args({_: ["foo"]}))
     expect(logger).to.have.been.calledWith("output")
   })

   it("can save result to a file", function () {
     convert_text.returns("some output")
     index.process_argv(with_args({_: ["foo"], write: "result.txt"}))
     expect(fs.readFileSync("result.txt", "utf8")).to.eql("some output")
   })
  })
})

var with_args = function (opts) {
 return _.merge({
   _: [],
   file: null,
   obfuscate: false,
   write: null
 }, opts)
}
