import React, { useState, useEffect } from 'react';
import {Container,Breadcrumb} from 'react-bootstrap'
import {Wrapper,EyeLevel,DecoratedBlock} from '../../components/containers.jsx'
import {Switch,Route,useRouteMatch} from 'react-router-dom';
import PrivateRoute from '../../components/privateRoute.jsx';
import ForumHead from './forumHead.jsx';
import ForumBody from './forumBody.jsx';
import Post from './post.jsx';
import PostForm from './postForm.jsx';
import styled from 'styled-components';
const DynamicBlock = styled(DecoratedBlock)`
@media(max-width: 768px){
    background: transparent;
    padding: 0 0 0 0;
    box-shadow: 0 0 0;
}
`
const Forum = () => {
    let {path,url} = useRouteMatch()
    return (
        <Container>
            <EyeLevel>
            <DynamicBlock bg="white" shadow>
                <ForumHead/>
                <Switch>
                    <PrivateRoute path={`${path}/new`}>
                        <PostForm/>
                    </PrivateRoute>
                    <Route path={`${path}/bugs`}  render={() => {
                        return(
                            <ForumBody path="https://cafetoria-backend.herokuapp.com/api/post"/>
                        )
                    }}/> 
                    <Route path={`${path}/main`} render={() => {
                        
                        return(
                            <ForumBody path="https://cafetoria-backend.herokuapp.com/api/post"/>
                        )
                    }}/>
                </Switch>
                </DynamicBlock>
            </EyeLevel>
        </Container>
    )
}
export default Forum;