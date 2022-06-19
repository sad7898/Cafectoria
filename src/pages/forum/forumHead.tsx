import React, { useState, useEffect, startTransition, BaseSyntheticEvent } from "react"
import { Wrapper } from "../../components/containers"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Header, StyledTag, BrightInput } from "../../components/utilities"
import StyledNavLink from "../../components/nav/navLink"
import styled from "styled-components"
import AddIcon from "../../images/add.png"
import { PostProps } from "./post"
import { BsPlusCircleFill } from "react-icons/bs"
import { Button } from "react-bootstrap"
import { StyledButton } from "../../components/button"
const StyledWrapper = styled(Wrapper)`
  border-right: 0;
`
interface Filter {
  topic: string
  tags: string[]
}

const ForumHead = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [topicQuery, setTopicQuery] = useState("")
  const filter: Filter = {
    tags: searchParams.getAll("tags"),
    topic: searchParams.get("topic") ?? "",
  }
  const onRemoveTags = (e: BaseSyntheticEvent<any, any, HTMLSpanElement>) => {
    startTransition(() => {
      const newTags = searchParams.getAll("tags").filter((tag) => tag !== e.target.textContent)
      setSearchParams({ ...searchParams, tags: newTags })
    })
  }
  const navigate = useNavigate()
  const resetFilter = () => {
    setSearchParams({})
    setTopicQuery("")
  }
  return (
    <Wrapper>
      <Header colorful color="var(--black-color)" className="mb-4 unselectable" onClick={resetFilter}>
        Forum
      </Header>
      <Wrapper bg="transparent" rborder="10px" pd=".3rem .25rem .3rem .25rem" className="d-flex flex-row justify-content-between">
        <Wrapper className="my-auto w-100">
          <BrightInput className="" placeholder="Search anything. . ." value={topicQuery} onChange={(e: any) => setTopicQuery(e.target.value)} />
        </Wrapper>
        <Wrapper className="d-flex flex-row align-items-center justify-content-end ml-1">
          <StyledButton
            size="sm"
            bg="var(--green-color)"
            onClick={() => {
              setSearchParams({ ...searchParams, topic: topicQuery })
              setTopicQuery("")
            }}
          >
            Find
          </StyledButton>
        </Wrapper>
      </Wrapper>
      <StyledWrapper width="auto">
        <StyledNavLink to="/forum/filter" size="1rem">
          More filter
        </StyledNavLink>
      </StyledWrapper>
      <div className="px-1 py-1">
        Tags:
        {filter.tags.length > 0 ? (
          filter.tags.map((val) => {
            return (
              <StyledTag key={val} onClick={onRemoveTags}>
                {val}
              </StyledTag>
            )
          })
        ) : (
          <StyledTag>None</StyledTag>
        )}
      </div>
    </Wrapper>
  )
}
export default ForumHead
