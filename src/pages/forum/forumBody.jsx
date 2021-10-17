import Axios from 'axios';
import React, { useState, useEffect, useContext, useCallback } from 'react';
import {Wrapper} from '../../components/containers';
import {Link,useHistory,useRouteMatch,Switch,Route} from 'react-router-dom';
import PostLink from './postLink.jsx'
import {Table,Pagination} from 'react-bootstrap';
import Post from './post.jsx';
import {Loading} from '../../pages/Bundle.jsx';
import {StyledRow} from '../../components/utilities.jsx'
import Refresh from '../../images/refresh.png';



const ForumBody = (props) => {
    const key = 'abcdefghijklmnopqrstuvwxzyABCDEFGHIJKLMNOPQRSTUVWXZY'
    let {load,setLoad} = useContext(Loading);
    let history = useHistory()
    let {path} = useRouteMatch()
    let [page,setPage] = useState(1)
    let [maxPage,setMaxPage] = useState(1)
    let [pageNav,setPageNav] = useState([1])
    let [postList,setPostList] = useState([]);
    const loadContent = useCallback(async () => {
        setLoad(true)
        await Axios.get(`${props.path}`,{crossDomain:true,withCredentials:true,params:{
            p: page-1,
            topic: history.location.state ? (history.location.state.topic ? history.location.state.topic : undefined) : undefined,
            tags: history.location.state ? (history.location.state.tags && history.location.state.tags.length!=0 ? history.location.state.tags : undefined) : undefined
        }})
        .then((res) => {
            setMaxPage(Math.ceil(res.data.count/10))
            setPostList(res.data.post)
            let nearestFiveFloor;
            if (page%5===0 && page!==1) nearestFiveFloor = (page-4)
            else nearestFiveFloor = (5*Math.floor((page)/5))+1
            let nearestFiveCeil = (5*Math.ceil((page)/5))
            if (nearestFiveCeil > Math.ceil(res.data.count/10)) nearestFiveCeil= Math.ceil(res.data.count/10);
            let arr=[]
            for(let i=nearestFiveFloor;i<=nearestFiveCeil;i++){
                arr.push(i)
            }
            setPageNav(arr)
        })
        setLoad(false)
    },[history.location.state,page,props.path,setLoad])
    function jumpUp(){
        let currentPage =page;
        setPage(5*Math.ceil(currentPage/5)+1)
    }

    function jumpDown(){
        let currentPage =page;
        if (currentPage%5===0){
            setPage(5*(Math.floor(currentPage/5)-1))
        }
        else {
            setPage(5*(Math.floor(currentPage/5)))
        }
    }

    useEffect(() => {
        loadContent()
    },[loadContent])


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
            {postList.map((val) => {
                return <PostLink key={val.id} to={`${path}/${val.id}`} author={val.author} topic={val.topic} tags={val.tags}></PostLink>
        })}
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
                     return <Pagination.Item active={page==val} key={key[indx]} onClick={() => {setPage(val)}}>{val}</Pagination.Item>
                    })
                }
                {
                    (page > (5*Math.floor(maxPage))) || page==maxPage || maxPage<=5 ? '': <Pagination.Ellipsis onClick={jumpUp}/>
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