import { FC, useRef, useEffect, useCallback, useState } from "react"
// Components
import { RepoList, RepoItem, FullName, Topic, BottomBox, Loading } from "./repoContent.styles"
import { Row, Text } from "@components/common"
import ImgBase from "@components/images/image-base"
import { StartIcon, ForkIcon, WatchIcon, UpdatIcon } from "@components/icons"
// Libs
import { useAppDispatch, useAppSelector } from "@hooks/app"
import { useTranslation } from "next-i18next"
import { openAsHyperlink } from "@utils/hyperlinkUtils"
import { getRepos } from "@slices/repo"
import { RepoApi } from "@states/apis"
import throttle from "@utils/throttle"
import deepClone from "@utils/deepClone"
// Styles

interface IProps {}

const RepoContent: FC<IProps> = (props) => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const repoStoreData = useAppSelector((state) => state.repo)

  const [showList, setShowList] = useState<RepoApi.IgetRepoListItem>([])

  const defaultArticleHeight = 193

  const repoListStatusRef = useRef<{ loading: boolean; noMore: boolean }>({
    loading: repoStoreData.loading,
    noMore: repoStoreData.noMore
  })
  const repoListDataRef = useRef<RepoApi.IgetRepoListItem>([])
  const repoListDomRef = useRef<HTMLDivElement>(null)
  const repoListStyleRef = useRef<{ paddingTop: string; paddingBottom: string }>({
    paddingTop: "0px",
    paddingBottom: "0px"
  })
  const lastStartIndex = useRef<number>(-1)

  useEffect(() => {
    if (typeof window !== "undefined") {
      repoListStyleRef.current = {
        paddingTop: `0px`,
        paddingBottom: `${window.innerHeight}px`
      }
      window.addEventListener("scroll", boxScroll)
      return () => {
        window.removeEventListener("scroll", boxScroll)
      }
    }
  }, [])

  useEffect(() => {
    repoListDataRef.current = deepClone(repoStoreData.repoList)
    repoListStatusRef.current = {
      loading: repoStoreData.loading,
      noMore: repoStoreData.noMore
    }
    const dataList = repoListDataRef.current
    for (let i = 0; i < repoListDataRef.current.length; i++) {
      dataList[i].index = i
      dataList[i].height = defaultArticleHeight
      dataList[i].top = dataList[i - 1]?.bottom || 0
      dataList[i].bottom = dataList[i].top + dataList[i].height
    }
    scrollHandle(true)
  }, [repoStoreData.repoList])

  useEffect(() => {
    if (repoListDomRef.current?.children.length && showList.length) {
      const doms: HTMLElement[] = Array.from(repoListDomRef.current.children) as HTMLElement[]
      for (let i = 0; i < doms.length; i++) {
        const realHeight = doms[i].offsetHeight
        const originHeight = showList[i].height
        const dValue = realHeight - originHeight
        if (dValue) {
          const index = showList[i].index
          const allData = repoListDataRef.current
          if (allData[index]) {
            allData[index].bottom += dValue
            allData[index].height = realHeight
            for (let j = index + 1; j < allData.length; j++) {
              allData[j].top = allData[j - 1].bottom
              allData[j].bottom += dValue
            }
          }
        }
      }
    }
  })

  const boxScroll = useCallback(
    throttle(() => {
      scrollHandle()
    }, 500),
    []
  )

  const scrollHandle = (reset?: boolean) => {
    let { startIndex, endIndex } = getIndex()

    if (lastStartIndex.current === startIndex && !reset) return
    lastStartIndex.current = startIndex

    const currLen = repoListDataRef.current.length
    if (endIndex >= currLen - 3 && !repoListStatusRef.current.loading && !repoListStatusRef.current.noMore) {
      repoListStatusRef.current.loading = true
      dispatchGetRepos()
    }

    if (repoListDataRef.current.length) {
      repoListStyleRef.current = {
        paddingTop: `${repoListDataRef.current[startIndex].top}px`,
        paddingBottom: `${
          repoListDataRef.current[repoListDataRef.current.length - 1].bottom - repoListDataRef.current[endIndex].bottom
        }px`
      }
      setShowList(repoListDataRef.current.slice(startIndex, endIndex + 1))
    } else {
      repoListStyleRef.current = {
        paddingTop: `0px`,
        paddingBottom: `0px`
      }
      setShowList([])
    }
  }

  const getIndex = () => {
    const aboveCount = 3
    const belowCount = 3
    const resObj = {
      startIndex: 0,
      endIndex: 0
    }
    const scrollTop = window.scrollY || 0
    const curContainerHeight = window.innerHeight || 800

    const startIndex = binarySearch(scrollTop, "top")
    resObj.startIndex = startIndex + 1 > aboveCount ? startIndex - aboveCount : 0

    const currLen = repoListDataRef.current.length
    const containerMaxSize = Math.ceil(curContainerHeight / defaultArticleHeight) + 1
    const endIndex = binarySearch(scrollTop + curContainerHeight, "bottom")
    resObj.endIndex = endIndex + belowCount
    if (resObj.endIndex - resObj.startIndex > containerMaxSize) {
      resObj.endIndex = resObj.startIndex + containerMaxSize + belowCount
    }
    if (resObj.endIndex > currLen - 1) {
      resObj.endIndex = currLen - 1
    }
    return resObj
  }

  const binarySearch = (value: number, type: "top" | "bottom") => {
    const list = repoListDataRef.current
    let start = 0
    let end = list.length - 1
    let tempIndex = -1
    while (start <= end) {
      let midIndex = parseInt(((start + end) / 2).toString())
      let midValue = list[midIndex][type]
      if (midValue === value) {
        return midIndex + 1
      } else if (midValue < value) {
        start = midIndex + 1
      } else if (midValue > value) {
        end = midIndex - 1
        if (tempIndex === -1 || tempIndex > midIndex) {
          tempIndex = midIndex
        }
      }
    }
    if (type === "bottom" && tempIndex === -1) {
      return start
    }
    return tempIndex
  }

  const dispatchGetRepos = async () => {
    await dispatch(getRepos())
    repoListStatusRef.current.loading = false
  }

  return (
    <>
      <RepoList
        style={{
          paddingBottom: repoListStyleRef.current?.paddingBottom,
          paddingTop: repoListStyleRef.current?.paddingTop,
          opacity: repoStoreData.removeRepoList ? 0.4 : 1
        }}
        ref={repoListDomRef}
      >
        {showList.map((item) => (
          <RepoItem key={`repo_${item.id}`}>
            <Row style={{ gap: "5px" }}>
              <UpdatIcon />
              <Text color="gray2" weight="400">
                {t("REPO_CONTENT_Updated")} - {item.pushed_at?.split("T")[0]}
              </Text>
            </Row>
            <div />
            <FullName onClick={() => openAsHyperlink(item.html_url)}>{item.full_name}</FullName>
            <div />
            <Text textoverflow="ellipsis" overflow="hidden" whitespace="nowrap" color="black2" weight="400">
              {item.description}
            </Text>
            <div />
            <Row style={{ gap: "2px 5px", flexWrap: "wrap" }}>
              {item.topics.map((topic) => (
                <Topic key={`repo_${item.id}_topic_${topic}`}>{topic}</Topic>
              ))}
            </Row>
            <div />
            <Row style={{ gap: "10px" }}>
              <Row style={{ gap: "5px" }}>
                <WatchIcon />
                <Text color="black2" size="14px">
                  {thousandDisplay(item.watchers_count)}
                </Text>
              </Row>
              <Row style={{ gap: "5px" }}>
                <ForkIcon />
                <Text color="black2" size="14px">
                  {thousandDisplay(item.forks_count)}
                </Text>
              </Row>
              <Row style={{ gap: "5px" }}>
                <StartIcon />
                <Text color="black2" size="14px">
                  {thousandDisplay(item.stargazers_count)}
                </Text>
              </Row>
            </Row>
          </RepoItem>
        ))}
      </RepoList>
      {<BottomBox>{repoStoreData.noMore ? <Text>{t("REPO_CONTENT_No_more")}</Text> : <Loading />}</BottomBox>}
    </>
  )
}

const thousandDisplay: (number) => string = (count) => {
  if (parseInt(count) >= 1000) {
    return `${(count / 1000).toFixed(1)}k`
  }
  return count
}

export default RepoContent
