import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Wrapper} from './containers.jsx';
import {Header} from './utilities.jsx'
export const Footer = styled.footer`
   position: fixed;
   width:100%;
   margin-top: auto;
   bottom: 0;
`
export const CustomFooter = (props) => {
    return (
        <Footer>
            <Wrapper className="w-100 h-100 d-flex flex-row justify-content-center px-2 py-2" bg="var(--black-color)">
                <Header color="var(--white-color)" className="text-center" sizeDesktop="1.25rem">
                    {props.children}
                </Header>
            </Wrapper>
        </Footer>
    )
}
