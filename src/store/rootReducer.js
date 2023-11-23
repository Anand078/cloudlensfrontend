import {combineReducers} from 'redux'
import layoutReducer from './layout.reducer'

export const rootReducer = combineReducers({
    [layoutReducer.name] : layoutReducer.reducer
})