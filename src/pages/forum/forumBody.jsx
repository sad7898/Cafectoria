import Axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import {Wrapper} from '../../components/containers';
import {Link,useHistory,useRouteMatch,Switch,Route} from 'react-router-dom';
import {Table,Pagination} from 'react-bootstrap';
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
    const key = 'abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXZY'
    let {load,setLoad} = useContext(Loading);
    let {path} = useRouteMatch()
    let [page,setPage] = useState(1)
    let [maxPage,setMaxPage] = useState(6)
    let [pageNav,setPageNav] = useState([1])
    let [postList,setPostList] = useState([]);
    async function loadContent(){
        setLoad(true)
        await Axios.get(`${props.path}?p=${page-1}`,{crossDomain:true,withCredentials:true})
        .then((res) => {
            setMaxPage(Math.ceil(res.data.count/10))
            setPostList(res.data.post)
            console.log('page '+page)
            let nearestFiveFloor;
            if (page%5==0 && page!=1) nearestFiveFloor = (page-4)
            else nearestFiveFloor = (5*Math.floor((page)/5))+1
            let nearestFiveCeil = (5*Math.ceil((page)/5))
            if (nearestFiveCeil > maxPage) nearestFiveCeil= maxPage;
            let arr=[]
            for(let i=nearestFiveFloor;i<=nearestFiveCeil;i++){
                arr.push(i)
            }
            setPageNav(arr)
        })
        .catch((err) => {
            console.log(err)
        })
        setLoad(false)
    }
    function jumpUp(){
        let currentPage =page;
        setPage(5*Math.ceil(currentPage/5)+1)
    }
    function jumpDown(){
        let currentPage =page;
        if (currentPage%5==0){
            setPage(5*(Math.floor(currentPage/5)-1))
        }
        else {
            setPage(5*(Math.floor(currentPage/5)))
        }
    }

    useEffect(() => {
        loadContent()
    },[page])


    return(
<Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
<Switch>
    <Route path={`${path}/:id`}>
        <Post/>
    </Route>
    <Route path={path} exact>
        <Wrapper className="d-flex flex-row justify-content-end align-content-center">
            <img src={Refresh} onClick={loadContent} />
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
        <Wrapper className='d-flex flex-row justify-content-center'>
            <Pagination>
                <Pagination.First onClick={() => setPage(1)}></Pagination.First>
                {
                    page<=5 ? '' : <Pagination.Ellipsis onClick={jumpDown}/>
                }
                {
                    pageNav.map((val,indx) => {
                     return <Pagination.Item active={page==val} key={key[indx]} onClick={() => {console.log('setPage to '+val);setPage(val)}}>{val}</Pagination.Item>
                    })
                }
                {
                    page > (5*Math.floor(maxPage)) || page==maxPage ? '': <Pagination.Ellipsis onClick={jumpUp}/>
                }
                <Pagination.Last onClick={() => setPage(maxPage)}/>
            </Pagination>
        </Wrapper>
    </Route>
</Switch>
</Wrapper>
    )
}
export default ForumBody;