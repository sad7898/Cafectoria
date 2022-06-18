import React, { useState } from "react"
import { Form } from "react-bootstrap"
import { BrightInput, StyledText, StyledTag } from "../../components/utilities"
import { Wrapper } from "../../components/containers"
import { StyledButton } from "../../components/button"
import { useNavigate, createSearchParams } from "react-router-dom"
const Filter = () => {
  const navigate = useNavigate()
  const [topic, setTopic] = useState("")
  const [error] = useState("")
  const [tags, setTags] = useState<string[]>([])

  async function handleSubmit() {
    const params = createSearchParams({ tags: tags, topic: topic ?? null })
    navigate({ pathname: "/forum/main", search: `?${params}` })
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
          <BrightInput as="select" value={tags.length === 0 ? "empty" : tags[tags.length - 1]} onChange={onChangeTags}>
            <option value="empty" style={{ display: tags.length === 0 ? "" : "none" }}>
              {" "}
            </option>
            <option value="Meat">Meat</option>
            <option value="Veggie">Veggie</option>
            <option value="Carbohydrates">Carbs</option>
            <option value="Fats">Fats</option>
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
          Find
        </StyledButton>
      </Form>
    </Wrapper>
  )
}
export default Filter
