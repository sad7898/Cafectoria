import { Link } from "react-router-dom"
import React from "react"
import styled from "styled-components"
interface NavLinkProps {
  to: string
  onClick?: () => void
  children?: React.ReactNode
}
const BaseLink: React.FC<NavLinkProps> = ({ children, ...rest }) => {
  return (
    <Link {...rest} role="button">
      {children}
    </Link>
  )
}
export const ResponsiveLink = styled(BaseLink)<{ size?: string }>`
  font-size: ${(props) => props.size ?? "1rem"};
`
const StyledNavLink = styled(BaseLink)<{ size?: string }>`
  display: block;
  padding: 0.5rem 1rem;
  font-size: ${(props) => (props.size ? props.size : "1.25rem")};
  &:hover {
    text-decoration-line: none;
  }
`
export default StyledNavLink
