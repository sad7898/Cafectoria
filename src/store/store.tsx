import { createStore } from "redux";
import rootReducer from "./reducers/rootReducers";
const store = createStore(rootReducer);
export type RootState = ReturnType<typeof store.getState>;
export default store;
