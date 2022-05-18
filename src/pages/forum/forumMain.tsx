import React from "react"
import { Container } from "react-bootstrap"
import { EyeLevel, DecoratedBlock } from "../../components/containers"
import { Routes, Route, useLocation } from "react-router-dom"
import ForumHead from "./forumHead"
import ForumBody from "./forumBody"
import Filter from "./filter"
import PostForm from "./postForm"
import styled from "styled-components"
const DynamicBlock = styled(DecoratedBlock)`
  @media (max-width: 768px) {
    background: transparent;
    padding: 0 0 0 0;
    box-shadow: 0 0 0;
  }
`
const Forum = () => {
  const { pathname } = useLocation()
  return (
    <Container>
      <EyeLevel>
        <DynamicBlock bg="white" shadow>
          <ForumHead />
          <Routes>
            <Route path={`${pathname}/new`}>
              <PostForm />
            </Route>
            <Route path={`${pathname}/main`} element={<ForumBody />} />
            <Route path={`${pathname}/filter`}>
              <Filter></Filter>
            </Route>
          </Routes>
        </DynamicBlock>
      </EyeLevel>
    </Container>
  )
}
export default Forum
