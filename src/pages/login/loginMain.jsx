import React, { useState, useEffect } from 'react';
import LoginForm from './loginForm.jsx'
import {DecoratedBlock,Wrapper,EyeLevel} from '../../components/containers.jsx';
const Login = () => {

    return (
        <EyeLevel>
        <Wrapper className="w-100 d-flex flex-row justify-content-center pb-4 px-3">
            <DecoratedBlock maxw='600'>
                <LoginForm/>
            </DecoratedBlock>
        </Wrapper>
        </EyeLevel>

    )
}





export default Login