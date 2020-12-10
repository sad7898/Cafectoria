import React, {useEffect}from 'react';
import {Card} from 'react-bootstrap';
import {Field,useField} from 'formik'
import {Form as StyleForm, Badge} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import styled from 'styled-components';
export const Header = styled.h1`
color : ${props => props.color};
margin : ${props => props.mg};
@media(max-width: 767px){
    font-size: ${props => props.sizeMobile ? props.sizeMobile : props.sizeDesktop} !important;
}
@media(min-width: 768px){
    font-size: ${props => props.sizeDesktop ? props.sizeDesktop : "3rem"} !important;
}
`
export const SubHeader = styled.h3`
color : ${props => props.color};

@media(max-width: 767px){
    font-size: ${props => props.sizeMobile ? props.sizeMobile : props.sizeDesktop} !important;
}
@media(min-width: 768px){
    font-size: ${props => props.sizeDesktop ? props.sizeDesktop : "1.75rem"} !important;
}
`
export const FluidIcon = styled.img`
max-width: ${props => props.maxW};
height: auto;
margin-bottom: 30px;
`
export const CustomCard = (props) => {
    return (
        <StyledCard maxH={props.maxH} minH={props.minH} color={props.titleColor} titleSize={props.titleSize}>
        <StyledCard.Img  className="img-fluid" src={props.img} alt={props.alt} />
        <StyledCard.ImgOverlay>
                <StyledCard.Title>{props.title}</StyledCard.Title>
                <StyledCard.Text>
               {props.children}
                </StyledCard.Text>
        </StyledCard.ImgOverlay>
        </StyledCard>
    )

}
const StyledCard = styled(Card)`
margin-bottom: 1rem;
max-height: ${props => props.maxH};
min-height: ${props => props.minH};
& div div div {
    font-size: ${props => props.titleSize};
    color: ${props => props.titleColor};
}
`
const DemoForm = (props) => {
    return(
    <Field {...props}/>
    )
}

export const StyledInput = styled(DemoForm)`

font-size: 1rem;
height: calc(1.5em + .75rem + 2px);
display: block;
width: 100%;
padding: .375rem .75rem;
background-color: transparent;
border-top: 0;
border-bottom: 2px solid var(--white-color);
border-left: 0;
border-right: 0;
outline: 0;
padding-left: 0;
border-radius: 0;
transition: 0.3s;
    &:hover,&:active,&:focus {
        background-color: transparent;
        box-shadow: none;
        border-color: var(--green-color);
        color: var(--green-color);
    }
color: var(--white-color);
`
export const InputField = ({label,...props}) => {
    const [field,meta,helpers] = useField(props)
    useEffect(() => {
        console.log()
    },[])
    return (
        <>
        <StyleForm.Group>
            <StyleForm.Label>
                <StyledText color="var(--white-color)">{label}</StyledText>
            </StyleForm.Label>
            <StyledInput {...field} {...props}  required/>
            {meta.touch && meta.error ? <StyledText color='red'>{meta.error}</StyledText> : null}
        </StyleForm.Group>
        </>
    )
}
const BootstrapForm = (props) => {
    return (
        <StyleForm.Control {...props}></StyleForm.Control>
    )
}
export const BrightInput = styled(BootstrapForm)`
font-size: 1rem;
height: auto
display: block;
width: 100%;
padding: .375rem .75rem;
background-color: transparent;
border-top: 0;
border-bottom: 2px solid var(--white-color);
border-left: 0;
border-right: 0;
outline: 0;
padding-left: 0;
border-radius: 0;
transition: 0.3s;
    &:hover,&:active,&:focus {
        background-color: transparent;
        box-shadow: none;
        border-color: var(--green-color);
        color: var(--green-color);
    }
color: var(--white-color);
padding: 1rem 1rem 1rem 1rem;
border: 2px solid var(--grey-color);
transition: 0.3s;
    &:hover,&:active,&:focus {
        background-color: transparent;
        box-shadow: none;
        border-color: var(--green-color);
        color: var(--black-color);
    }
color: var(--grey-color);
`
export const StyledText = styled.span`
color : ${props => props.color};
font-size: ${props => props.size};
`

export const StyledList = styled.ul`
& li{
    margin-bottom: 0.5rem;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid var(--grey-color);
}
list-style-type: none;
padding-left: 0;

`
export const CustomTag = (props) => {
    let history = useHistory()
    function filterByTag(){
        history.push('/forum/main',{
            'title': '',
            'tags': [props.tag]
        })
    }
    return (
        <StyledTag onClick={filterByTag}>
            {props.tag}
        </StyledTag>
    )
}
export const StyledTag = styled(Badge)`
background-color: var(--green-color);
margin-right: 0.5rem;
&:hover{
    background-color: #f56a79;
}
`


export const StyledRow = styled.tr`
& td:last-of-type{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
}
`