"use strict";
const chai = require("chai")
const fs = require("fs")
const mockFS = require("mock-fs")
const mockery = require("mockery")
const rewire = require("rewire")
const sinon = require("sinon")
const sinonChai = require("sinon-chai")
const expect = chai.expect
chai.use(sinonChai)

const withArgs = (opts) => {
  const defaults = {
    _: [],
    file: null,
    obfuscate: false,
    write: null
  }
  return Object.assign(defaults, opts)
}

describe("index", () => {
  let sandbox

  beforeEach(() => {
    sandbox = sinon.sandbox.create()
    mockery.enable({warnOnUnregistered: false, useCleanCache: true})
  })

  afterEach(() => {
    mockery.deregisterAll();
    sandbox.restore()
  })

  describe("#convertText", () => {
    let index, morseify, obfuscator

    beforeEach(() => {
      morseify = sandbox.stub().returns(["..."])
      mockery.registerMock("./lib/morseify", morseify)
      obfuscator = sandbox.stub().returns(["3"])
      mockery.registerMock("./lib/obfuscator", obfuscator)
      index = rewire("../index")
    })

    it("calls morseify", () => {
      index.convertText("foo")
      expect(morseify).to.have.been.calledWith("foo")
    })

    it("calls obfuscation", () => {
      morseify.returns(["...."])
      index.convertText("foo", {obfuscate: true})
      expect(obfuscator).to.have.been.calledWith(["...."])
    })

    it("inserts pipe separator between letters by default", () => {
      morseify.returns(["....", "...."])
      const res = index.convertText()
      expect(res).to.eql("....|....")
    })

    it("replaces spaces between words with forward slash by default", () => {
      morseify.returns(["....", " ", "...."])
      const res = index.convertText()
      expect(res).to.eql("..../....")
    })
  })

  describe("#processArgv", () => {
    let index, convertText, logger

    beforeEach(() => {
      index = rewire("../index")
      convertText = sandbox.stub(index, "convertText")
      logger = sandbox.spy(console, "log")
      mockFS()
    })

    afterEach(() => {
      mockFS.restore()
    })

    it("calls text converter", () => {
      index.processArgv(withArgs({_: ["foo", "bar"]}))
      expect(convertText).to.have.been.calledWith("foo bar")
    })

    it("reads input file if requested", () => {
      mockFS({"input.txt": "secrets..."});
      index.processArgv(withArgs({file: "input.txt"}))
      expect(convertText).to.have.been.calledWith("secrets...")
    })

    it("reads obfuscation bool", () => {
      index.processArgv(withArgs({_: ["foo"], obfuscate: true}))
      expect(convertText).to.have.been.calledWith("foo", {obfuscate: true})
    })

    it("outputs result by default", () => {
      convertText.returns("output")
      index.processArgv(withArgs({_: ["foo"]}))
      expect(logger).to.have.been.calledWith("output")
    })

    it("can save result to a file", () => {
      convertText.returns("some output")
      index.processArgv(withArgs({_: ["foo"], write: "result.txt"}))
      expect(fs.readFileSync("result.txt", "utf8")).to.eql("some output")
    })
  })
})
