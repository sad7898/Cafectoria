import styled from 'styled-components';
import React, { useState, useEffect,useRef } from 'react';
import {Nav,Navbar,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import StyledNavLink from './navLink.jsx'
import Back from '../images/back.svg';
const StyledNavbar = styled(Navbar)`
    background: var(--green-color);
`
const BackIcon = styled.img`
width: 25px;
height: 25px;
&:hover{
    color: white;
}
`
const Navigation = (props) => {
    return (
                <StyledNavbar expand="md" fixed="top">
                    <Container>
                        <Navbar.Brand>
            
                            <BackIcon
                            className="d-inline-block align-top mr-2"
                            src={Back}/>
                            CAFETORIA
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <StyledNavLink to="/">Home</StyledNavLink>
                            <StyledNavLink to="/">News</StyledNavLink>
                            <StyledNavLink to="/">Contact Us</StyledNavLink>
                        </Nav>
                        <Nav className="ml-auto">
                            <StyledNavLink right="true" to="/register">Sign Up</StyledNavLink>
                            <StyledNavLink to="/login">Sign in</StyledNavLink>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </StyledNavbar>
    )
}


export default Navigation;