import React, { useState, useEffect } from 'react';
import {Card,Form} from 'react-bootstrap';

import styled from 'styled-components';
export const Header = styled.h1`
color : ${props => props.color};
margin : ${props => props.mg};
@media(max-width: 767px){
    font-size: ${props => props.sizeMobile ? props.sizeMobile : props.sizeDesktop} !important;
}
@media(min-width: 768px){
    font-size: ${props => props.sizeDesktop ? props.sizeDesktop : "3rem"} !important;
}
`
export const SubHeader = styled.h3`
color : ${props => props.color};

@media(max-width: 767px){
    font-size: ${props => props.sizeMobile ? props.sizeMobile : props.sizeDesktop} !important;
}
@media(min-width: 768px){
    font-size: ${props => props.sizeDesktop ? props.sizeDesktop : "1.75rem"} !important;
}
`
export const FluidIcon = styled.img`
max-width: ${props => props.maxW};
height: auto;
margin-bottom: 30px;
`
export const CustomCard = (props) => {
    return (
        <StyledCard maxH={props.maxH} minH={props.minH} color={props.titleColor} titleSize={props.titleSize}>
        <StyledCard.Img  className="img-fluid" src={props.img} alt={props.alt} />
        <StyledCard.ImgOverlay>
                <StyledCard.Title>{props.title}</StyledCard.Title>
                <StyledCard.Text>
               {props.children}
                </StyledCard.Text>
        </StyledCard.ImgOverlay>
        </StyledCard>
    )

}
const StyledCard = styled(Card)`
margin-bottom: 1rem;
max-height: ${props => props.maxH};
min-height: ${props => props.minH};
& div div div {
    font-size: ${props => props.titleSize};
    color: ${props => props.titleColor};
}
`
const DemoForm = (props) => {
    return(
    <Form.Control {...props}/>
    )
}

export const StyledInput = styled(DemoForm)`
background-color: transparent;
border-top: 0;
border-bottom: 2px solid var(--white-color);
border-left: 0;
border-right: 0;
padding-left: 0;
border-radius: 0;
transition: 0.3s;
    &:hover,&:active,&:focus {
        background-color: transparent;
        box-shadow: none;
        border-color: var(--green-color);
        color: var(--green-color);
    }
color: var(--white-color);

`
export const StyledText = styled.span`
color : ${props => props.color};
font-size: ${props => props.size};
`