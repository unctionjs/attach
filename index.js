import {merge} from "most"
import {of} from "most"
import type from "@unction/type"

const BEGINNING: Integer = 0

export default function attach (key: KeyType | null): UnaryFunctionType {
  return function attachKey (value: mixed): UnaryFunctionType {
    return function attachKeyValue (functor: ObjectType | ArrayType | StringType | MapType | SetType): ObjectType | ArrayType | StringType | MapType | SetType {
      switch (type(functor)) {
        case "Object": {
          return {
            ...functor,
            [key]: value,
          }
        }
        case "Array": {
          return [
            ...functor.slice(BEGINNING, key),
            value,
            ...functor.slice(key),
          ]
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
        case "Stream": {
          return merge(functor, of(value))
        }
        default: {
          throw new Error(`attach doesn't know how to set a key and value on ${type(functor)}`)
        }
      }
    }
  }
}
