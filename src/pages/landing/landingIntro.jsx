import React, { useState, useEffect } from 'react';
import {Row,Col} from 'react-bootstrap';
import {Wrapper} from '../../components/containers.jsx'
import {Header,SubHeader,FluidIcon} from '../../components/utilities.jsx'
import {IntroContent} from './introContent.jsx';
import {CSSTransition} from 'react-transition-group';
import Canteen from '../../images/canteen.jpg'
import Canteen2 from '../../images/canteen2.jpg'
import Icon from '../../images/foodIcon.svg'
import Watch from '../../images/stopwatch.svg'
import Click from '../../images/click-here.svg'
const IntroText = (props) => {
    return (
        <Wrapper mg="10px auto 10px auto">
            <Wrapper mg="0 0 20px 0">
                <SubHeader className="text-center" sizeMobile="1.75rem" sizeDesktop="2rem" color="var(--grey-color)">
                    How will this help?
                </SubHeader>
            </Wrapper>
            <Row>
                <Col xs={12} md={4} className="mb-4">
                    <IntroContent imgSrc={Icon}>
                        <Header sizeMobile="1.25rem" sizeDesktop="1.3rem">Good food, good life</Header>
                        <SubHeader sizeDesktop="1rem">Delicious food makes you brighter.</SubHeader>
                    </IntroContent>
                    
                </Col>
                <Col xs={12} md={4} className="mb-4"> 
                    <IntroContent imgSrc={Watch}>
                        <Header sizeMobile="1.25rem" sizeDesktop="1.3rem">Lightning Speed</Header>
                        <SubHeader sizeDesktop="1rem">Say goodbye to standing in queue.</SubHeader>
                    </IntroContent>
                </Col>
                <Col xs={12} md={4} className="mb-4">
                    <IntroContent imgSrc={Click}>
                        <Header sizeMobile="1.25rem" sizeDesktop="1.3rem">Simple</Header>
                        <SubHeader sizeDesktop="1rem">It's made for everyone!</SubHeader>
                    </IntroContent>
                    
                </Col>
                
            </Row>
            
        </Wrapper>
    
    )
}
export default IntroText;