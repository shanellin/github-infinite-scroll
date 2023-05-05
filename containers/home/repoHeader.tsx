import { FC, useEffect } from "react"
// Components
import { Wrapper, PreferSortBtn } from "./repoHeader.styles"
import { Row } from "@components/common"
// Libs
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { useTranslation } from "next-i18next"
import { setSort, getRepos } from "@states/slices/repo"
// Styles

interface IProps {}

const RepoHeader: FC<IProps> = (props) => {
  const {} = props

  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const sortState = useAppSelector((state) => state.repo.sort)

  useEffect(() => {
    window.addEventListener("scroll", isSticky)
    return () => {
      window.removeEventListener("scroll", isSticky)
    }
  })

  const isSticky = (e) => {
    const repoHeader = document.getElementById("repoHeader")
    if (repoHeader) {
      if (window.pageYOffset > repoHeader.offsetHeight) {
        repoHeader.classList.add("is-sticky")
      } else {
        repoHeader.classList.remove("is-sticky")
      }
    }
  }

  const handleChangeSort = (sort) => {
    if (sortState === sort) return
    dispatch(setSort({ sort }))
    dispatch(getRepos())
  }

  return (
    <Wrapper id="repoHeader">
      <Row style={{ height: "100%" }}>
        <PreferSortBtn choosed={sortState === "stars"} onClick={() => handleChangeSort("stars")}>
          {t("REPO_HEADER_Hotest")}
        </PreferSortBtn>
        <PreferSortBtn choosed={sortState === "updated"} onClick={() => handleChangeSort("updated")}>
          {t("REPO_HEADER_Newest")}
        </PreferSortBtn>
      </Row>
    </Wrapper>
  )
}

export default RepoHeader
