import {combineReducers} from 'redux';
import {authReducer} from './authReducer.js'
import {loadReducer} from './loadReducer.js'

const rootReducer  = combineReducers({
    auth : authReducer,
    load : loadReducer
})

export default rootReducer;