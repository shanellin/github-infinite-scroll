export default function throttle<T extends (...args: any[]) => any>(func: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout> | null
  let previous = 0
  
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this
    const cur = +new Date()
    if (cur - previous >= delay) {
      previous = cur
      func.apply(context, args)
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = +new Date()
        timeout = null
        func.apply(context, args)
      }, delay)
    }
  }
}
