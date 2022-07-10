import { AxiosError } from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { text } from "stream/consumers"
import { client } from "../../axiosClient"
import { Wrapper } from "../../components/containers"
import PostForm, { PostFormInputs } from "./postForm"

export const CreatePost = () => {
  const [error, setError] = useState<string>()
  const navigate = useNavigate()
  async function handleSubmit(values: PostFormInputs) {
    await client
      .post("/post", { ...values })
      .then((res) => {
        navigate("/forum/main")
      })
      .catch((err: Error | AxiosError) => {
        setError(err.message)
      })
  }
  return (
    <Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
      <PostForm handleSubmit={handleSubmit} error={error}></PostForm>
    </Wrapper>
  )
}
