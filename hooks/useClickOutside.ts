import { useEffect } from "react"

const useClickOutside = (ref, callback, deps) => {
  const handleClick = (evt) => {
    if (ref.current && !ref.current.contains(evt.target)) {
      callback(evt)
    }
  }
  useEffect(() => {
    if (process.browser) {
      document.addEventListener("click", handleClick)
      return () => {
        document.removeEventListener("click", handleClick)
      }
    }
  }, deps)
}

export default useClickOutside
