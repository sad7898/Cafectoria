import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { useHistory } from "react-router-dom";
import wallpaper from "../../images/mainWall.jpg";
import { BSWrapper, Wrapper } from "../../components/containers";
import { StyledButton } from "../../components/button";
import IntroText from "./landingIntro";
import { Header, SubHeader } from "../../components/utilities";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
const Main = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const [inProp, setInProp] = useState(false);
  const history = useHistory();
  useEffect(() => {
    setInProp(true);
  }, []);
  return (
    <>
      <BSWrapper
        className="d-flex flex-row justify-content-center"
        minh="320"
        mg="0 0 -10px 0"
        bg={`url(${wallpaper})`}
        fluid
      >
        <CSSTransition in={inProp} timeout={500} classNames="fade-down">
          <Wrapper className="w-100 d-flex flex-column align-items-center justify-content-center">
            <Header color="var(--white-color)">CAFETORIA</Header>
            <hr></hr>
            <SubHeader color="var(--white-color)">Make your recipe</SubHeader>
          </Wrapper>
        </CSSTransition>
      </BSWrapper>
      <BSWrapper>
        <div className="d-flex flex-row justify-content-between w-100">
          <StyledButton bg="var(--white-color)" size="lg">
            Explore more
          </StyledButton>
          {auth.isLogged ? (
            <StyledButton
              bg="var(--white-color)"
              size="lg"
              onClick={() => history.push("/dashboard")}
            >
              Dashboard
            </StyledButton>
          ) : (
            <StyledButton
              bg="var(--white-color)"
              size="lg"
              onClick={() => history.push("/register")}
            >
              Join Us
            </StyledButton>
          )}
          <StyledButton bg="var(--white-color)" size="lg">
            Some button
          </StyledButton>
        </div>
        <IntroText />
      </BSWrapper>
    </>
  );
};
export default Main;
