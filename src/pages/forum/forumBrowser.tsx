import { useCallback, useEffect, useState } from "react"
import { Table, Pagination } from "react-bootstrap"
import { useNavigate, useSearchParams, useLocation } from "react-router-dom"
import { client } from "../../axiosClient"
import { Wrapper } from "../../components/containers"
import { PostTable } from "../../components/postTable"
import { StyledRow } from "../../components/utilities"
import useLoading from "../../contexts/loadingContext"
import { PostProps } from "../post/post"
import PostLink from "../post/postLink"
export interface BulkPostResponse {
  posts: PostProps[]
  count: number
}
const ForumBrowser = () => {
  const { setLoading } = useLoading()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { pathname } = useLocation()
  const [page, setPage] = useState(1)
  const [maxPage, setMaxPage] = useState(1)
  const [pageNav, setPageNav] = useState([1])
  const [postList, setPostList] = useState<PostProps[]>([])
  const loadContent = useCallback(async () => {
    const filter = {
      topic: searchParams.get("topic"),
      tags: searchParams.getAll("tags").length !== 0 ? searchParams.getAll("tags") : undefined,
      sortKey: searchParams.get("topic") ? "topic" : "created",
    }
    setLoading(true)
    const res = await client.post<BulkPostResponse>(`/post/${page - 1}`, filter)
    setMaxPage(Math.ceil(res.data.count / 10))
    setPostList(res.data.posts ?? [])
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
  }, [page, searchParams])
  function jumpUp() {
    const toPage = 5 * Math.ceil(page / 5) + 1
    setPage(toPage > maxPage ? maxPage : toPage)
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
    setPage(1)
  }, [searchParams])
  useEffect(() => {
    loadContent()
  }, [loadContent])
  return (
    <>
      <PostTable posts={postList} />
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
        </Pagination>
      </Wrapper>
    </>
  )
}
export default ForumBrowser
