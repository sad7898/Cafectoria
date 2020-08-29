import React, { useState, useEffect } from 'react';
import Navigation from '../components/nav.jsx';
import Main from '../components/landingMain.jsx'
import {Route,Switch,Link} from 'react-router-dom';

const Landing = (props) => {
    return (
      
        <Switch>
            <Route path="/">
                <Main/>
            </Route>
        </Switch>
    )
}
export default Landing;