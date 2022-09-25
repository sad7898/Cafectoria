import React, { ComponentType, HTMLProps } from "react"
import { useSelector } from "react-redux"
import { RouteProps, useNavigate, Route, Navigate } from "react-router-dom"
import { AuthStatus } from "../../store/actions/userActions"
import { RootState } from "../../store/store"
const LoadingAuth: React.FC<any> = () => <div>Loading...</div>
const withAuthGuard = <T,>(Component: ComponentType<T>, redirectTo?: string): React.FC<T> => {
  return ({ ...props }) => {
    const auth = useSelector((state: RootState) => state.auth)
    if (auth.status === AuthStatus.AUTH) return <Component {...(props as T & JSX.IntrinsicAttributes)} />
    else if (auth.status === AuthStatus.PENDING) return null
    return redirectTo ? <Navigate replace to={redirectTo}></Navigate> : null
  }
}

export default withAuthGuard
