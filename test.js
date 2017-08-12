/* eslint-disable flowtype/require-parameter-type, flowtype/require-return-type */
import {test} from "tap"

import aside from "./source"

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
