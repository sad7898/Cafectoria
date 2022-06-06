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
  const { name, email, roles } = action.data
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        name,
        email,
        roles,
        isLogged: true,
      }
    case "LOG_OUT":
      return initialAuthState
    default:
      return initialAuthState
  }
}
