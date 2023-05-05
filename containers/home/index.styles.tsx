import { styled } from "@mui/material"

export const MainWrapper = styled("main")(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  minHeight: "calc(100vh - 48px)",
  [theme.breakpoints.up("sm")]: {
    paddingTop: "20px"
  },
  [theme.breakpoints.down("sm")]: {}
}))

export const RepoWrapper = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("sm")]: {
    minHeight: "calc(100vh - 68px)",
    borderRadius: "4px 4px 0 0",
    minWidth: "752px",
    maxWidth: "752px"
  },
  [theme.breakpoints.down("sm")]: {
    minHeight: "calc(100vh - 48px)",
    minWidth: "100%",
    maxWidth: "100%"
  }
}))
