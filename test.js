/* eslint-disable no-magic-numbers */
import {test} from "tap"
import {of} from "most"
import streamSatisfies from "@unction/streamsatisfies"

import attach from "./index"

test("Object (Empty)", ({same, end}) => {
  same(
    attach("hello")("world")({}),
    {hello: "world"}
  )

  end()
})

test("Object (Filled)", ({same, end}) => {
  same(
    attach("hello")("world")({test: "case"}),
    {
      hello: "world",
      test: "case",
    }
  )

  end()
})

test("Array (First)", ({same, end}) => {
  same(
    attach(0)("a")([]),
    ["a"]
  )

  end()
})

test("Array (Too big index)", ({same, end}) => {
  same(
    attach(1)("a")([]),
    ["a"]
  )

  end()
})

test("Array (Last)", ({same, end}) => {
  same(
    attach(1)("a")(["b"]),
    ["b", "a"]
  )

  end()
})

test("Array (Middle)", ({same, end}) => {
  same(
    attach(1)("a")(["b", "c"]),
    ["b", "a", "c"]
  )

  end()
})

test("String (First)", ({same, end}) => {
  same(
    attach(0)("a")("bc"),
    "abc"
  )

  end()
})

test("String (last)", ({same, end}) => {
  same(
    attach(1)("a")(""),
    "a"
  )

  end()
})

test("Map", ({same, end}) => {
  same(
    attach("aaa")("aaa")(new Map([["bbb", "bbb"], ["ccc", "ccc"]])),
    new Map([["aaa", "aaa"], ["bbb", "bbb"], ["ccc", "ccc"]])
  )

  end()
})

test("Set", ({same, end}) => {
  same(
    attach(1)("a")(new Set(["b"])),
    new Set(["b", "a"])
  )

  end()
})

test("Stream", ({equal, doesNotThrow, end}) => {
  streamSatisfies(
    "'a'---'b'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    doesNotThrow
  )(
    ({length}) =>
      (position) => {
        equal(length, position)
        end()
      }
  )(
    attach(null)("b")(of("a"))
  )
})

test(({throws, end}) => {
  throws(
    () => attach({aaa: "aaa"})("aaa")(1)
  )

  end()
})
