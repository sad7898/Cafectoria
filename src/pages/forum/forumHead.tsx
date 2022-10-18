import { useState, startTransition, BaseSyntheticEvent } from "react"
import { Wrapper } from "../../components/containers"
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom"
import { Header, StyledTag, BrightInput } from "../../components/utilities"
import StyledNavLink from "../../components/nav/navLink"
import styled from "styled-components"
import { StyledButton } from "../../components/button"
import { AiFillPlusSquare } from "react-icons/ai"
import WithAuthGuard from "../../components/guards/withAuthGuard"
const StyledWrapper = styled(Wrapper)`
  border-right: 0;
`
interface Filter {
  topic: string
  tags: string[]
}
const ForumHead = () => {
  const navigate = useNavigate()

  const [searchParams, setSearchParams] = useSearchParams()
  const [topicQuery, setTopicQuery] = useState("")
  const filter: Filter = {
    tags: searchParams.getAll("tags"),
    topic: searchParams.get("topic") ?? "",
  }
  const onRemoveTags = (e: BaseSyntheticEvent<any, any, HTMLSpanElement>) => {
    e.preventDefault()
    startTransition(() => {
      const newTags = searchParams.getAll("tags").filter((tag) => tag !== e.target.textContent)
      setSearchParams({ topic: searchParams.get("topic") ?? "", tags: newTags })
    })
  }
  const NewPostIcon = WithAuthGuard(() => (
    <div className="d-flex flex-column justify-content-center mb-4">
      <AiFillPlusSquare size={35} onClick={() => navigate("/forum/new")}></AiFillPlusSquare>
    </div>
  ))
  const resetFilter = () => {
    setSearchParams({})
    setTopicQuery("")
    navigate("/forum/main")
  }
  const onSearch = () => {
    setTopicQuery("")
    navigate({
      pathname: "/forum/main",
      search: createSearchParams({
        topic: topicQuery,
        tags: filter.tags,
      }).toString(),
    })
  }
  return (
    <Wrapper>
      <div className="d-flex justify-content-between">
        <Header colorful color="var(--black-color)" className="mb-4 unselectable">
          <span onClick={resetFilter}>Forum</span>
        </Header>
        <NewPostIcon />
      </div>
      <Wrapper bg="transparent" rborder="10px" pd=".3rem .25rem .3rem .25rem" className="d-flex flex-row">
        <Wrapper className="my-auto">
          <BrightInput className="" placeholder="Search anything. . ." value={topicQuery} onChange={(e: any) => setTopicQuery(e.target.value)} />
        </Wrapper>
        <Wrapper width="x" className="ml-1">
          <StyledButton size="sm" bg="var(--green-color)" onClick={onSearch}>
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
        <div>
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
        {filter.topic && <div>Topic: {filter.topic}</div>}
      </div>
    </Wrapper>
  )
}
export default ForumHead
