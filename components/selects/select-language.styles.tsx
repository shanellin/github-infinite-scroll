import { MenuItem as muiMenuItem, styled } from "@mui/material"

interface ISelectItem {
  choosed: number
  choosedstyle?: { [key: string]: string }
}

export const SelectItem = styled(muiMenuItem)<ISelectItem>(({ theme, choosed, choosedstyle }) => {
  let style = {
    display: "flex",
    alignItems: "center",
    padding: "8px 14px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "normal",
    color: theme.palette.text.black2,
    wordBreak: "break-word" as "break-word",
    backgroundColor: theme.palette.background.default
  }
  if (choosed) {
    style.color = theme.palette.text.blue_light
    style.fontWeight = choosedstyle?.weight || "600"
  }
  return style
})
