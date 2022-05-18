import React, { useState } from "react"
import { Form } from "react-bootstrap"
import { BrightInput, StyledText, StyledTag } from "../../components/utilities"
import { Wrapper } from "../../components/containers"
import { StyledButton } from "../../components/button"
import { useNavigate } from "react-router-dom"
import Axios from "axios"
const PostForm = () => {
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const [topic, setTopic] = useState("")
  const [error, setError] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const onChangeText = (e: any) => {
    setText(e.target.value)
  }
  const onChangeTopic = (e: any) => {
    setTopic(e.target.value)
  }
  const onChangeTags = (e: any) => {
    if (!tags.includes(e.target.value)) {
      const tempArr = tags.concat(e.target.value)
      setTags(tempArr)
    }
  }
  const popTags = (e: any) => {
    const tempArr = Array.from(tags)
    const indx = tempArr.indexOf(e.target.innerHTML)
    if (indx > -1) tempArr.splice(indx, 1)
    setTags(tempArr)
  }
  async function handleSubmit() {
    await Axios.post("https://cafetoria-backend.herokuapp.com/post", { postTopic: topic, postText: text, tags: tags }, { withCredentials: true })
      .then((res) => {
        navigate("/forum")
      })
      .catch((err) => {
        setError(err.response.data[Object.keys(err.response.data)[0]])
      })
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
        <Form.Group controlId="text" className="d-flex flex-column">
          <Form.Label>
            <StyledText>Content</StyledText>
          </Form.Label>
          <BrightInput type="text" isTextArea={true} rows={3} placeholder="Enter Text" name="text" value={text} onChange={onChangeText} required />
        </Form.Group>
        <Form.Group controlId="tags" className="d-flex flex-column">
          <Form.Label>Select atleast one tag</Form.Label>
          <BrightInput as="select" value={tags.length === 0 ? "empty" : tags[tags.length - 1]} onChange={onChangeTags}>
            <option value="empty" style={{ display: tags.length === 0 ? "" : "none" }}>
              {" "}
            </option>
            <option value="meat">Meat</option>
            <option value="veggie">Veggie</option>
            <option value="carbohydrates">Carbs</option>
            <option value="fruits">Fruits</option>
            <option value="fast-food">Fast Food</option>
          </BrightInput>
          <div>
            {tags.map((val, indx) => {
              return (
                <StyledTag pill onClick={popTags} value={val} key={val}>
                  {val}
                </StyledTag>
              )
            })}
          </div>
        </Form.Group>
        <div className="mt-2 mb-2">
          <StyledText color="red">{error}</StyledText>
        </div>
        <StyledButton bg="var(--green-color)" onClick={handleSubmit}>
          Submit
        </StyledButton>
      </Form>
    </Wrapper>
  )
}
export default PostForm
