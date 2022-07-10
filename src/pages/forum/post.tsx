import React, { useState, useEffect } from "react"
import { Wrapper } from "../../components/containers"
import { Header } from "../../components/utilities"
import { Button } from "react-bootstrap"
import useLoading from "../../contexts/loadingContext"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { client } from "../../axiosClient"
import { useNavigate, useParams } from "react-router-dom"
import { PostFormInputs } from "./postForm"
export interface PostProps {
  _id: string
  topic: string
  tags: string[]
  author: {
    _id: string
    name: string
  }[]
}
interface PostDataProps {
  topic: string
  text: string
  tags: string[]
}
interface PostDataResponse extends PostDataProps {
  author: {
    name: string
  }
}
const Post = () => {
  const { setLoading } = useLoading()
  const [isAuthor, setAuthor] = useState(false)
  const navigate = useNavigate()
  const [postData, setPostData] = useState<PostDataProps>()
  const user = useSelector((state: RootState) => state.auth)

  const { id } = useParams<{ id: string }>()
  const handleDel = async () => {
    setLoading(true)
    await client
      .delete(`/post/${id}`)
      .then((res) => {
        navigate("/")
      })
      .catch((err) => {
        alert("You cannot delete post if you are not the author")
        navigate("/")
      })
    setLoading(false)
  }
  const onClickEdit = () => {
    navigate(`edit`, {
      state: {
        ...postData,
      },
    })
  }
  useEffect(() => {
    async function loadContent() {
      setLoading(true)
      await client.get<PostDataResponse>(`/post/${id}`).then((res) => {
        if (res.data.author.name === user.name) {
          setAuthor(true)
        } else {
          setAuthor(false)
        }
        setPostData({
          topic: res.data.topic,
          text: res.data.text,
          tags: res.data.tags,
        })
      })
      setLoading(false)
    }
    loadContent()
  }, [id, setLoading, user])
  return (
    <Wrapper bg="#dedede" rborder="10px" className="px-2" minh="200">
      <div className="d-flex flex-row justify-content-between">
        <Header>{postData?.topic}</Header>

        {isAuthor ? (
          <>
            <p onClick={handleDel}>delete</p>
            <p onClick={onClickEdit}>edit</p>
          </>
        ) : (
          ""
        )}
      </div>
      <Wrapper>{postData?.text}</Wrapper>
    </Wrapper>
  )
}
export default Post
