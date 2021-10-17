import React from "react";
import { StyledRow, StyledTag } from "../../components/utilities.jsx";
import { Link } from "react-router-dom";
const PostLink = (props) => {
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
