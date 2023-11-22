import {call, put, takeLatest} from 'redux-saga/effects'
import {getTechCountRequest, getTechCountSuccess, getTechCountFail} from './slices/getTechCount'



function* getTechCountWorker(action){
    console.log('calling.....');
}

function* capabilitiesSaga(){
   yield takeLatest(getTechCountRequest.type, getTechCountWorker)
}
export default capabilitiesSaga