import React from "react";
import LoginForm from "./loginForm";
import { DecoratedBlock, Wrapper, EyeLevel } from "../../components/containers";
const Login = () => {
  return (
    <EyeLevel>
      <Wrapper className="w-100 d-flex flex-row justify-content-center pb-4 px-3">
        <DecoratedBlock maxw="600" shadow>
          <LoginForm />
        </DecoratedBlock>
      </Wrapper>
    </EyeLevel>
  );
};

export default Login;
