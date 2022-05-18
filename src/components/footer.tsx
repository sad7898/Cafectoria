import React from "react"
import styled from "styled-components"
import { Wrapper } from "./containers"
import { Header } from "./utilities"
export const Footer = styled.footer`
  position: fixed;
  width: 100%;
  margin-top: auto;
  bottom: 0;
`
interface FooterProps {
  children?: React.ReactNode
}
export const CustomFooter: React.FC<FooterProps> = ({ children }) => {
  return (
    <Footer>
      <Wrapper className="w-100 h-100 d-flex flex-row justify-content-center px-2 py-2" bg="var(--black-color)">
        <Header color="var(--white-color)" className="text-center" sizeDesktop="1.25rem">
          {children}
        </Header>
      </Wrapper>
    </Footer>
  )
}
