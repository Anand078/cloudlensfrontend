import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isLoading: false,
  data: [],
  error: "",
}

const getTechCountReducer = createSlice({
  name: "tech-count",
  initialState,
  reducers: {
    getTechCountRequest(state, action) {
      state.isLoading = true
    },
    getTechCountSuccess(state, action) {
      state.isLoading = false
      state.data = action.payload
    },
    getTechCountFail(state, action) {
      state.isLoading = false
      state.error = action.payload
    },
  },
})

export const { getTechCountRequest, getTechCountSuccess, getTechCountFail } =
  getTechCountReducer.actions

export default getTechCountReducer
