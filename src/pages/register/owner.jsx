import React, { useState, useEffect } from 'react';
import {Header,StyledInput} from '../../components/utilities.jsx';
import {Wrapper} from '../../components/containers.jsx';
import {GreenButton} from '../../components/button.jsx';
import {Form} from 'react-bootstrap';
import Reg from './regForm.jsx';
import {StyledText} from '../../components/utilities.jsx';

const OwnerReg = (props) => {
    const onChangeSecret = (e) => {
        setSecret(e.target.value);
    }
    let [Secret,setSecret] = useState('');
    return (
            <Reg path="localhost:8080/user/signup" secret={Secret}>
                <Form.Group controlId="secret">
                    <Form.Label>
                        <StyledText color="var(--white-color)">
                            Secret
                        </StyledText>
                    </Form.Label>
                        <StyledInput type="password" placeholder="Enter 6 digits secret" name="secret" value={Secret} onChange={onChangeSecret} required />
                        <Form.Text className="text-muted">
                            Contact admin for secret.
                        </Form.Text>
                        <StyledText color='red'>
                            This section is under construction.
                        </StyledText>
                </Form.Group>
            </Reg>
    )
}
export default OwnerReg;