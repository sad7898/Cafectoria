import React, { ComponentType } from "react"
import { Route, RouteProps, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface PrivateRouteProps extends RouteProps {
  component: ComponentType
}
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()
  return <>{auth.isLogged ? <Route {...rest} element={<Component />} /> : navigate("/login")}</>
}

export default PrivateRoute
