import { CustomAction } from "../actions/types"
import { AuthPayload, AuthStatus } from "../actions/userActions"
export enum Role {
  user = "user",
  owner = "owner",
}
export type AuthState = AuthPayload
export const initialAuthState: AuthState = {
  name: "",
  email: "",
  roles: [],
} as AuthState
export const authReducer = (state = initialAuthState, action: CustomAction<AuthPayload>): AuthState => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        name: action.data.name,
        email: action.data.email,
        roles: action.data.roles,
        status: action.data.status,
      }
    case "LOG_OUT":
      return initialAuthState
    default:
      return initialAuthState
  }
}
