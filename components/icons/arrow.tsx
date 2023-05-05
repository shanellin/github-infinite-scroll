import { FC } from "react"

interface ArrowIcon {
  width?: string
}

const ArrowIcon: FC<ArrowIcon> = (props) => {
  const { width = "24px" } = props
  return (
    <svg
      viewBox="0 0 24 24"
      focusable="false"
      role="img"
      aria-hidden="true"
      style={{ width, fill: "rgba(255, 255, 255, 1)", cursor: "pointer" }}
    >
      <path d="m11.08 15.62-4.69-4.69a1.31 1.31 0 0 1 .92-2.24h9.38a1.31 1.31 0 0 1 .92 2.24l-4.69 4.69a1.3 1.3 0 0 1-1.84 0z"></path>
    </svg>
  )
}

export default ArrowIcon
