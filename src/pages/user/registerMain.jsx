import React, { useState, useEffect } from 'react';
import {BSWrapper,Wrapper} from '../../components/containers.jsx';
import {Switch,Route,useRouteMatch} from 'react-router-dom';
import Entry from './regisEntry.jsx'
import UserReg from './user.jsx';
import OwnerReg from './owner.jsx';
const Register = (props) => {
    let {path} = useRouteMatch();
    return (
        <Wrapper className="h-100 w-auto d-flex flex-column pt-5 pb-4 px-3">
            <BSWrapper className="py-4 px-4" border="5px solid var(--gray-color)" rborder="5px">
                <Switch>
                    <Route path={`${path}/owner`}>
                        <OwnerReg></OwnerReg>
                    </Route>
                    <Route path={`${path}/user`}>
                        <UserReg/>
                    </Route>
                    <Route exact path={path}>
                        <Entry/>
                    </Route>
                </Switch>

            </BSWrapper>
        </Wrapper>
    )
}
export default Register;