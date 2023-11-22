import { all, fork } from "redux-saga/effects"

import capabilitiesSaga from "../pages/Capabilities/redux/saga"

const sagas = [capabilitiesSaga]

export function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}
