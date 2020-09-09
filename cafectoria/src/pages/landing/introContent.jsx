import React, { useState, useEffect } from 'react';
import {Wrapper} from '../../components/containers.jsx';
import {FluidIcon,SubHeader} from '../../components/utilities.jsx';
export const IntroContent = (props) => {
    return (
        <Wrapper>
            <div className="w-100 d-flex flex-row justify-content-center">
                <FluidIcon src={props.imgSrc} maxW="100px"></FluidIcon>
            </div>
                <div className="text-center">{props.children}</div>
        </Wrapper>
    )
}