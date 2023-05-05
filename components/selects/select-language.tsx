import { FC } from "react"
import { useRouter } from "next/router"
// Components
import Box from "@mui/material/Box"
import { SelectItem } from "./select-language.styles"
// Libs
import { languageOptions } from "@constants"
import { useTranslation } from "next-i18next"
// Styles

interface ISelectLanguage {}

const SelectLanguage: FC<ISelectLanguage> = ({}) => {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { locale, pathname, asPath, query } = router

  const handleLanguageClick = (language) => {
    if (locale !== language) {
      router.push({ pathname, query }, asPath, { locale: language, shallow: true })
      i18n.changeLanguage(language)
    }
  }

  return (
    <Box sx={boxStyle}>
      {languageOptions.map((item) => (
        <SelectItem
          key={`language_${item.id}`}
          choosed={locale === item.id ? 1 : 0}
          choosedstyle={{ weight: "500" }}
          onClick={() => handleLanguageClick(item.id)}
        >
          {t(item.label)}
        </SelectItem>
      ))}
    </Box>
  )
}

const boxStyle = {
  position: "absolute",
  right: "-10px",
  width: "170px",
  padding: "8px 0px",
  background: "white",
  borderRadius: "12px",
  border: "solid 1px #eaeaea",
  boxShadow: "0 2px 12px 0 rgba(0, 0, 0, 0.08)",
  "&::before": {
    content: "''",
    position: "absolute",
    right: "14px",
    top: "-7px",
    borderWidth: "7px",
    borderStyle: "solid",
    borderTopColor: "transparent",
    borderLeftColor: "transparent",
    borderColor: "#fff",
    borderRadius: "0 0 4px 0",
    transform: "rotate(-135deg)"
  }
}

export default SelectLanguage
