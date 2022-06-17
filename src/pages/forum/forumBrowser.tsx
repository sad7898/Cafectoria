import React, { useCallback, useEffect, useState } from "react"
import { Table, Pagination } from "react-bootstrap"
import { useNavigate, useSearchParams, useLocation } from "react-router-dom"
import { client } from "../../axiosClient"
import { Wrapper } from "../../components/containers"
import { StyledRow } from "../../components/utilities"
import useLoading from "../../contexts/loadingContext"
import { PostProps } from "./post"
import PostLink from "./postLink"
import Refresh from "../../images/refresh.png"

export const ForumBrowser = () => {
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
    const filter = {
      topic: searchParams.get("topic"),
      tags: searchParams.getAll("tags").length !== 0 ? searchParams.getAll("tags") : undefined,
    }
    await client.post(`/post/${page - 1}`, filter).then((res) => {
      setMaxPage(Math.ceil(res.data.count / 10))
      console.log(res.data)
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
  }, [page, setLoading, searchParams])
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
    <>
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
            return <PostLink key={val._id} to={`${pathname}/${val._id}`} author={val.author} topic={val.topic} tags={val.tags}></PostLink>
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
    </>
  )
}
