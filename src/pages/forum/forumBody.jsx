import Axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {Wrapper} from '../../components/containers';
import {Link,useHistory,useRouteMatch,Switch,Route} from 'react-router-dom';
import {Table} from 'react-bootstrap';
import styled from 'styled-components';
import Post from './post.jsx';
import {Loading} from '../../pages/Bundle.jsx';
import Refresh from '../../images/refresh.png';
const StyledRow = styled.tr`
& td:last-of-type{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
`


const ForumBody = (props) => {
    let {load,setLoad} = useContext(Loading);
    let {path,url} = useRouteMatch()
    let [postList,setPostList] = useState([]);
    async function reloadContent(){
        setLoad(true)
        await Axios.get(props.path,{crossDomain:true,withCredentials:true})
        .then((res) => {
            console.log(res)
            setPostList(res.data)
        })
        .catch((err) => console.log(err))
        setLoad(false)
    }
    useEffect(() => {
        async function loadContent(){
        setLoad(true)
        await Axios.get(props.path,{crossDomain:true,withCredentials:true})
        .then((res) => {
            console.log(res)
            setPostList(res.data)
        })
        .catch((err) => console.log(err))
        setLoad(false)
    }
    loadContent()
    },[])
    return(
<Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
<Switch>
    <Route path={`${path}/:id`}>
        <Post/>
    </Route>
    <Route path={path} exact>
        <Wrapper className="d-flex flex-row justify-content-end align-content-center">
            <img src={Refresh} onClick={reloadContent} />
        </Wrapper>
        <Table striped borderless hover>
        <thead>
            <StyledRow>
            <th colSpan="3">Topics</th>
            <th></th>
            <th></th>
            <th className="d-flex flex-row justify-content-end">Author</th>
            </StyledRow>
        </thead>
        <tbody>
            {postList.map((val) => (
                    <StyledRow key={val.id}>
                    <td colSpan="3">
                            <Link to={`${path}/${val.id}`}>
                            {val.topic}
                            </Link>
                        </td>
                    <td></td>
                    <td></td>
                    <td>{val.author}</td>
                    </StyledRow>
            ))}
        </tbody>
        </Table>
    </Route>
</Switch>
</Wrapper>
    )
}
export default ForumBody;