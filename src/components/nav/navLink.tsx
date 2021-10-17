import { Link } from "react-router-dom";
import React from "react";
import styled from "styled-components";
interface NavLinkProps {
  to: string;
  onClick?: () => void;
}
const NavLink: React.FunctionComponent<NavLinkProps> = (props) => {
  return (
    <Link {...props} role="button">
      {props.children}
    </Link>
  );
};
const StyledNavLink = styled(NavLink)<{ size?: string }>`
    display: block;
    padding: 0.5rem 1rem;
    font-size: ${(props) => (props.size ? props.size : "1.25rem")}
    &:hover{
        text-decoration-line: none;
    }
`;
export default StyledNavLink;
