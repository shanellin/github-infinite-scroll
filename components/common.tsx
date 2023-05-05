import { styled } from "@mui/material"
import Box from "@mui/material/Box"
import { Theme } from "@mui/material/styles"

interface ISpace {
  length: string
}

export const VSpace = styled("div")<ISpace>(({ length }) => ({
  flexShrink: 0,
  height: `${length}px`,
  minHeight: `${length}px`
}))

export const HSpace = styled("div")<ISpace>(({ length }) => ({
  flexShrink: 0,
  width: `${length}px`,
  minWidth: `${length}px`
}))

interface IRow {
  align?: string
}

export const Row = styled(Box)<IRow>(({ align }) => ({
  display: "flex",
  position: "relative",
  alignItems: align || "center"
}))

interface IText {
  theme?: Theme
  display?: string
  margin?: string
  cursor?: string
  width?: string
  textalign?: string
  size?: string
  weight?: string
  minwidth?: string
  color?: string
  wordbreak?: string
  whitespace?: string
  textoverflow?: string
  overflow?: string
}

export const Text = styled("p")<IText>(
  ({
    theme,
    display,
    margin,
    cursor,
    width,
    textalign,
    size,
    weight,
    minwidth,
    color,
    wordbreak,
    whitespace,
    textoverflow,
    overflow
  }) => ({
    display: display || "unset",
    margin: margin || "0px",
    cursor: cursor || "unset",
    width: width || "unset",
    textAlign: (textalign as any) || "unset",
    fontSize: size || "14px",
    fontWeight: weight || "300",
    minWidth: minwidth || "unset",
    color: theme.palette.text[color || "primary"],
    wordBreak: (wordbreak as any) || "normal",
    whiteSpace: (whitespace as any) || "normal",
    textOverflow: textoverflow || "normal",
    overflow: overflow || "normal"
  })
)
