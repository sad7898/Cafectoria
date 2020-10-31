import React, { useState, useEffect,useContext } from 'react';
import {Form} from 'react-bootstrap';
import {BrightInput,StyledText,Header} from '../../components/utilities.jsx'
import {Wrapper} from '../../components/containers.jsx';
import {StyledButton} from '../../components/button.jsx';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import Axios from 'axios';
const PostForm = (props) => {
    let history = useHistory()
    let [text,setText] = useState('')
    let [topic,setTopic] = useState('')
    let [error,setError] = useState('')
    const onChangeText = (e) => {
        setText(e.target.value)
    }
    const onChangeTopic = (e) => {
        setTopic(e.target.value)
    }
    async function handleSubmit() {
        console.log('for now')
        await Axios.post('https://cafetoria-backend.herokuapp.com/post',{'postTopic': topic,'postText':text},{crossDomain:true,withCredentials:true})
        .then((res) => {
            console.log(res)
            history.push('/');
        })
        .catch(err => {
            console.log(err.response.data)
            setError(err.response.data[Object.keys(err.response.data)[0]])
        })
    }
     return(
        <Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
        <Form>
        <Form.Group controlId="topic">
            <Form.Label>
                <StyledText>Topic</StyledText>
            </Form.Label>
                <BrightInput type="text" placeholder="Enter Topic" name="topic" value={topic} onChange={onChangeTopic} required />
        </Form.Group>
        <Form.Group controlId="text" className="d-flex flex-column">
            <Form.Label>
                <StyledText>Content</StyledText>
            </Form.Label>
                <BrightInput type="text" as="textarea" rows={3} placeholder="Enter Text" name="text" value={text} onChange={onChangeText} required />
        </Form.Group>
        <div className="mt-2 mb-2">
            <StyledText color='red'>{error}</StyledText>
        </div>
        <StyledButton bg="var(--green-color)" onClick={handleSubmit}>
            Submit
        </StyledButton>
    </Form>
    </Wrapper>
    )
}
export default PostForm;