import React from "react";
import { Route, RouteProps, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { ComponentType } from "react-router/node_modules/@types/react";
interface PrivateRouteProps extends RouteProps {
  component: ComponentType;
}
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const history = useHistory();
  return (
    <>
      {auth.isLogged ? (
        <Route
          {...rest}
          render={(props) => <Component {...rest} {...props} />}
        />
      ) : (
        history.push("/login")
      )}
    </>
  );
};

export default PrivateRoute;
