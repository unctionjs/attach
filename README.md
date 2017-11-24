# @unction/attach

![Tests][BADGE_TRAVIS]
![Stability][BADGE_STABILITY]
![Dependencies][BADGE_DEPENDENCY]

> ObjectKeyType => ValueType => ObjectType => ObjectType
> MapKeyType => ValueType => MapType => MapType
> ArrayKeyType => ValueType => ArrayType => ArrayType
> null => ValueType => SetType => SetType
> null => ValueType => StreamType => StreamType

A polymorphic way to attach a value to the key on a keyed functor. When dealing with a sorted list type and the key is larger than the list, it will append to the list. When the key is an index that already exists it will place the value at that index and shift remaining values to the right.

``` javascript
attach("hello")("world")({}) // => {hello: "world"}
attach(3)("x")([1, 2, 3]) // => [1, 2, 3, "x"]
attach(1)("x")([1, 2, 3]) // => [1, "x", 2, 3]
attach(null)("x")(new Set([1, 2, 3])) // => {1 2 3 "x"}
attach(10)("x")([]) // => ["x"]
attach(0)("a")("bc") // => "abc"
attach(null)("a")(xstream.of("b")) // => a---b--->
```

[BADGE_TRAVIS]: https://img.shields.io/travis/unctionjs/attach.svg?maxAge=2592000&style=flat-square
[BADGE_STABILITY]: https://img.shields.io/badge/stability-strong-green.svg?maxAge=2592000&style=flat-square
[BADGE_DEPENDENCY]: https://img.shields.io/david/unctionjs/attach.svg?maxAge=2592000&style=flat-square
