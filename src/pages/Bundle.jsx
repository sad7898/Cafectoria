import React, { useState, useEffect, useContext } from 'react';
import Main from './landing/landingMain.jsx';
import Register from './register/regMain.jsx';
import {Route,Switch,Link} from 'react-router-dom';
import {Wrapper} from '../components/containers.jsx';
import {Sidebar} from '../components/nav/nav.jsx';
import {CustomFooter} from '../components/footer.jsx'
import {useDispatch,useSelector} from 'react-redux'
import {LogOut,setCurrentUser} from '../store/actions/userActions.js';
import {TransitionGroup,CSSTransition} from 'react-transition-group';
import Login from './login/loginMain.jsx';
import Axios from 'axios';
export let Loading = React.createContext({
    isLoading: false,
    setLoading: () => {}
});
const Bundle = (props) => {
    let auth = useSelector(state => state.auth)
    let dispatch = useDispatch()
    let [load,setLoad] = useState(false);
    const value = {load,setLoad}
    const verify = () => {
        Axios.get('https://cafetoria-backend.herokuapp.com/user/verify', {withCredentials: true})
        .then((res) => {
            setCurrentUser(res.user)
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    useEffect(() => {
        Axios.get('https://cafetoria-backend.herokuapp.com/user/verify', {crossDomain:true,withCredentials:true})
        .then((res) => {
            setCurrentUser(res.user)
        })
        .catch(err => {
            console.log(err.response)
        })
    },[])
    return (
        <Loading.Provider value={value}>
            <Sidebar/>
                <Switch>
                    <Route path="/register">
                        <Register></Register>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route exact path="/">
                        <Main/>
                    </Route>
                </Switch>
            <CustomFooter>Blackmarble Corps. ltd</CustomFooter>
        </Loading.Provider>
    )
}
export default Bundle;