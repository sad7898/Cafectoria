import React from "react";
import { Wrapper } from "../../components/containers";
import { FluidIcon } from "../../components/utilities";
export const IntroContent = (props: any) => {
  return (
    <Wrapper>
      <div className="w-100 d-flex flex-row justify-content-center">
        <FluidIcon src={props.imgSrc} maxW="100px"></FluidIcon>
      </div>
      <div className="text-center">{props.children}</div>
    </Wrapper>
  );
};
