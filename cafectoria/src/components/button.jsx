import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {Button} from 'react-bootstrap';
export const StyledButton = styled(Button)`
background-color: ${props => props.outline ? "transparent" : "var(--white-color)"};
border-color: ${props => props.outline ? "var(--green-color)" : "var(--white-color)"};
border-radius: 90px;
color: var(--grey-color);
transition: 0.2s;
&:hover{
    background-color: var(--green-color) !important;
    color: var(--grey-color);
    border-color: var(--green-color) !important;
}
&:active{
    background-color: var(--green-color) !important
    color: var(--white-color) !important;
    border-color: var(--green-color) !important;
    box-shadow: 0 0 0 0.2rem rgba(141, 235, 213,0.5) !important;
}
&:focus{
    box-shadow: 0 0 0 0.2rem rgba(141, 235, 213,0.5);
    background-color: var(--green-color);
    color: var(--grey-color);
    border-color: var(--white-color);
}
@media(min-width: 768px){
    padding: .5rem 1rem;
    font-size: 1.25rem;
    line-height: 1.5;
}
@media(max-width: 767px){
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
}
`
export const GreenButton = styled(StyledButton)`
background-color: var(--green-color);
border-color: var(--white-color);
`
