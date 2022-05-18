import React, { useState, useEffect } from "react"
import { Wrapper } from "../../components/containers"
import { useNavigate, useSearchParams } from "react-router-dom"
import { Header, StyledTag } from "../../components/utilities"
import StyledNavLink from "../../components/nav/navLink"
import styled from "styled-components"
import AddIcon from "../../images/add.png"
import { PostProps } from "./post"
const StyledWrapper = styled(Wrapper)`
  border-right: 0;
`
interface Filter {
  topic: string
  tags: string[]
}

const ForumHead = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [filter, setFilter] = useState<Filter>({ topic: "", tags: [] })
  useEffect(() => {
    setFilter((prevState) => {
      const params = { topic: searchParams.get("topic"), tags: searchParams.getAll("tags") }
      const paramsAreValid: boolean = !!params.topic && !!params.tags.length
      if (paramsAreValid) {
        return {
          topic: params.topic || "",
          tags: params.tags,
        }
      }
      return prevState
    })
  }, [searchParams])
  return (
    <Wrapper>
      <Header color="var(--black-color)" className="mb-4">
        Forum
      </Header>
      <Wrapper bg="#dedede" rborder="10px" pd=".3rem .25rem .3rem .25rem" className="d-flex flex-row justify-content-between">
        <Wrapper className="d-flex flex-row" minw="250">
          <StyledWrapper width="auto">
            <StyledNavLink to="/forum/filter">Filter</StyledNavLink>
            <div className="px-2">
              {filter.tags.length !== 0 || filter.topic ? (
                filter.tags.map((val) => {
                  return <StyledTag key={val}>{val}</StyledTag>
                })
              ) : (
                <StyledTag>None</StyledTag>
              )}
            </div>
          </StyledWrapper>
        </Wrapper>
        <Wrapper className="d-flex flex-column justify-content-center px-2">
          <img src={AddIcon} onClick={() => navigate("/forum/new")} alt="Add" />
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}
export default ForumHead
