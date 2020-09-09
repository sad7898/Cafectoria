import React, { useState, useEffect } from 'react';
import {BSWrapper,Wrapper} from '../../components/containers.jsx';
import {StyledButton} from '../../components/button.jsx';
import {useHistory,useRouteMatch} from 'react-router-dom';
import {Header} from '../../components/utilities.jsx'
import styled from 'styled-components';
const Entry = (props) => {
    let history = useHistory()
    let {path} = useRouteMatch();
    return (
        <Wrapper>
            <Header className="text-center py-2" sizeDesktop="1.5rem">
                Select an option
            </Header>
            <Wrapper className="d-flex flex-column">
                <StyledButton outline className="mb-2" onClick={() => (history.push(`${path}/user`))}>
                    I want to access Cafeteria.
                </StyledButton>
                <StyledButton outline className="mb-2" onClick={() => (history.push(`${path}/owner`))}>
                    I want to own a Cafeteria.
                </StyledButton>
            </Wrapper>
        </Wrapper>
    )
}
export default Entry;