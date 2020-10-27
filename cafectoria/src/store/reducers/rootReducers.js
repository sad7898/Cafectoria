import {combineReducers} from 'redux';
import {authReducer} from './authReducer.js'
import {navReducer} from './navReducer.js'

const rootReducer  = combineReducers({
    auth : authReducer,
    nav : navReducer
})

export default rootReducer;