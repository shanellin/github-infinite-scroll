import { styled } from "@mui/material"

export const HeaderWrapper = styled("header")(({ theme }) => ({
  display: "flex",
  position: "fixed",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "48px",
  padding: "0px 20px",
  zIndex: 100,
  background: theme.palette.background.blue_light
}))

export const SearchWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    padding: "0px 16px"
  },
  [theme.breakpoints.down("sm")]: {}
}))
