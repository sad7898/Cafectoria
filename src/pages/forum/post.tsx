import React, { useState, useEffect } from "react"
import { Wrapper } from "../../components/containers"
import { Header } from "../../components/utilities"
import { useParams, useNavigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import Axios from "axios"
import useLoading from "../../contexts/loadingContext"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
export interface PostProps {
  id?: string
  topic: string
  tags: string[]
  author?: string
}
interface PostDataProps {
  topic: string
  text: string
}
interface PostDataResponse extends PostDataProps {
  author: string
}
const Post = () => {
  const { setLoading } = useLoading()
  const [isAuthor, setAuthor] = useState(false)
  const navigate = useNavigate()
  const [postData, setPostData] = useState<PostDataProps>()
  const { user } = useSelector((state: RootState) => state.auth)

  const { id } = useParams<{ id: string }>()
  const handleDel = async () => {
    setLoading(true)
    await Axios.delete(`https://cafetoria-backend.herokuapp.com/post/${id}`, {
      withCredentials: true,
    })
      .then((res) => {
        navigate.push("/")
      })
      .catch((err) => {
        alert("You cannot delete post if you are not the author")
        navigate.push("/")
      })
    setLoading(false)
  }
  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      await Axios.get<PostDataResponse[]>(`https://cafetoria-backend.herokuapp.com/post/${id}`, {
        withCredentials: true,
      }).then((res) => {
        if (res.data[0].author === user) {
          setAuthor(true)
        } else {
          setAuthor(false)
        }
        setPostData({
          topic: res.data[0].topic,
          text: res.data[0].text,
        })
      })
      setLoading(false)
    }
    loadContent()
  }, [id, setLoading, user])
  return (
    <Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
      {isAuthor ? (
        <div className="d-flex flex-row justify-content-end">
          <Button variant="danger" onClick={handleDel}>
            delete
          </Button>
        </div>
      ) : (
        ""
      )}
      <Header>{postData?.topic}</Header>
      <Wrapper>{postData?.text}</Wrapper>
    </Wrapper>
  )
}
export default Post
