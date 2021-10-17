import React, { useState, useEffect, useContext } from 'react';
import {Wrapper} from '../../components/containers';
import {Header} from '../../components/utilities';
import {useParams,useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap';
import {Loading} from '../../pages/Bundle.jsx';
import Axios from 'axios';
const Post = (props) => {
    let {setLoad} = useContext(Loading);
    let [isAuthor,setAuthor] = useState(false);
    let history = useHistory()
    let [postData,setPostData]=useState({})
       
    let {id} = useParams()
    const handleDel = async () => {
        setLoad(true)
        await Axios.delete(`https://cafetoria-backend.herokuapp.com/post/${id}`,{crossDomain:true,withCredentials:true})
        .then((res) => {
            history.push('/');
        })
        .catch((err) => {
            alert('You cannot delete post if you are not the author')
            history.push('/')
        })
        setLoad(false);
    }
    useEffect(() => {
        async function loadContent(){
            setLoad(true)
            await Axios.get(`https://cafetoria-backend.herokuapp.com/post/${id}`,{crossDomain:true,withCredentials:true})
            .then((res) => {
                if (res.data[0].isAuthor){
                    setAuthor(true);
                }
                else{
                    setAuthor(false);
                }
                setPostData({
                    topic: res.data[0].topic,
                    text: res.data[0].text
                })
            })
            setLoad(false)
        }
        loadContent()
    },[id,setLoad])
    return (
        <Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
            {isAuthor ? 
            <div className="d-flex flex-row justify-content-end">
                <Button variant="danger" onClick={handleDel}>delete</Button>
            </div> : 
            ''}
            <Header>{postData.topic}</Header>
            <Wrapper>
                {postData.text}
            </Wrapper>
        </Wrapper>
    )
}
export default Post;