import React, { ComponentType, HTMLProps } from "react"
import { useSelector } from "react-redux"
import { RouteProps, useNavigate, Route, Navigate } from "react-router-dom"
import { RootState } from "../../store/store"

const withAuthGuard = <T,>(Component: ComponentType<T>, redirectTo?: string): React.FC<T> => {
  return ({ ...props }) => {
    const auth = useSelector((state: RootState) => state.auth)
    if (auth.isLogged) return <Component {...(props as T)} />
    return redirectTo ? <Navigate replace to={redirectTo}></Navigate> : null
  }
}

export default withAuthGuard
