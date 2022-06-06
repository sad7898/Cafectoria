import Axios from "axios"
import React, { useState, useEffect, useCallback } from "react"
import { Wrapper } from "../../components/containers"
import PostLink from "./postLink"
import { client } from "../../axiosClient"
import { Table, Pagination } from "react-bootstrap"
import Post, { PostProps } from "./post"
import { StyledRow } from "../../components/utilities"
import Refresh from "../../images/refresh.png"
import useLoading from "../../contexts/loadingContext"
import path from "path"
import { useNavigate, useSearchParams, useLocation, Route, Routes } from "react-router-dom"

const ForumBody = () => {
  const { setLoading } = useLoading()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [pageNav, setPageNav] = useState([1])
  const [postList, setPostList] = useState<PostProps[]>([])
  const loadContent = useCallback(async () => {
    setLoading(true)
    await client
      .post(
        `/post/feed/${page - 1}`,
        {
          topic: searchParams.get("topic"),
          tags: searchParams.getAll("tags").length !== 0 ? searchParams.getAll("tags") : undefined,
        },
        { withCredentials: true }
      )
      .then((res) => {
        setMaxPage(Math.ceil(res.data.count / 10))
        setPostList(res.data)
        let nearestFiveFloor
        if (page % 5 === 0 && page !== 1) nearestFiveFloor = page - 4
        else nearestFiveFloor = 5 * Math.floor(page / 5) + 1
        let nearestFiveCeil = 5 * Math.ceil(page / 5)
        if (nearestFiveCeil > Math.ceil(res.data.count / 10)) nearestFiveCeil = Math.ceil(res.data.count / 10)
        const arr = []
        for (let i = nearestFiveFloor; i <= nearestFiveCeil; i++) {
          arr.push(i)
        }
        setPageNav(arr)
      })
    setLoading(false)
  }, [page, setLoading])
  function jumpUp() {
    const currentPage = page
    setPage(5 * Math.ceil(currentPage / 5) + 1)
  }

  function jumpDown() {
    const currentPage = page
    if (currentPage % 5 === 0) {
      setPage(5 * (Math.floor(currentPage / 5) - 1))
    } else {
      setPage(5 * Math.floor(currentPage / 5))
    }
  }

  useEffect(() => {
    loadContent()
  }, [loadContent])

  return (
    <Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
      <Routes>
        <Route path={`${path}/:id`}>
          <Post />
        </Route>
        <Route path={pathname}>
          <Wrapper className="d-flex flex-row justify-content-end align-content-center">
            <img src={Refresh} onClick={loadContent} alt="refresh" />
          </Wrapper>
          <Table striped borderless hover>
            <thead>
              <StyledRow>
                <th colSpan={3}>Topics</th>
                <th></th>
                <th></th>
                <th className="d-flex flex-row justify-content-end">Author</th>
              </StyledRow>
            </thead>
            <tbody>
              {postList.map((val) => {
                return <PostLink key={val.id} to={`${path}/${val.id}`} author={val.author} topic={val.topic} tags={val.tags}></PostLink>
              })}
            </tbody>
          </Table>
          <Wrapper className="d-flex flex-row justify-content-center">
            <Pagination>
              <Pagination.First onClick={() => setPage(1)}></Pagination.First>
              {page <= 5 ? "" : <Pagination.Ellipsis onClick={jumpDown} />}
              {pageNav.map((val, indx) => {
                return (
                  <Pagination.Item
                    active={page === val}
                    key={`item-${indx}`}
                    onClick={() => {
                      setPage(val)
                    }}
                  >
                    {val}
                  </Pagination.Item>
                )
              })}
              {page > 5 * Math.floor(maxPage) || page === maxPage || maxPage <= 5 ? "" : <Pagination.Ellipsis onClick={jumpUp} />}
              <Pagination.Last onClick={() => setPage(maxPage)} />
            </Pagination>
          </Wrapper>
        </Route>
      </Routes>
    </Wrapper>
  )
}
export default ForumBody
