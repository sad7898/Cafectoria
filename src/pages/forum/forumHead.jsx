
import React, { useState, useEffect } from 'react';
import {Wrapper} from '../../components/containers.jsx'
import {useHistory} from 'react-router-dom';
import {Header,CustomTag,StyledTag} from '../../components/utilities.jsx';
import StyledNavLink from '../../components/nav/navLink.jsx';
import styled from 'styled-components';
import AddIcon from '../../images/add.png';
const StyledWrapper = styled(Wrapper)`
    border-right: 0
`
function eqArr(as, bs) {
    if (as.length !== bs.length) return false;
    for (var a in as) if (!bs.includes(a)) return false;
    return true;
}
const ForumHead = (props) => {
    let history  = useHistory()
    let [filter,setFilter] = useState({'title':'','tags':[]})
    const filterByTag = (e) => {
        const tag = e.target.innerHTML
        history.push('/forum/main',{
            'title': '',
            'tags': [tag]
        })
    }
    useEffect(() => {
        setFilter(prevState => {
            let locState = history.location.state
            let newTags =[]
            let changeList = {'title':false,'tags':false}
            if (locState){
                if (locState.title != prevState.title){
                    changeList.title = true
                }
                if (!eqArr(locState.tags,prevState.tags)){
                    if (!locState.tags) newTags=undefined
                    else newTags = Array.from(locState.tags)
                    changeList.tags = true
                }
                return {'title': changeList.title ? locState.title: prevState.title, 'tags': changeList.tags ? newTags: prevState.tags }
            }
            return {'title':'','tags':[]}
        })
    },[history.location.state])
    return (
    <Wrapper>
        <Header color="var(--black-color)" className="mb-4">
            Forum
        </Header>
        <Wrapper bg="#dedede" rborder="10px" pd=".3rem .25rem .3rem .25rem" className="d-flex flex-row justify-content-between">
            <Wrapper className="d-flex flex-row" minw='250'>
                <StyledWrapper width='auto' >
                    <StyledNavLink style={{paddingBottom: '0.5rem'}} to='/forum/filter'>Filter</StyledNavLink>
                    <div className="px-2">
                    {filter.tags.length!=0 || filter.tags.title ? filter.tags.map((val) => {
                       return ( <StyledTag key={val}>
                           {val}
                        </StyledTag> )

                    }
                    )
                    : <StyledTag>None</StyledTag>}
                    </div>
            
                    
                </StyledWrapper>

            </Wrapper>
            <Wrapper className="d-flex flex-column justify-content-center px-2">
                <img src={AddIcon} onClick={() => history.push('/forum/new')}/>
            </Wrapper>
        </Wrapper>
    </Wrapper>
    )
}
export default ForumHead;