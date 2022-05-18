import React, { useEffect, useCallback } from "react"
import Main from "./landing/landingMain"
import Register from "./register/regMain"
import Login from "./login/loginMain"
import Forum from "./forum/forumMain"
import { Route, Routes } from "react-router-dom"
import { Wrapper } from "../components/containers"
import { Sidebar } from "../components/nav/nav"
import { CustomFooter } from "../components/footer"
import { useDispatch } from "react-redux"
import { setCurrentUser } from "../store/actions/userActions"

import Axios from "axios"

const Bundle = () => {
  const dispatch = useDispatch()
  const verify = useCallback(() => {
    Axios.get("https://cafetoria-backend.herokuapp.com/user/verify", {
      withCredentials: true,
    }).then((res) => {
      dispatch(setCurrentUser(res.data.user))
    })
  }, [dispatch])
  useEffect(() => {
    verify()
  }, [verify])
  return (
    <>
      <Sidebar />
      <Wrapper className="mt-5">
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/forum" element={<Forum />}></Route>
          <Route path="/" element={<Main />}></Route>
        </Routes>
      </Wrapper>
      <CustomFooter>Blackmarble Corps. ltd</CustomFooter>
    </>
  )
}
export default Bundle
