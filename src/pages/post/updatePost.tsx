import { AxiosError } from "axios"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { client } from "../../axiosClient"
import PostForm, { PostFormInputs } from "./postForm"

export const UpdatePost = () => {
  const { id } = useParams()
  const [error, setError] = useState<string>()
  const navigate = useNavigate()
  const location = useLocation()
  const initialValues = location.state as PostFormInputs
  async function handleSubmit(values: PostFormInputs) {
    await client
      .patch(`/post/${id}`, { ...values })
      .then((res) => {
        navigate("/forum/main")
      })
      .catch((err: Error | AxiosError) => {
        setError(err.message)
      })
  }
  return <PostForm handleSubmit={handleSubmit} error={error} {...initialValues}></PostForm>
}
