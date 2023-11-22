import {combineReducers} from 'redux'
import getTechCountReducer from '../pages/Capabilities/redux/slices/getTechCount'
import layoutReducer from './layout.reducer'

export const rootReducer = combineReducers({
    [getTechCountReducer.name] : getTechCountReducer.reducer,
    [layoutReducer.name] : layoutReducer.reducer
})