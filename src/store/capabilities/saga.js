import { all, call, fork, takeEvery, put, takeLatest } from "redux-saga/effects"
import * as actionTypes from "./actionTypes"
import CapabilitiesService from "./service"
import axios from "axios"

const capabilitiesService = new CapabilitiesService()

function* getTechCountWorker(action) {
  try {
    // const res = yield call(capabilitiesService.getTechCount)
    // console.log(res)
    console.log('calling...');
    axios.get('https://fakestoreapi.com/products').then(res => console.log(res))
  } catch (error) {
    console.log('message...', error.message);
  }
}

function* capabilitiesSaga() {
  yield takeEvery(actionTypes.GET_TECH_COUNT_REQUEST, getTechCountWorker)
}

export default capabilitiesSaga
