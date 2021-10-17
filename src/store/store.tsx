import { createStore } from "redux";
import rootReducer from "./reducers/rootReducers";
let store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export default store;
