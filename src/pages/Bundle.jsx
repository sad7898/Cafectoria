import React, { useState, useEffect} from 'react';
import Main from './landing/landingMain.jsx';
import Register from './register/regMain.jsx';
import Login from './login/loginMain.jsx';
import Forum from './forum/forumMain.jsx';
import {Route,Switch} from 'react-router-dom';
import {Wrapper} from '../components/containers.jsx';
import {Sidebar} from '../components/nav/nav.jsx';
import {CustomFooter} from '../components/footer.jsx'
import {useDispatch,useSelector} from 'react-redux'
import {setCurrentUser} from '../store/actions/userActions.js';

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
            console.log(res)
            dispatch(setCurrentUser(res.data.user))
        })
        .catch(err => {
            console.log(err.response)
        })
    }
    useEffect(() => {
        Axios.get('https://cafetoria-backend.herokuapp.com/user/verify', {crossDomain:true,withCredentials:true})
        .then((res) => {
            console.log(res)
            dispatch(setCurrentUser(res.data.user))
        })
        .catch(err => {
            console.log(err.response)
        })
    },[])
    return (
        <Loading.Provider value={value}>
            <Sidebar/>
            <Wrapper className="mt-5">
                <Switch>
                    <Route path="/register">
                        <Register/>
                    </Route>
                    <Route path="/login">
                        <Login/>
                    </Route>
                    <Route path='/forum'>
                        <Forum/>
                    </Route>
                    <Route exact path="/">
                        <Main/>
                    </Route> 
                </Switch>
            </Wrapper>
            <CustomFooter>Blackmarble Corps. ltd</CustomFooter>
        </Loading.Provider>
    )
}
export default Bundle;