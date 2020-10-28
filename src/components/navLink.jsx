import {Link} from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

 const NavLink = (props) => {
    return (
        <Link {...props} role="button">{props.children}</Link>
    )
}
const StyledNavLink = styled(NavLink)`
    display: block;
    padding: 0.5rem 1rem;
    @media(min-width: 768px){
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        border-right: ${props => props.right ? "2px solid black" : "0px"}
     
    }
    @media(max-width: 767px){
        border-top: ${props => props.right ? "2px solid black" : "0px"};
        padding-left: 0;
        padding-right: 0;
    }
    &:hover{
        text-decoration: none;
    }
`;
export default StyledNavLink;