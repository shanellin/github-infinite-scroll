import isBrowser from "./isBrowser"

export function openAsHyperlink(url?: string): void {
  if (!isBrowser || !url) return

  const a = document.createElement("a")
  a.href = url
  a.target = "_blank"
  a.rel = "noopener"
  a.click()
}
