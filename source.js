import type from "@unction/type"

const BEGINNING = 0

export default function attach (key: KeyType): Function {
  return function attachKey (value: ValueType): Function {
    return function attachKeyValue (functor: KeyedFunctorType): KeyedFunctorType {
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
        default: {
          throw new Error(`attach doesn't know how to set a key and value on ${type(functor)}`)
        }
      }
    }
  }
}
