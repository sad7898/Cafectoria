import { CustomAction } from "../actions/types"
import { AuthPayload } from "../actions/userActions"
export enum Role {
  user = "user",
  owner = "owner",
}
export interface AuthState extends AuthPayload {
  isLogged: boolean
}
export const initialAuthState: AuthState = {
  isLogged: false,
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
        isLogged: true,
      }
    case "LOG_OUT":
      return initialAuthState
    default:
      return initialAuthState
  }
}
