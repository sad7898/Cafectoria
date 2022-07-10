import React, { ComponentType } from "react"
import { useSelector } from "react-redux"
import { RouteProps, useNavigate, Route, Navigate } from "react-router-dom"
import { AuthStatus } from "../../store/actions/userActions"
import { RootState } from "../../store/store"

const PrivateRoute = ({ element, ...rest }: RouteProps) => {
  const auth = useSelector((state: RootState) => state.auth)
  if (auth.status === AuthStatus.AUTH) {
    return <Route {...rest} element={element} />
  }
  return <Navigate to="/login"></Navigate>
}

export default PrivateRoute
