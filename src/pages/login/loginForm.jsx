import React, { useState, useEffect,useContext } from 'react';
import {Form} from 'react-bootstrap';
import {StyledInput,StyledText,Header} from '../../components/utilities.jsx'
import {Wrapper} from '../../components/containers.jsx';
import {StyledButton} from '../../components/button.jsx';
import {useHistory} from 'react-router-dom';
import {setCurrentUser} from '../../store/actions/userActions.js';
import {Loading} from '../../pages/Bundle.jsx';
import {useDispatch,useSelector} from 'react-redux';
import Axios from 'axios';
const LoginForm = (props) => {
    let auth = useSelector(state => state.auth)
    let dispatch =useDispatch();
    let {load,setLoad} = useContext(Loading);
    let [user,setUser] = useState('')
    let [password,setPassword] = useState('')
    let [error,setError] = useState('');
    let history = useHistory()
    const onChangeUser = (e) => {
        setUser(e.target.value)
    } 
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    async function handleLogin() {
        setLoad(true);
        await Axios.post('https://cafetoria-backend.herokuapp.com/user/login',{'user': user,'password':password},{crossDomain:true,withCredentials:true})
        .then((res) => {
            console.log(res)
            dispatch(setCurrentUser(user))
            history.push('/')
        })
        .catch(err => {
            console.log(err.response.data)
            setError(err.response.data[Object.keys(err.response.data)[0]])
        })
        setLoad(false);

    }
    return (
        <Wrapper maxw='600' bg='var(--grey-color)'>
        <Wrapper mg="0 0 20px 0">
            <Header color="var(--white-color)">
                Sign In
            </Header>
        </Wrapper>
        <Form>
            <Form.Group controlId="username">
                <Form.Label>
                    <StyledText color="var(--white-color)">Username</StyledText>
                </Form.Label>
                    <StyledInput type="text" placeholder="Username" name="user" value={user} onChange={onChangeUser} required />
            </Form.Group>
            <Form.Group controlId="password">
                <Form.Label>
                    <StyledText color="var(--white-color)">Password</StyledText>
                </Form.Label>
                    <StyledInput type="password" placeholder="Password" name="password" value={password} onChange={onChangePassword} required />
            </Form.Group>
            <div className="mt-2 mb-2">
                <StyledText color='red'>{error}</StyledText>
            </div>
            <StyledButton bg="var(--green-color)" onClick={handleLogin}>
                Login
            </StyledButton>
        </Form>
    </Wrapper>
    )
}
export default LoginForm;