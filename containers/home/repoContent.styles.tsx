import { styled, Box } from "@mui/material"

export const RepoList = styled(Box)(({ theme }) => ({}))

export const RepoItem = styled("article")(({ theme }) => ({
  boxSizing: "border-box",
  display: "grid",
  gridTemplateRows: "auto 12px auto 4px 20px 4px auto 16px auto",
  borderBottom: "1px solid rgb(233, 233, 233)",
  [theme.breakpoints.up("sm")]: {
    padding: "20px 0px",
    margin: "0px 60px"
  },
  [theme.breakpoints.down("sm")]: {
    padding: "10px 0px",
    margin: "0px 20px"
  }
}))

export const FullName = styled("h2")(({ theme }) => ({
  fontSize: "18px",
  color: "rgb(0, 54, 177)",
  cursor: "pointer",
  "&:hover": {
    color: "rgba(0, 54, 177, 0.5)"
  }
}))

export const Topic = styled("div")(({ theme }) => ({
  padding: "0px 5px",
  borderRadius: "5px",
  backgroundColor: "rgba(237, 236, 255, 0.5)",
  color: "rgb(91,169,252)"
}))

export const BottomBox = styled("div")(({ theme }) => ({
  width: "100%",
  height: "80px",
  justifyContent: "center",
  alignItems: "center",
  display: "flex"
}))

export const Loading = styled("div")(({ theme }) => ({
  display: "block",
  position: "relative",
  width: "6px",
  height: "10px",
  marginTop: "15px",
  animation: "rectangle infinite 1s ease-in-out -0.2s",
  backgroundColor: theme.palette.background.gray1,
  "@keyframes rectangle": {
    "0%, 80%, 100%": {
      height: "15px",
      boxShadow: `0 0 ${theme.palette.background.gray1}`
    },
    "40%": {
      height: "24px",
      boxShadow: `0 -20px ${theme.palette.background.gray1}`
    }
  },
  "&::before, &::after": {
    position: "absolute",
    width: "5px",
    height: "10px",
    content: "''",
    backgroundColor: theme.palette.background.gray1
  },
  "&::before": {
    left: "-14px",
    animation: "rectangle infinite 1s ease-in-out -0.4s"
  },
  "&::after": {
    right: "-14px",
    animation: "rectangle infinite 1s ease-in-out"
  }
}))
