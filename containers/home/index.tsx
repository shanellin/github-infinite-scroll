import { FC } from "react"
// Components
import { MainWrapper, RepoWrapper } from "./index.styles"
import RepoHeader from "./repoHeader"
import RepoContent from "./repoContent"
// Libs
// Styles

interface IProps {}

const HomePage: FC<IProps> = (props) => {
  const {} = props

  return (
    <>
      <MainWrapper>
        <RepoWrapper>
          <RepoHeader />
          <RepoContent />
        </RepoWrapper>
      </MainWrapper>
    </>
  )
}

export default HomePage
