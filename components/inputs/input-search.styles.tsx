import { styled, Box } from "@mui/material"

export const InputWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minWidth: "200px",
  maxWidth: "666px",
  [theme.breakpoints.up("sm")]: {
    padding: "0px 32px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0px 10px"
  }
}))

export const CrossButton = styled("button")(({ theme }) => ({
  height: "14px",
  width: "14px",
  position: "absolute",
  background: "transparent",
  padding: "0px",
  border: "0px",
  transform: "translate(-50%,-50%)",
  top: "50%",
  [theme.breakpoints.up("sm")]: {
    right: "40px"
  },
  [theme.breakpoints.down("sm")]: {
    right: "15px"
  }
}))
