import React, { useState, useEffect } from 'react';
import {Header,StyledInput} from '../../components/utilities.jsx';
import {Wrapper} from '../../components/containers.jsx';
import {GreenButton} from '../../components/button.jsx';
import {Form} from 'react-bootstrap';

const OwnerReg = (props) => {
    const onChangeUser = (e) => {
        setUser(e.target.value);
    }
    
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangeSecret = (e) => {
        setSecret(e.target.value);
    }
    let [secret,setSecret] = useState('');
    let [user,setUser] = useState('');
    let [password,setPassword] = useState('');
    let [email,setEmail] = useState('');
    let [error,setError] = useState();
    return (
        <Wrapper>
            <Wrapper mg="0 0 20px 0">
                <Header>
                    Sign Up
                </Header>
            </Wrapper>
            <Form>
                <Form.Group controlId="username">
                    <Form.Label>
                        Username
                    </Form.Label>
                        <StyledInput type="text" placeholder="Username" name="user" value={user} onChange={onChangeUser} required />
                        <Form.Text className="text-muted">
                            Username must contain atleast 8 characters and not contain special character.
                        </Form.Text>
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>
                        Password
                    </Form.Label>
                        <StyledInput type="password" placeholder="Password" name="password" value={password} onChange={onChangePassword} required />
                        <Form.Text className="text-muted">
                            Password must contain atleast 8 characters.
                        </Form.Text>
                </Form.Group>
                <Form.Group controlId="username">
                    <Form.Label>
                        Email
                    </Form.Label>
                        <StyledInput type="email" placeholder="someone@domain.com" name="email" value={email} onChange={onChangeEmail} required />
                        <Form.Text className="text-muted">
                            Password must contain atleast 8 characters.
                        </Form.Text>
                </Form.Group>
                <Form.Group controlId="secret">
                    <Form.Label>
                        Secret
                    </Form.Label>
                        <StyledInput type="password" placeholder="Enter 6 digits secret" name="secret" value={secret} onChange={onChangeSecret} required />
                        <Form.Text className="text-muted">
                            Contact admin for secret.
                        </Form.Text>
                </Form.Group>
                <GreenButton>Submit</GreenButton>
                
            </Form>
        </Wrapper>
    )
}
export default OwnerReg;