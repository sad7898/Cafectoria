import React from "react";
import { Container } from "react-bootstrap";
import { EyeLevel, DecoratedBlock } from "../../components/containers";
import { Switch, Route, useRouteMatch } from "react-router-dom";
import ForumHead from "./forumHead";
import ForumBody from "./forumBody";
import Filter from "./filter";
import PostForm from "./postForm";
import styled from "styled-components";
const DynamicBlock = styled(DecoratedBlock)`
  @media (max-width: 768px) {
    background: transparent;
    padding: 0 0 0 0;
    box-shadow: 0 0 0;
  }
`;
const Forum = () => {
  const { path } = useRouteMatch();
  return (
    <Container>
      <EyeLevel>
        <DynamicBlock bg="white" shadow>
          <ForumHead />
          <Switch>
            <Route path={`${path}/new`}>
              <PostForm />
            </Route>
            <Route
              path={`${path}/main`}
              render={() => {
                return <ForumBody />;
              }}
            />
            <Route path={`${path}/filter`}>
              <Filter></Filter>
            </Route>
          </Switch>
        </DynamicBlock>
      </EyeLevel>
    </Container>
  );
};
export default Forum;
