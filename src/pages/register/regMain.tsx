import React from "react"
import { Wrapper, DecoratedBlock, EyeLevel } from "../../components/containers"
import { Routes, Route } from "react-router-dom"

import Reg from "./regForm"

const Register = () => {
  return (
    <EyeLevel>
      <Wrapper className="h-100 w-100 d-flex flex-column align-items-center  px-3">
        <DecoratedBlock shadow maxw="600">
          <Reg secret={""} />
        </DecoratedBlock>
      </Wrapper>
    </EyeLevel>
  )
}
export default Register
