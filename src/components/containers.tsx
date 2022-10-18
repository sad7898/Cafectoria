import { Container } from "react-bootstrap"
import styled from "styled-components"
interface ContainerProps {
  minh?: string
  maxh?: string
  maxw?: string
  minw?: string
  bg?: string
  mg?: string
  pd?: string
}
interface BootStrapContainerProps extends ContainerProps {
  border?: string
  rborder?: string
  bordertop?: string
  borderbot?: string
  borderleft?: string
}
interface WrapperProps extends ContainerProps {
  width?: string
  border?: string
  rborder?: string
  shadow?: string
}
interface DecoratedBlockProps extends ContainerProps {
  width?: string
  border?: string
  rborder?: string
  shadow?: boolean
}
export const BSWrapper = styled(Container)<BootStrapContainerProps>`
    width: 100%;
    height: auto;
    min-height: ${(props) => props.minh}px;
    max-height: ${(props) => props.maxh}px;
    max-width: ${(props) => props.maxw}px;
    min-wdith ${(props) => props.minw}px;
    background: ${(props) => props.bg};
    background-position: center;
    background-size: cover;
    margin: ${(props) => props.mg};
    padding: ${(props) => props.pd};
    border : ${(props) => props.border};
    border-radius: ${(props) => props.rborder};
    border-top : ${(props) => props.bordertop};
    border-bottom : ${(props) => props.borderbot};
    border-left : ${(props) => props.borderleft};
`
export const Wrapper = styled.div<WrapperProps>`
    width: ${(props) => (props.width ? props.width : "100%")};
    height: auto;
    min-height: ${(props) => props.minh}px;
    max-height: ${(props) => props.maxh}px;
    max-width: ${(props) => props.maxw}px;
    min-width ${(props) => props.minw}px;
    background: ${(props) => props.bg};
    margin: ${(props) => props.mg};
    padding: ${(props) => props.pd};
    border : ${(props) => props.border};
    border-radius: ${(props) => props.rborder};
    box-shadow: ${(props) => props.shadow};
`
export const DecoratedBlock = styled.div<DecoratedBlockProps>`
    width: 100%;
    height: auto;
    min-height: ${(props) => props.minh}px;
    max-height: ${(props) => props.maxh}px;
    max-width: ${(props) => props.maxw}px;
    min-wdith ${(props) => props.minw}px;
    background: ${(props) => (props.bg ? props.bg : "var(--grey-color)")};
    border-radius: 10px;
    box-shadow: ${(props) => (props.shadow ? "10px 10px 5px rgba(71,71,71,0.5)" : "none")};
    padding: ${(props) => (props.pd ? props.pd : "1.5rem 1.5rem 1.5rem 1.5rem")};   
`

export const EyeLevel = styled.div`
  width: 100%;
  height: 100%;
  @media (min-width: 0px) {
    padding-top: 15%;
    padding-bottom: 15%;
  }
  @media (min-width: 768px) {
    padding-top: 9%;
    padding-bottom: 9%;
  }
  @media (min-width: 996px) {
    padding-top: 6%;
    padding-bottom: 6%;
  }
`

export const DynamicBlock = styled(DecoratedBlock)`
  @media (max-width: 768px) {
    background: transparent;
    padding: 0 0 0 0;
    box-shadow: 0 0 0;
  }
`
