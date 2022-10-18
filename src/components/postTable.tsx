import React from "react"
import { Table } from "react-bootstrap"
import { PostProps } from "../pages/post/post"
import PostLink from "../pages/post/postLink"
import { StyledRow } from "./utilities"

interface PostTableProps {
  posts: PostProps[]
}
export const PostTable = ({ posts }: PostTableProps) => {
  return (
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
        {posts.map((post, indx) => {
          return (
            <PostLink
              key={`post-${post.topic}-${indx}`}
              to={`forum/main/${post._id}`}
              author={post.author}
              topic={post.topic}
              tags={post.tags}
            ></PostLink>
          )
        })}
      </tbody>
    </Table>
  )
}
