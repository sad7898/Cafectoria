import styled from 'styled-components';
import React, { useState, useEffect,useRef } from 'react';
import {Nav,Navbar,Container} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import StyledNavLink from './navLink.jsx'
const StyledNavbar = styled(Navbar)`
    background: var(--green-color);
`
const Navigation = (props) => {
    return (
                <StyledNavbar expand="md" fixed="top">
                    <Container>
                        <Navbar.Brand>CAFETORIA</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <StyledNavLink to="/">Home</StyledNavLink>
                            <StyledNavLink>News</StyledNavLink>
                            <StyledNavLink>Contact Us</StyledNavLink>
                        </Nav>
                        <Nav className="ml-auto">
                            <StyledNavLink right="true">Sign Up</StyledNavLink>
                            <StyledNavLink>Sign in</StyledNavLink>
                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                </StyledNavbar>
    )
}


export default Navigation;