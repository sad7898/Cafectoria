import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Container,Button} from 'react-bootstrap'
import {CSSTransition} from 'react-transition-group';
import {useHistory} from 'react-router-dom';
import wallpaper from '../../images/mainWall.jpg'
import {BSWrapper,Wrapper} from '../../components/containers.jsx'
import {StyledButton} from '../../components/button.jsx';
import IntroText from './landingIntro.jsx'
import {Header,SubHeader} from '../../components/utilities.jsx';
const Main = (props) => {
    let [inProp,setInProp] = useState(false);
    let history = useHistory();
    useEffect(()=> {
        setInProp(true)
    },[])
    return (
        <>
       <BSWrapper className="d-flex flex-row justify-content-center" minh="320" mg="0 0 -10px 0" bg={`url(${wallpaper})`} fluid>
           <CSSTransition in={inProp} timeout={500} classNames="fade-down">
            <Wrapper className="w-100 d-flex flex-column align-items-center justify-content-center">
                <Header color="var(--white-color)">
                    CAFETERIA
                </Header>
                <hr></hr>
                <SubHeader color="var(--white-color)">
                    Some Cool Phrase
                </SubHeader>
            </Wrapper>
           </CSSTransition>
       </BSWrapper>
       <BSWrapper>
        <div className="d-flex flex-row justify-content-between w-100">
            <StyledButton size="lg">Explore more</StyledButton>
            <StyledButton size="lg" onClick={() => (history.push('/register'))}>Join Us</StyledButton>
            <StyledButton size="lg">Some button</StyledButton>
        </div>
        <IntroText/>
       </BSWrapper>
       </>

    )
}
export default Main