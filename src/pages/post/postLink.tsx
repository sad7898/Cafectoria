import React from "react"
import { StyledRow, StyledTag } from "../../components/utilities"
import { Link } from "react-router-dom"
import { PostProps } from "./post"
interface PostLinkProps extends Omit<PostProps, "_id"> {
  to: string
}
const PostLink = (props: PostLinkProps) => {
  return (
    <StyledRow>
      <td colSpan={3} style={{ maxWidth: "100px", overflowX: "hidden", textOverflow: "ellipsis" }}>
        <Link to={props.to}>{props.topic}</Link>
      </td>
      <td>
        {props.tags.map((val) => {
          return <StyledTag key={val}>{val}</StyledTag>
        })}
      </td>
      <td></td>
      <td style={{ maxWidth: "90px" }}>{props.author[0].name}</td>
    </StyledRow>
  )
}
export default PostLink
