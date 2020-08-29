import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Container} from 'react-bootstrap'
import {CSSTransition} from 'react-transition-group';
import wallpaper from '../images/mainWall.jpg'
import {Wrapper} from './containers.jsx'

const Header = styled.h1`
color : var(--white-color);
@media(max-width: 767px){
    font-size: 2rem;
}
@media(min-width: 768px){
    font-size: 3rem;
}
`
const CatchPhrase = styled.h3`
color : var(--white-color);
@media(max-width: 767px){
    font-size: 1rem;
}
@media(min-width: 768px){
    font-size: 1.5rem;
}

`
const Main = (props) => {
    return (
       <Wrapper className="d-flex flex-row justify-content-center" minh="320"  bg={`url(${wallpaper})`} fluid>
           <CSSTransition>
            <div className="w-100 d-flex flex-column justify-content-center align-items-center">
                <Header className="someClass">
                    CAFETORIA
                </Header>
                <hr></hr>
                <CatchPhrase>
                    Ease in Order
                </CatchPhrase>
            </div>
           </CSSTransition>
       </Wrapper>
    )
}
export default Main