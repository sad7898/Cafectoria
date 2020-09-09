import {Container} from 'react-bootstrap';
import styled from 'styled-components';
const selectBorder = (border) => {
    console.log(border)
    switch(border){
        case "left":
            return "-left"
        case "right":
            return "-right"
        case 'top':
            return '-top'
        case 'bottom':
            return '-bottom'
        default:
            return ''
    }
}
export const BSWrapper = styled(Container)`
    width: 100%;
    height: auto;
    min-height: ${props => props.minh}px;
    max-height: ${props => props.maxh}px;
    background: ${props => props.bg};
    background-size: cover;
    background-position: center;
    margin: ${props => props.mg};
    padding: ${props => props.pd};
    border : ${props => props.border};
    border-radius: ${props => props.rborder};
    border-top : ${props => props.bordertop};
    border-bottom : ${props => props.borderbot};
    border-left : ${props => props.borderleft};
`
export const Wrapper = styled.div`
    width: 100%;
    height: auto;
    min-height: ${props => props.minh}px;
    max-height: ${props => props.maxh}px;
    background: ${props => props.bg};
    margin: ${props => props.mg};
    padding: ${props => props.pd};
    background-size: cover;
    background-position: center;
    border : ${props => props.border};
    border-radius: ${props => props.rborder};
    border-top : ${props => props.bordertop};
    border-bottom : ${props => props.borderbot};
    border-left : ${props => props.borderleft};
`
export const CenteredDiv = styled.div`
    transform: translate(-50%, -50%);
`
