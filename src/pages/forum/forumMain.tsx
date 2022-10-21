import { Container } from "react-bootstrap"
import { DynamicBlock, EyeLevel } from "../../components/containers"
import { Outlet } from "react-router-dom"
import ForumHead from "./forumHead"
const Forum = () => {
  return (
    <Container>
      <EyeLevel>
        <DynamicBlock bg="white" shadow>
          <ForumHead />
          <Outlet />
        </DynamicBlock>
      </EyeLevel>
    </Container>
  )
}
export default Forum
