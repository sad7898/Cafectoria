import jwtDecode from "jwt-decode"
import React, { ComponentType, HTMLProps } from "react"
import { useDispatch, useSelector } from "react-redux"
import { RouteProps, useNavigate, Route, Navigate } from "react-router-dom"
import { AuthPayload, AuthStatus, setCurrentUser } from "../../store/actions/userActions"
import { initialAuthState } from "../../store/reducers/authReducer"
import { RootState } from "../../store/store"
const LoadingAuth: React.FC<any> = () => <div>Loading...</div>
export const getUser = () => {
  const token = localStorage.getItem("token")
  if (!token) return null
  try {
    const user = jwtDecode<AuthPayload>(token)
    return { ...user, status: AuthStatus.AUTH }
  } catch (err) {
    return null
  }
}
const withAuthGuard = <T,>(Component: ComponentType<T>, redirectTo?: string): React.FC<T> => {
  return ({ ...props }) => {
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    if (auth.status === AuthStatus.AUTH) return <Component {...(props as T & JSX.IntrinsicAttributes)} />
    else {
      const user = getUser()
      if (!user) {
        dispatch(setCurrentUser(initialAuthState))
        return redirectTo ? <Navigate replace to={redirectTo}></Navigate> : null
      }
      dispatch(setCurrentUser({ ...user, status: AuthStatus.AUTH }))
      return <Component {...(props as T & JSX.IntrinsicAttributes)} />
    }
  }
}

export default withAuthGuard
