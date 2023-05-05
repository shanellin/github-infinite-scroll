import { FC, useState, useRef } from "react"
// Components
import { HeaderWrapper, SearchWrapper } from "./index.styles"
import ImgBase from "@components/images/image-base"
import { InputSearch } from "@components/inputs"
import { SelectLanguage } from "@components/selects"
import { ArrowIcon } from "@components/icons"
import Box from "@mui/material/Box"
// Libs
import { useAppDispatch } from "@hooks/app"
import { setKeyword } from "@slices/repo"
import { getRepos } from "@slices/repo"
import useClickOutside from "@hooks/useClickOutside"
import debounce from "@utils/debounce"
// Styles

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const languageRef = useRef<HTMLDivElement>(null)

  useClickOutside(languageRef, () => setOpen(false), [open])

  const handleInputChange = (event) => {
    const value = event.target.value.trim()
    if (value.length) {
      debounceInput(value)
    }
  }

  const debounceInput = debounce((keyword) => {
    dispatch(setKeyword({ keyword }))
    dispatch(getRepos())
  }, 400)

  return (
    <HeaderWrapper>
      <InputSearch
        placeholder="react"
        onChange={(event) => handleInputChange(event)}
        deleteClick={() => debounceInput("")}
      />
      <Box sx={{ position: "relative" }}>
        <div onClick={() => setOpen(true)} ref={languageRef}>
          <ArrowIcon />
        </div>
        {open && <SelectLanguage />}
      </Box>
    </HeaderWrapper>
  )
}

export default Header
