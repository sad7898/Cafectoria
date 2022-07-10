import React, { startTransition, useCallback, useEffect, useRef, useState } from "react"
import { Table, Pagination } from "react-bootstrap"
import { useNavigate, useSearchParams, useLocation } from "react-router-dom"
import { client } from "../../axiosClient"
import { Wrapper } from "../../components/containers"
import { StyledRow } from "../../components/utilities"
import useLoading from "../../contexts/loadingContext"
import { PostProps } from "../post/post"
import PostLink from "../post/postLink"
import Refresh from "../../images/refresh.png"
export interface BulkPostResponse {
  posts: PostProps[]
  count: number
}
export const ForumBrowser = () => {
  const { setLoading } = useLoading()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [pageNav, setPageNav] = useState([1])
  const [postList, setPostList] = useState<PostProps[]>([])
  const setPageTransition = (page: number) => {
    startTransition(() => {
      setPage(page)
    })
  }
  const loadContent = useCallback(async () => {
    setLoading(true)
    const filter = {
      topic: searchParams.get("topic"),
      tags: searchParams.getAll("tags").length !== 0 ? searchParams.getAll("tags") : undefined,
      sortKey: searchParams.get("topic") ? "topic" : "created",
    }
    const res = await client.post<BulkPostResponse>(`/post/${page - 1}`, filter)
    setMaxPage(Math.ceil(res.data.count / 10))
    setPostList(res.data.posts)
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
    setLoading(false)
  }, [page, setLoading, searchParams])
  function jumpUp() {
    const toPage = 5 * Math.ceil(page / 5) + 1
    setPageTransition(toPage > maxPage ? maxPage : toPage)
  }

  function jumpDown() {
    const currentPage = page
    if (currentPage % 5 === 0) {
      setPageTransition(5 * (Math.floor(currentPage / 5) - 1))
    } else {
      setPageTransition(5 * Math.floor(currentPage / 5))
    }
  }
  useEffect(() => {
    setPageTransition(1)
  }, [searchParams])
  useEffect(() => {
    loadContent()
  }, [loadContent])
  return (
    <>
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
          {postList.map((val, indx) => {
            return (
              <PostLink
                key={`post-${val.topic}-${indx}`}
                to={`${pathname}/${val._id}`}
                author={val.author}
                topic={val.topic}
                tags={val.tags}
              ></PostLink>
            )
          })}
        </tbody>
      </Table>
      <Wrapper className="d-flex flex-row justify-content-center">
        <Pagination>
          <Pagination.First onClick={() => setPageTransition(1)}></Pagination.First>
          {page <= 5 ? "" : <Pagination.Ellipsis onClick={jumpDown} />}
          {pageNav.map((val, indx) => {
            return (
              <Pagination.Item
                active={page === val}
                key={`item-${indx}`}
                onClick={() => {
                  setPageTransition(val)
                }}
              >
                {val}
              </Pagination.Item>
            )
          })}
          {page > 5 * Math.floor(maxPage) || page === maxPage || maxPage <= 5 ? "" : <Pagination.Ellipsis onClick={jumpUp} />}
        </Pagination>
      </Wrapper>
    </>
  )
}
