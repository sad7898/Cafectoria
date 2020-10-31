import styled from 'styled-components';
import React, { useState, useEffect,useContext } from 'react';
import {Spinner,Container} from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import StyledNavLink from './navLink.jsx'
import {data} from './navData.jsx'
import Exit from '../../images/exit.svg';
import Toggler from '../../images/hamburger.svg'
import {CSSTransition} from 'react-transition-group'
import {useSelector,useDispatch} from 'react-redux';
import {LogOut} from '../../store/actions/userActions.js';
import {Loading} from '../../pages/Bundle.jsx';
import Axios from 'axios';

export const Sidebar = (props) => {
    let {load,setLoad} = useContext(Loading)
    let history = useHistory()
    let token = useSelector(state => state.auth)
    let dispatch = useDispatch();
    let [inProp, setInProp] = useState(false);
    async function handleLogOut(){
      setLoad(true)
      setInProp(false)
      await Axios.post('https://cafetoria-backend.herokuapp.com/user/signout',{},{header:{crossDomain:true},withCredentials:true})
      .then((res) => {
        console.log('Succeed')
        history.push('/')
        dispatch(LogOut())
      })
      .catch((err) => {
        dispatch(LogOut())
        history.push('/')
      })
      setLoad(false)
    }
    const listItems = data.map((item, index) => (
      <li key={index}>
        <StyledNavLink  to={item.path} onClick={() => setInProp(false)}>
          {item.name}
        </StyledNavLink>
      </li>));
    return (
      <>
        <div className="sidebar-toggler d-flex flex-row justify-content-center">
          <img src={Toggler} onClick={() => setInProp(true)} />
          <h1 className="d-flex flex-row justify-content-center w-100" size="1.5rem">
          <Spinner animation='border' variant='dark' className="mr-2" style={{display: load ? 'block' : 'none'}}/>
            CAFETORIA
          </h1>
        </div>
        <CSSTransition in={inProp} timeout={300} classNames='fade'>
          <div className="sidebar">
            <nav className="w-100">
              <div>
                <img src={Exit} onClick={() => setInProp(false)}></img>
              </div>
              <ul className="sidebar-menu d-flex flex-column justify-content-between h-100 mt-5">
                <div>
                  {token.isLogged ? 
                  <>
                  <li key="welc"><StyledNavLink to="/dashboard" className="styled-link" style={{fontSize: '16px'}}>
                    Welcome {token.user}
                  </StyledNavLink>
                  </li>

                  </>
                  : ''}
                  {listItems}
                </div>
                <div className="w-100">
                  <li>
                      { token.isLogged ?
                    <StyledNavLink to="/" className="styled-link" onClick={handleLogOut}>
                       Sign Out
                    </StyledNavLink> : (<>
                    <StyledNavLink to="/login" className="styled-link" onClick={() => setInProp(false)}>
                        Sign In
                    </StyledNavLink>
                    <StyledNavLink to="/register" className="styled-link" onClick={() => setInProp(false)}>
                        Sign Up
                    </StyledNavLink></>)
                    }
                  </li>
                </div>
              </ul>
            </nav>
          </div>
        </CSSTransition>
        <span className="backdrop" style={{ display: inProp ? 'flex' : 'none' }} />
      </>
    )
  }
