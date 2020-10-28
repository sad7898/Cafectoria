import React, { useState, useEffect } from 'react';
import Navigation from '../components/nav.jsx';
import Main from './landing/landingMain.jsx';
import Register from './user/registerMain.jsx';
import {Route,Switch,Link} from 'react-router-dom';
import {Wrapper} from '../components/containers.jsx';


const Bundle = (props) => {
    return (
        
            <Switch>
                <Route path="/register">
                    <Register></Register>
                </Route>
                <Route path="/">
                    <Main/>
                </Route>
                
            </Switch>
        
    )
}
export default Bundle;