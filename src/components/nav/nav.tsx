import React, { useState } from "react"
import { Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import StyledNavLink from "./navLink"
import { data } from "./navData"
import Exit from "../../images/exit.svg"
import Toggler from "../../images/hamburger.svg"
import { CSSTransition } from "react-transition-group"
import { useSelector, useDispatch } from "react-redux"
import { LogOut } from "../../store/actions/userActions"
import Axios from "axios"
import useLoading from "../../contexts/loadingContext"
import { RootState } from "../../store/store"

export const Sidebar = () => {
  const { isLoading, setLoading } = useLoading()
  const navigate = useNavigate()
  const token = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch()
  const [inProp, setInProp] = useState(false)
  async function handleLogOut() {
    setLoading(true)
    setInProp(false)
    await Axios.post("https://cafetoria-backend.herokuapp.com/user/signout", {}, { headers: { crossDomain: true }, withCredentials: true })
      .then((res) => {
        navigate("/")
        dispatch(LogOut())
      })
      .catch((err) => {
        dispatch(LogOut())
        navigate("/")
      })
    setLoading(false)
  }
  const listItems = data.map((item, index) => (
    <li key={index}>
      <StyledNavLink to={item.path} onClick={() => setInProp(false)}>
        {item.name}
      </StyledNavLink>
    </li>
  ))
  return (
    <>
      <div className="sidebar-toggler d-flex flex-row justify-content-center">
        <img src={Toggler} onClick={() => setInProp(true)} alt="Toggler" />
        <h1 className="d-flex flex-row justify-content-center w-100" style={{ fontSize: "1.5rem" }}>
          <Spinner animation="border" variant="dark" className="mr-2" style={{ display: isLoading ? "block" : "none" }} />
          CAFETORIA
        </h1>
      </div>
      <CSSTransition in={inProp} timeout={300} classNames="fade">
        <div className="sidebar">
          <nav className="w-100">
            <div>
              <img src={Exit} onClick={() => setInProp(false)} alt="Exit"></img>
            </div>
            <ul className="sidebar-menu d-flex flex-column justify-content-between mt-3">
              <div>
                {token.isLogged ? (
                  <>
                    <li>
                      <StyledNavLink to="/dashboard" size="16px">
                        Welcome {token.user}
                      </StyledNavLink>
                    </li>
                  </>
                ) : (
                  ""
                )}
                {listItems}
              </div>
              <div className="w-100">
                <li>
                  {token.isLogged ? (
                    <StyledNavLink to="/" onClick={handleLogOut}>
                      Sign Out
                    </StyledNavLink>
                  ) : (
                    <>
                      <StyledNavLink to="/login" onClick={() => setInProp(false)}>
                        Sign In
                      </StyledNavLink>
                      <StyledNavLink to="/register" onClick={() => setInProp(false)}>
                        Sign Up
                      </StyledNavLink>
                    </>
                  )}
                </li>
              </div>
            </ul>
          </nav>
        </div>
      </CSSTransition>
      <span className="backdrop" style={{ display: inProp ? "flex" : "none" }} />
    </>
  )
}
