import { useCallback, useEffect, useLayoutEffect, useRef } from "react"
import Main from "./landing/landingMain"
import Register from "./register/regMain"
import Login from "./login/loginMain"
import Forum from "./forum/forumMain"
import { Wrapper } from "../components/containers"
import { CustomFooter } from "../components/footer"
import { useDispatch, useSelector } from "react-redux"
import { AuthPayload, AuthStatus, setCurrentUser } from "../store/actions/userActions"

import { client } from "../axiosClient"
import { Routes, Route } from "react-router-dom"
import { Sidebar } from "../components/nav/nav"
import Filter from "./forum/filter"
import ForumBody from "./forum/forumBody"
import Post from "./post/post"
import ForumBrowser from "./forum/forumBrowser"
import { CreatePost } from "./post/createPost"
import { UpdatePost } from "./post/updatePost"
import Dashboard from "./user/dashboard"
import { getUser } from "../components/guards/withAuthGuard"
import { initialAuthState } from "../store/reducers/authReducer"
import { RootState } from "../store/store"

const Bundle = () => {
  const dispatch = useDispatch()
  const auth = useSelector((state: RootState) => state.auth)
  useEffect(() => {
    if (auth.status === AuthStatus.PENDING) {
      const user = getUser()
      dispatch(setCurrentUser(user ? { ...user, status: AuthStatus.AUTH } : initialAuthState))
    }
  }, [auth.status, dispatch])
  return (
    <>
      <Sidebar />
      <Wrapper className="mt-5">
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/user/dashboard" element={<Dashboard />} />
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
