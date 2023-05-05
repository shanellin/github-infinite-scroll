import { Theme, ThemeOptions } from "@mui/material/styles"

declare module "@mui/material/styles" {
  interface Palette {
    [key: string]: number | string
  }
  interface PaletteOptions {
    [key: string]:
      | {
          [key: string]: number | string
        }
      | number
      | string
  }
  interface TypeText {
    [key: string]: string
  }
  interface TypeTextOptions {
    [key: string]: string
  }
  interface TypeBackground {
    [key: string]: string
  }
  interface TypeBackgroundOptions {
    [key: string]: string
  }
  interface Theme {
    border: number | string
    customZIndex: number | string
    customDivider: number | string
  }
  interface ThemeOptions {
    border: {
      [key: string]: number | string
    }
    customZIndex: {
      [key: string]: number | string
    }
    customDivider: {
      [key: string]: number | string
    }
  }
}
