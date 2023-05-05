import { styled, InputBase, InputBaseProps } from "@mui/material"

interface IInput {
  size?: string
  weight?: string
  height?: string
  padding?: string
  delete?: boolean
  sx?: any
}

const Input = styled((props) => <InputBase {...props} fullWidth={true} />)<IInput & InputBaseProps>(
  ({ theme, height, padding, size, weight }) => {
    let style = {
      fontSize: size || "14px",
      fontWeight: weight || "normal",
      height: height || "30px",
      padding: padding || "0px 8px",
      borderRadius: "4px",
      color: theme.palette.text.white,
      background: theme.palette.background.blue2,
      "& .MuiInputBase-input": { textAlign: "start" },
      "& .MuiInputBase-input::placeholder": { color: theme.palette.text.gray4 }
    }
    return style
  }
)

export default Input
