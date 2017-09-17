import type from "@unction/type"

const BEGINNING = 0

// NOTE: Until I figure out how to make flow handle these stupid switch stamenets we can't have types
export default function attach (key: ObjectKeyType | MapKeyType | null): Function {
  return function attachKey (value: mixed): Function {
    return function attachKeyValue (functor: ObjectType | ArrayType | StringType | MapType | SetType): ObjectType | ArrayType | StringType | MapType | SetType {
      switch (type(functor)) {
        case "Object": {
          return {
            ...functor,
            [key]: value,
          }
        }
        case "Array": {
          return [...functor.slice(BEGINNING, key), value, ...functor.slice(key)]
        }
        case "String": {
          return `${functor.slice(BEGINNING, key)}${value}${functor.slice(key)}`
        }
        case "Map": {
          return new Map([...functor, [key, value]])
        }
        case "Set": {
          return new Set([...functor, value])
        }
        default: {
          throw new Error(`attach doesn't know how to set a key and value on ${type(functor)}`)
        }
      }
    }
  }
}
