import React from "react";
import { Wrapper } from "../../components/containers";
import { StyledButton } from "../../components/button";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Header } from "../../components/utilities";
const Entry = () => {
  let history = useHistory();
  let { path } = useRouteMatch();
  return (
    <Wrapper>
      <Header
        className="text-center py-2"
        sizeDesktop="2rem"
        color="var(--white-color)"
      >
        Select an option
      </Header>
      <Wrapper className="d-flex flex-column">
        <StyledButton
          bg="var(--green-color)"
          className="mb-2"
          onClick={() => history.push(`${path}/user`)}
        >
          I want to access Cafeteria.
        </StyledButton>
        <StyledButton
          bg="var(--green-color)"
          className="mb-2"
          onClick={() => history.push(`${path}/owner`)}
        >
          I want to own a Cafeteria.
        </StyledButton>
      </Wrapper>
    </Wrapper>
  );
};
export default Entry;
