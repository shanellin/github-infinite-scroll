import { createTheme } from "@mui/material/styles"

const colors = {
  blue: "#00324e",
  blue_light: "#006aa6",
  blue2: "#00588a",
  blue3: "#3397cf",
  purple: "#796a9a",
  gray: "#cfcfd9",
  gray1: "#e1e1e1",
  gray2: "rgba(0, 0, 0, 0.5)",
  brown: "#9c9999",
  yellow: "#fac043",
  yellow_dark: "#B68720",
  green: "#0a792d",
  green_light: "#34ae60",
  red: "#f66361",
  red_dark: "#eb5757",
  white: "#ffffff",
  paper: "#fcfcfc",
  black: "#2f2e41",
  black2: "rgba(0, 0, 0, 1)",
  transparent: "transparent"
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1200,
      xl: 1536
    }
  },
  palette: {
    primary: {
      main: colors.yellow,
      light: colors.yellow,
      dark: colors.yellow_dark,
      contrastText: colors.white
    },
    secondary: {
      main: colors.gray,
      light: colors.gray,
      dark: colors.gray,
      contrastText: colors.white
    },
    error: {
      main: colors.red,
      dark: colors.red_dark
    },
    info: {
      main: colors.blue,
      light: colors.blue_light
    },
    success: {
      main: colors.green,
      dark: colors.green,
      light: colors.green_light
    },
    text: {
      white: colors.white,
      blue_light: colors.blue_light,
      blue3: colors.blue3,
      gray2: colors.gray2,
      black2: colors.black2
    },
    divider: colors.yellow,
    background: {
      gray: colors.gray,
      gray1: colors.gray1,
      default: colors.white,
      paper: colors.paper,
      yellow: colors.yellow,
      blue2: colors.blue2,
      blue3: colors.blue3,
      blue_light: colors.blue_light
    }
  },
  typography: {
    button: {
      textTransform: "none"
    }
  },
  border: {
    yellow: colors.yellow,
    transparent: colors.transparent
  },
  customZIndex: {
    header: 1000,
    footer: 1000,
    statusBar: 1000,
    sideBar: 1200,
    modal: 1300
  },
  customDivider: {
    yellow: colors.yellow
  },
  components: {}
})

export default theme
