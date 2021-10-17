import React from 'react';
import {Wrapper,DecoratedBlock,EyeLevel} from '../../components/containers.jsx';
import {Switch,Route,useRouteMatch} from 'react-router-dom';

import Reg from './regForm.jsx';


const Register = (props) => {
    let {path} = useRouteMatch();
    return (
        <EyeLevel>
            <Wrapper className="h-100 w-100 d-flex flex-column align-items-center  px-3">
                    <DecoratedBlock shadow maxw='600'>
                        <Switch>
                            <Route exact path={`${path}`}>
                                <Reg path="https://cafetoria-backend.herokuapp.com/user/signup"/>
                            </Route>
                        </Switch>
                    </DecoratedBlock>
            </Wrapper>
        </EyeLevel>
    )
}
export default Register;