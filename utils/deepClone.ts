interface Indexed {
  [key: string]: any
}

export default function deepClone<T extends Indexed>(obj: T): T {
  let clone: any = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      clone[key] = deepClone(obj[key])
    } else {
      clone[key] = obj[key]
    }
  }
  return clone as T
}