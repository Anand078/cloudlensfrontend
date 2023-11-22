import * as actionTypes from "./actionTypes"

export const getTechCountRequest = () => ({
  type: actionTypes.GET_TECH_COUNT_REQUEST,
})

export const getTechCountSuccess = payload => ({
  type: actionTypes.GET_TECH_COUNT_SUCCESS,
  payload,
})

export const getTechCountFail = payload => ({
  type: actionTypes.GET_TECH_COUNT_FAIL,
  payload,
})
