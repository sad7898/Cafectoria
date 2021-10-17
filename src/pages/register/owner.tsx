import React, { useState } from "react";
import { StyledInput } from "../../components/utilities";

import { Form } from "react-bootstrap";
import Reg from "./regForm";
import { StyledText } from "../../components/utilities";

const OwnerReg = () => {
  const onChangeSecret = (e: any) => {
    setSecret(e.target.value);
  };
  const [Secret, setSecret] = useState("");
  return (
    <Reg secret={Secret}>
      <Form.Group controlId="secret">
        <Form.Label>
          <StyledText color="var(--white-color)">Secret</StyledText>
        </Form.Label>
        <StyledInput
          type="password"
          placeholder="Enter 6 digits secret"
          name="secret"
          value={Secret}
          onChange={onChangeSecret}
          required
        />
        <Form.Text className="text-muted">Contact admin for secret.</Form.Text>
        <StyledText color="red">This section is under construction.</StyledText>
      </Form.Group>
    </Reg>
  );
};
export default OwnerReg;
