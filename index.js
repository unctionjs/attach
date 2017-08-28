import type from "@unction/type"

const BEGINNING = 0

// NOTE: Until I figure out how to make flow handle these stupid switch stamenets we can't have types
export default function attach (key: any): Function {
  return function attachKey (value: any): Function {
    return function attachKeyValue (functor: any): any {
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
          throw new Error(`attach doesn't know how to set a key and value on ${type(functor)}`)
        }
        case "WeakMap": {
          throw new Error(`attach doesn't know how to set a key and value on ${type(functor)}`)
        }
        default: {
          throw new Error(`attach doesn't know how to set a key and value on ${type(functor)}`)
        }
      }
    }
  }
}
