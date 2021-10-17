
import {Route,useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
const PrivateRoute = ({ component: Component, ...rest }) => {
    let auth = useSelector(state => state.auth);
    let history = useHistory()
    return (
        <>
        { auth.isLogged ? 
        <Route {...rest} render={
          props => <Component {...rest} {...props} />
        } />
    : history.push('/login')}
    </>
      )
}

export default PrivateRoute;