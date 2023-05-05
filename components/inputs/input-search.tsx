import { FC, useRef } from "react"
import { InputBaseProps } from "@mui/material"
import Input from "./input-base"
import { CrossIcon } from "@components/icons"
import { CrossButton, InputWrapper } from "./input-search.styles"

interface IInput {
  size?: string
  weight?: string
  height?: string
  padding?: string
  delete?: boolean
}

const InputSearch: FC<IInput & InputBaseProps & { deleteClick?: () => void }> = (props) => {
  const { deleteClick, ...rest } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const handleDeleteClick = () => {
    if (inputRef.current) {
      inputRef.current.value = ""
    }
    deleteClick && deleteClick()
  }

  return (
    <InputWrapper>
      <Input {...rest} inputRef={inputRef} sx={{ boxSizing: "border-box", width: "100%" }} />
      <CrossButton onClick={() => handleDeleteClick()}>
        <CrossIcon />
      </CrossButton>
    </InputWrapper>
  )
}

export default InputSearch
