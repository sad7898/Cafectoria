import { useEffect, useCallback } from "react"
import Main from "./landing/landingMain"
import Register from "./register/regMain"
import Login from "./login/loginMain"
import Forum from "./forum/forumMain"
import { Wrapper } from "../components/containers"
import { CustomFooter } from "../components/footer"
import { useDispatch } from "react-redux"
import { AuthPayload, AuthStatus, setCurrentUser } from "../store/actions/userActions"

import { client } from "../axiosClient"
import { Routes, Route } from "react-router-dom"
import { Sidebar } from "../components/nav/nav"
import Filter from "./forum/filter"
import ForumBody from "./forum/forumBody"
import Post from "./post/post"
import { ForumBrowser } from "./forum/forumBrowser"
import { CreatePost } from "./post/createPost"
import { UpdatePost } from "./post/updatePost"
import { setLoading } from "../store/actions/loadActions"
import { initialAuthState } from "../store/reducers/authReducer"

const Bundle = () => {
  const dispatch = useDispatch()
  const getUser = useCallback(async () => {
    try {
      dispatch(setCurrentUser({ ...initialAuthState, status: AuthStatus.PENDING }))
      const res = await client.get<AuthPayload>("/user")
      dispatch(setCurrentUser({ ...res.data, status: AuthStatus.AUTH }))
    } catch (err) {
      console.log(err)
    }
  }, [dispatch])
  getUser()
  return (
    <>
      <Sidebar />
      <Wrapper className="mt-5">
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forum" element={<Forum />}>
            <Route path={`new`} element={<CreatePost />}></Route>
            <Route path={`main`} element={<ForumBody />}>
              <Route path={""} element={<ForumBrowser />}></Route>
              <Route path={`:id`} element={<Post />}></Route>
              <Route path={":id/edit"} element={<UpdatePost />}></Route>
            </Route>
            <Route path={`filter`} element={<Filter />}></Route>
          </Route>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </Wrapper>
      <CustomFooter>Blackmarble Corps. ltd</CustomFooter>
    </>
  )
}
export default Bundle
