/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers */
import {test} from "tap"
import xstream from "xstream"
import streamSatisfies from "@unction/streamSatisfies"

import attach from "./index"

test(({same, end}) => {
  same(
    attach("hello")("world")({}),
    {hello: "world"}
  )

  end()
})

test(({same, end}) => {
  same(
    attach("hello")("world")({test: "case"}),
    {
      hello: "world",
      test: "case",
    }
  )

  end()
})

test(({same, end}) => {
  same(
    attach(0)("a")([]),
    ["a"]
  )

  end()
})

test(({same, end}) => {
  same(
    attach(1)("a")([]),
    ["a"]
  )

  end()
})

test(({same, end}) => {
  same(
    attach(1)("a")(["b"]),
    ["b", "a"]
  )

  end()
})

test(({same, end}) => {
  same(
    attach(1)("a")(["b", "c"]),
    ["b", "a", "c"]
  )

  end()
})

test(({same, end}) => {
  same(
    attach(0)("a")("bc"),
    "abc"
  )

  end()
})

test(({same, end}) => {
  same(
    attach(1)("a")(""),
    "a"
  )

  end()
})

test(({same, end}) => {
  same(
    attach("aaa")("aaa")(new Map([["bbb", "bbb"], ["ccc", "ccc"]])),
    new Map([["aaa", "aaa"], ["bbb", "bbb"], ["ccc", "ccc"]])
  )

  end()
})

test(({same, end}) => {
  same(
    attach(1)("a")(new Set(["b"])),
    new Set(["b", "a"])
  )

  end()
})

test(({equal, end}) => {
  streamSatisfies(
    "'a'---'b'---|"
  )(
    (given) => (expected) => equal(given, expected)
  )(
    ({length}) =>
      (position) => {
        equal(length, position)
        end()
      }
  )(
    attach(null)("b")(xstream.of("a"))
  )
})

test(({throws, end}) => {
  throws(
      () => attach({aaa: "aaa"})("aaa")(1)
  )

  end()
})
