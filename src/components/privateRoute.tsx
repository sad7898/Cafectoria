import { Route, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
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
