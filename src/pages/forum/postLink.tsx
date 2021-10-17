import React from "react";
import { StyledRow, StyledTag } from "../../components/utilities";
import { Link } from "react-router-dom";
import { PostProps } from "./post";
interface PostLinkProps extends Omit<PostProps, "id"> {
  to: string;
}
const PostLink = (props: PostLinkProps) => {
  return (
    <StyledRow>
      <td colSpan={3}>
        <Link to={props.to}>{props.topic}</Link>
      </td>
      <td>
        {props.tags.map((val) => {
          return <StyledTag>{val}</StyledTag>;
        })}
      </td>
      <td></td>
      <td>{props.author}</td>
    </StyledRow>
  );
};
export default PostLink;
