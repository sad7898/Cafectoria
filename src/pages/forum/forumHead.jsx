import React from 'react';

import {Wrapper} from '../../components/containers.jsx'
import {useHistory} from 'react-router-dom';
import {Header} from '../../components/utilities.jsx';
import StyledNavLink from '../../components/nav/navLink.jsx';
import styled from 'styled-components';
import AddIcon from '../../images/add.png';
const StyledWrapper = styled(Wrapper)`
    border-right: 2px solid black;
`
const ForumHead = (props) => {
    let history  = useHistory()
    return (
    <Wrapper>
        <Header color="var(--black-color)" className="mb-4">
            Forum
        </Header>
        <Wrapper bg="#dedede" rborder="10px" pd=".3rem .25rem .3rem .25rem" className="d-flex flex-row justify-content-between">
            <Wrapper className="d-flex flex-row">
                <StyledWrapper width='auto' >
                    <StyledNavLink to='/forum/main'>Main</StyledNavLink>
                </StyledWrapper>
                <Wrapper width='auto'>
                    <StyledNavLink to='/forum/bugs'>Bug Reports</StyledNavLink>
                </Wrapper>
            </Wrapper>
            <Wrapper className="d-flex flex-column justify-content-center px-2">
                <img src={AddIcon} onClick={() => history.push('/forum/new')}/>
            </Wrapper>
        </Wrapper>
    </Wrapper>
    )
}
export default ForumHead;