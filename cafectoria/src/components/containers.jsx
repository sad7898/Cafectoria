import {Container} from 'react-bootstrap';
import styled from 'styled-components';
export const Wrapper = styled(Container)`
    width: 100%;
    height: auto;
    min-height: ${props => props.minh}px;
    max-height: ${props => props.maxh}px;
    background: ${props => props.bg};
    background-size: cover;
    background-position: center;
`
