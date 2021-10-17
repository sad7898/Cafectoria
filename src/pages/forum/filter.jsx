import React, { useState} from 'react';
import {Form} from 'react-bootstrap';
import {BrightInput,StyledText,StyledTag} from '../../components/utilities.jsx'
import {Wrapper} from '../../components/containers.jsx';
import {StyledButton} from '../../components/button.jsx';
import {useHistory} from 'react-router-dom';
const Filter = (props) => {
    let history = useHistory()
    let [topic,setTopic] = useState('')
    // eslint-disable-next-line no-unused-vars
    let [error,setError] = useState('')
    let [tags,setTags] = useState([])

    async function handleSubmit() {
        history.push('/forum/main',{
            'tags':tags,
            'topic':topic
        });
    }
 
    const onChangeTopic = (e) => {
        setTopic(e.target.value)
    }
    const onChangeTags = (e) => {
        if (!tags.includes(e.target.value)){
            let tempArr = tags.concat(e.target.value)
            setTags(tempArr)
        }
    }
    const popTags = (e) => {
        let tempArr = Array.from(tags)
        const indx = tempArr.indexOf(e.target.innerHTML)
        if (indx > -1) tempArr.splice(indx,1)
        setTags(tempArr)
    }
    return (
        <Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
        <Form>
        <Form.Group controlId="topic">
            <Form.Label>
                <StyledText>Topic</StyledText>
            </Form.Label>
                <BrightInput type="text" placeholder="Enter Topic" name="topic" value={topic} onChange={onChangeTopic} required />
        </Form.Group>
        <Form.Group controlId="tags" className="d-flex flex-column">
            <Form.Label>Select atleast one tag</Form.Label>
            <BrightInput as="select" value={tags.length===0 ? 'empty' : tags[tags.length-1]} onChange={onChangeTags}>
                <option value='empty' style={{display: tags.length===0 ? '' : 'none'}}> </option>
                <option value='meat'>Meat</option>
                <option value='veggie'>Veggie</option>
                <option value='carbohydrates'>Carbs</option>
                <option value='fruits'>Fruits</option>
                <option value='fast-food'>Fast Food</option>
            </BrightInput>
            <div>
                {tags.map((val,indx) => {
                    return (
                    <StyledTag pill onClick={popTags} value={val} key={val}>
                        {val}
                    </StyledTag>)
                })}
            </div>
        </Form.Group>
        <div className="mt-2 mb-2">
            <StyledText color='red'>{error}</StyledText>
        </div>
        <StyledButton bg="var(--green-color)" onClick={handleSubmit}>
            Find
        </StyledButton>
    </Form>
    </Wrapper>
    )
}
export default Filter