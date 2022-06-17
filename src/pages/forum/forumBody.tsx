import { Wrapper } from "../../components/containers"
import { Outlet } from "react-router-dom"

const ForumBody = () => {
  return (
    <Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
      <Outlet />
    </Wrapper>
  )
}
export default ForumBody
