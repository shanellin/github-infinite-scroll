import http from "./apiServices"

export interface IgetRepoListPayload {
  q: string
  page: number
  per_page: number
  sort: string
}

export interface IgetRepoListResponse {
  total_count: number
  incomplete_result: boolean
  items: IgetRepoListItem
}

export type IgetRepoListItem = {
  id: number
  name: string
  full_name: string
  private: false
  owner: {
    [key: string]: any
  }
  html_url: string
  description: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  topics: string[]
  [key: string]: any
}[]

export const getRepoList = ({ q, page, per_page, sort }: IgetRepoListPayload) => {
  return http.get<IgetRepoListResponse>("https://api.github.com/search/repositories", {
    params: { q, page, per_page, sort }
  })
}
