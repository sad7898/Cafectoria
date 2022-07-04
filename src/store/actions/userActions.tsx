import { initialAuthState } from "../reducers/authReducer"
import { CustomAction } from "./types"
export enum Role {
  user = "user",
  owner = "owner",
}
export interface AuthPayload {
  name: string
  email: string
  roles: Role[]
}
export const setCurrentUser = (payload: AuthPayload): CustomAction<AuthPayload> => {
  return {
    type: "SET_CURRENT_USER",
    data: payload,
  }
}
export const LogOut = (): CustomAction<AuthPayload> => {
  localStorage.setItem("token", "")
  return {
    type: "LOG_OUT",
    data: initialAuthState,
  }
}
