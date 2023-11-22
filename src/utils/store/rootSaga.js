import { all, fork } from "redux-saga/effects";

import capabilitiesSaga from "../../services/capabilities/saga"; //../../components/capabilities/redux/saga

const sagas = [
  capabilitiesSaga,
];

function* rootSaga() {
  yield all(sagas.map((saga) => fork(saga)));
}

export default rootSaga;
