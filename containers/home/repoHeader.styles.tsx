import { styled } from "@mui/material"

export const Wrapper = styled("div")(({ theme }) => ({
  boxSizing: "content-box",
  borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
  [theme.breakpoints.up("sm")]: {
    height: "60px",
    padding: "20px 60px 0px"
  },
  [theme.breakpoints.down("sm")]: {
    height: "60px !important",
    padding: "0px 20px"
  }
}))

interface IPreferSortBtn {
  choosed: boolean
}

export const PreferSortBtn = styled("div")<IPreferSortBtn>(({ theme, choosed }) => {
  let style = {
    fontSize: "16px",
    fontWeight: "500",
    padding: "0px 16px",
    cursor: "pointer",
    color: "rgba(0, 0, 0, 0.35)",
    height: "100%",
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid transparent"
  }
  if (choosed) {
    style.color = "rgba(0, 0, 0, 1)"
    style.borderBottom = "2px solid #3397cf"
  }
  return style
})
