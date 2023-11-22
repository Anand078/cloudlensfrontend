import * as actionTypes from "./actionTypes"

const INIT_STATE = {
  isLoading: false,
  data: [],
  error: "",
}

const TechCountReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case actionTypes.GET_TECH_COUNT_REQUEST:
      return {
        ...state,
        isLoading: true,
      }
    case actionTypes.GET_TECH_COUNT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      }
    case actionTypes.GET_TECH_COUNT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default TechCountReducer
