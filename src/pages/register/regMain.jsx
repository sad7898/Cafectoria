import React, { useState, useEffect } from 'react';
import {BSWrapper,Wrapper,DecoratedBlock,EyeLevel} from '../../components/containers.jsx';
import {Switch,Route,useRouteMatch} from 'react-router-dom';
import Entry from './regEntry.jsx'
import Reg from './regForm.jsx';
import OwnerReg from './owner.jsx';

const Register = (props) => {
    let {path} = useRouteMatch();
    return (
        <EyeLevel>
            <Wrapper className="h-100 w-100 d-flex flex-column align-items-center  px-3">
                    <DecoratedBlock shadow maxw='600'>
                        <Switch>
                            <Route path={`${path}/owner`} component={OwnerReg}/>
                            <Route path={`${path}/user`}>
                                <Reg path="https://cafetoria-backend.herokuapp.com/user/signup"/>
                            </Route>
                            <Route exact path={path} component={Entry}/>
                        </Switch>
                    </DecoratedBlock>
            </Wrapper>
        </EyeLevel>
    )
}
export default Register;