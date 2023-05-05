import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RepoApi } from "../apis"

export const getRepos = createAsyncThunk("repo/getRepos", async (payload, { getState, rejectWithValue }) => {
  const { repo } = getState() as { repo: IInitialState }
  const { keyword, page, perPage, sort } = repo
  const keywordValue = keyword ? keyword : "react"

  try {
    let res = await RepoApi.getRepoList({ q: keywordValue, page, per_page: perPage, sort })
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

interface IInitialState {
  loading: boolean
  removeRepoList: boolean
  repoList: RepoApi.IgetRepoListItem
  perPage: number
  page: number
  keyword: string
  noMore: boolean
  sort: string
}

const initialState: IInitialState = {
  loading: false,
  removeRepoList: false,
  repoList: [] as RepoApi.IgetRepoListItem,
  perPage: 15,
  page: 1,
  keyword: "react",
  noMore: false,
  sort: "stars" //updated, stars
} as const

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    resetRepo: (state) => {
      return initialState
    },
    setKeyword: (state, { payload }: PayloadAction<{ keyword: string }>) => {
      state.keyword = payload.keyword
      state.removeRepoList = true
      state.repoList = []
      state.page = 1
      state.noMore = false
      return state
    },
    setSort: (state, { payload }: PayloadAction<{ sort: string }>) => {
      state.sort = payload.sort
      state.removeRepoList = true
      state.page = 1
      state.noMore = false
      return state
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getRepos.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getRepos.fulfilled, (state, { payload }: PayloadAction<RepoApi.IgetRepoListResponse>) => {
      if (state.removeRepoList) {
        state.repoList = payload.items
        state.removeRepoList = false
      } else {
        state.repoList = state.repoList.concat(payload.items)
      }
      if (state.repoList.length >= payload.total_count) {
        state.noMore = true
      }
      // Note: gihub search api sometimes gives duplicate data
      if (state.repoList.length) {
        let result: RepoApi.IgetRepoListItem = []
        let ids = new Set()
        for (let item of state.repoList) {
          if (!ids.has(item.id)) {
            result.push(item)
            ids.add(item.id)
          }
        }
        state.repoList = result
      }
      state.page = state.page + 1
      state.loading = false
    })
  }
})

export const { resetRepo, setKeyword, setSort } = repoSlice.actions
export default repoSlice.reducer
