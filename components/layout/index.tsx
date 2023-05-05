import { FC, ReactNode } from "react"
// Components
import Header from "@components/header/index"
import { LayoutWrapper, MainWrapper } from "./index.styles"
// Libs
// Styles

interface ILayout {
  children?: ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
  
  return (
    <>
      <LayoutWrapper>
        <Header />
        <MainWrapper>{children}</MainWrapper>
      </LayoutWrapper>
    </>
  )
}

export default Layout
