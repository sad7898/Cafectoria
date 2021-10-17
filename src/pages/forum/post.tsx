import React, { useState, useEffect } from "react";
import { Wrapper } from "../../components/containers";
import { Header } from "../../components/utilities";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import Axios from "axios";
import useLoading from "../../contexts/loadingContext";
export interface PostProps {
  id?: string;
  topic: string;
  tags: string[];
  author?: string;
}
interface PostDataProps {
  topic: string;
  text: string;
}
interface PostDataResponse extends PostDataProps {
  isAuthor: boolean;
}
const Post = () => {
  const { setLoading } = useLoading();
  const [isAuthor, setAuthor] = useState(false);
  const history = useHistory();
  const [postData, setPostData] = useState<PostDataProps>();

  const { id } = useParams<{ id: string }>();
  const handleDel = async () => {
    setLoading(true);
    await Axios.delete(`https://cafetoria-backend.herokuapp.com/post/${id}`, {
      withCredentials: true,
    })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        alert("You cannot delete post if you are not the author");
        history.push("/");
      });
    setLoading(false);
  };
  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      await Axios.get<PostDataResponse[]>(
        `https://cafetoria-backend.herokuapp.com/post/${id}`,
        {
          withCredentials: true,
        }
      ).then((res) => {
        if (res.data[0].isAuthor) {
          setAuthor(true);
        } else {
          setAuthor(false);
        }
        setPostData({
          topic: res.data[0].topic,
          text: res.data[0].text,
        });
      });
      setLoading(false);
    }
    loadContent();
  }, [id, setLoading]);
  return (
    <Wrapper
      bg="#dedede"
      rborder="10px"
      pd="1rem 1rem 1rem 1rem"
      mg="1rem auto auto auto"
    >
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
  );
};
export default Post;
