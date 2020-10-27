import {createStore} from 'redux';
import rootReducer from './reducers/rootReducers.js';
let store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;