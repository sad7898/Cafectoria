import { Action } from "redux";
import { CustomAction } from "../actions/types";
export interface AuthState {
  user: string;
  isLogged: boolean;
}
const initialState: AuthState = {
  user: "",
  isLogged: false,
};
export const authReducer = (state = initialState, action: CustomAction) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        user: action.data,
        isLogged: true,
      };
    case "LOG_OUT":
      return initialState;
    default:
      return initialState;
  }
};
