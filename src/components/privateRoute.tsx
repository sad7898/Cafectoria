import React, { ComponentType } from "react"
import { Route, RouteProps, useHistory } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface PrivateRouteProps extends RouteProps {
  component: ComponentType
}
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth)
  const history = useHistory()
  return <>{auth.isLogged ? <Route {...rest} render={(props) => <Component {...rest} {...props} />} /> : history.push("/login")}</>
}

export default PrivateRoute
