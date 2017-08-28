/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type, no-magic-numbers */
import {test} from "tap"

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

test(({throws, end}) => {
  throws(
    () => attach("aaa")("aaa")(new Map([["bbb", "bbb"], ["ccc", "ccc"]]))
  )

  end()
})

test(({throws, end}) => {
  throws(
      () => attach({aaa: "aaa"})("aaa")(new WeakMap([[{bbb: "bbb"}, "bbb"], [{ccc: "ccc"}, "ccc"]]))
  )

  end()
})

test(({throws, end}) => {
  throws(
      () => attach({aaa: "aaa"})("aaa")(1)
  )

  end()
})
