import React, { useState, useEffect,useContext } from 'react';
import {Header,StyledInput} from '../../components/utilities.jsx';
import {Wrapper} from '../../components/containers.jsx';
import {StyledButton} from '../../components/button.jsx';
import {Form} from 'react-bootstrap';
import {StyledText} from '../../components/utilities.jsx';
import {errorObj} from './error.jsx';
import Axios from 'axios';
import {useHistory} from 'react-router-dom';
import {Loading} from '../../pages/Bundle.jsx';
const Reg = (props) => {
    let {load,setLoad} = useContext(Loading);
    async function handleSubmit() {
        if (!(userError && pwError)){
            setLoad(true);
            await Axios.post(props.path,{'user': user,'password':password,'email':email,'secret': props.secret})
            .then((res) => {
                console.log('succeeded')
                history.push('/')
            })
            .catch(err => {
                console.log(err.response.data)
                setUserError(err.response.data[Object.keys(err.response.data)[0]])
            })
            setLoad(false);
        }
    }
    const onChangeUser = (e) => {
        let re = /^[A-Z][a-z0-9_]+$/
        if (!re.test(e.target.value)){
            setUserError(errorObj.invalidInput.user)
        }
        else if (e.target.value.length < 6 || e.target.value.length > 12){
            setUserError(errorObj.invalidLength.user)
        }
        else {
            setUserError('');
        }
        setUser(e.target.value);
    }
    
    const onChangePassword = (e) => {
        let re = /^[a-z0-9_]+$/
        if (!re.test(e.target.value)){
            setPwError(errorObj.invalidInput.password)
        }
        else if (e.target.value.length < 6 || e.target.value.length > 12){
            setPwError(errorObj.invalidLength.password)
        }
        else {setPwError('')}
        setPassword(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    let history = useHistory();
    let [user,setUser] = useState('');
    let [password,setPassword] = useState('');
    let [email,setEmail] = useState('');
    let [userError,setUserError] = useState('');
    let [pwError,setPwError] = useState('');
    return (
        <Wrapper>
            <Wrapper mg="0 0 20px 0">
                <Header color="var(--white-color)">
                    Sign Up
                </Header>
            </Wrapper>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>
                        <StyledText color="var(--white-color)">Username</StyledText>
                    </Form.Label>
                        <StyledInput type="text" placeholder="Username" name="user" value={user} onChange={onChangeUser} required />
                        <Form.Text className="text-muted">
                            Username must contain atleast 6 characters and not contain special character and not exceed 12.
                        </Form.Text>
                        <StyledText size='80%' color='red'>
                            {userError}
                        </StyledText>
                </Form.Group>
                <Form.Group controlId="password">
                    <Form.Label>
                        <StyledText color="var(--white-color)">Password</StyledText>
                    </Form.Label>
                        <StyledInput type="password" placeholder="Password" name="password" value={password} onChange={onChangePassword} required />
                        <Form.Text className="text-muted">
                            Password must contain atleast 6 characters and not exceed 12.
                        </Form.Text>
                        <StyledText size='80%' color='red'>
                            {pwError}
                        </StyledText>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>
                        <StyledText color="var(--white-color)">Email</StyledText>
                    </Form.Label>
                        <StyledInput type="email" placeholder="someone@domain.com" name="email" value={email} onChange={onChangeEmail} required />
                        <Form.Text className="text-muted">
                            Enter valid email
                        </Form.Text>
                </Form.Group>
                {props.children}
                <StyledButton bg="var(--green-color)" onClick={handleSubmit}>Submit</StyledButton>
            </Form>
        </Wrapper>
    )
}
export default Reg;