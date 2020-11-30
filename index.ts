import {merge} from "most";
import {of} from "most";
import type from "@unction/type";

const BEGINNING = 0;

export default function attach<A, B> (key: A) {
  return function attachKey (value: B) {
    return function attachKeyValue (enumerable: Record<string | number | symbol, B> | Map<A, B>): Record<string | number | symbol, B> | Map<A, B> {
      switch (type(enumerable)) {
        case "Object": {
          return {
            ...enumerable,
            [key]: value,
          };
        }

        case "Array": {
          return [...enumerable.slice(BEGINNING, key), value, ...enumerable.slice(key)];
        }

        case "String": {
          return `${enumerable.slice(BEGINNING, key)}${value}${enumerable.slice(key)}`;
        }

        case "Map": {
          return new Map([...enumerable, [key, value]]);
        }

        case "Set": {
          return new Set([...enumerable, value]);
        }

        case "Stream": {
          return merge(enumerable, of(value));
        }

        default: {
          throw new Error(`attach doesn't know how to set a key and value on ${type(enumerable)}`);
        }
      }
    };
  };
}
