import React, { useState } from "react"
import { Form } from "react-bootstrap"
import { BrightInput, StyledText, StyledTag } from "../../components/utilities"
import { Wrapper } from "../../components/containers"
import { StyledButton } from "../../components/button"
import { client } from "../../axiosClient"
import { useNavigate } from "react-router-dom"
import WithAuthGuard from "../../components/guards/withAuthGuard"
export interface PostFormInputs {
  text?: string
  tags: string[]
  topic?: string
}
interface PostFormProps {
  initialText?: string
  initialTopic?: string
  initialTags?: string[]
  error?: string
  handleSubmit: (values: PostFormInputs) => void
}
const PostForm: React.FC<PostFormProps> = ({ initialText, initialTags, initialTopic, handleSubmit, error }) => {
  const [text, setText] = useState(initialText)
  const [topic, setTopic] = useState(initialTopic)
  const [tags, setTags] = useState<string[]>(initialTags ?? [])
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
  return (
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
        <BrightInput type="text" beTextArea={true} rows={3} placeholder="Enter Text" name="text" value={text} onChange={onChangeText} required />
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
      <StyledButton bg="var(--green-color)" onClick={() => handleSubmit({ text, topic, tags })}>
        Submit
      </StyledButton>
    </Form>
  )
}
export default WithAuthGuard(PostForm, "/login")
