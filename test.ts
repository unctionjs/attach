/* eslint-disable no-magic-numbers */
import { of } from "most";
import streamSatisfies from "@unction/streamsatisfies";

import attach from "./index";

test("Object (Empty)", () => {
  expect(attach("hello")("world")({})).toEqual({hello: "world"});
});

test("Object (Filled)", () => {
  expect(attach("hello")("world")({test: "case"})).toEqual({
    hello: "world",
    test: "case",
  });
});

test("Array (First)", () => {
  expect(attach(0)("a")([])).toEqual(["a"]);
});

test("Array (Too big index)", () => {
  expect(attach(1)("a")([])).toEqual(["a"]);
});

test("Array (Last)", () => {
  expect(attach(1)("a")(["b"])).toEqual(["b", "a"]);
});

test("Array (Middle)", () => {
  expect(attach(1)("a")(["b", "c"])).toEqual(["b", "a", "c"]);
});

test("String (First)", () => {
  expect(attach(0)("a")("bc")).toEqual("abc");
});

test("String (last)", () => {
  expect(attach(1)("a")("")).toEqual("a");
});

test("Map", () => {
  expect(attach("aaa")("aaa")(new Map([["bbb", "bbb"], ["ccc", "ccc"]]))).toEqual(new Map([["aaa", "aaa"], ["bbb", "bbb"], ["ccc", "ccc"]]));
});

test("Set", () => {
  expect(attach(1)("a")(new Set(["b"]))).toEqual(new Set(["b", "a"]));
});

test("Stream", done => {
  streamSatisfies(
    "'a'---'b'---|"
  )(
    (given) => (expected) => expect(given).toBe(expected)
  )(
    doesNotThrow
  )(
    ({length}) =>
      (position) => {
        expect(length).toBe(position);
        done();
      }
  )(
    attach(null)("b")(of("a"))
  );
});

test(() => {
  expect(() => attach({aaa: "aaa"})("aaa")(1)).toThrow();
});
