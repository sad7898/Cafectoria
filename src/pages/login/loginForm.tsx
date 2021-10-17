import React, { useState, useContext } from "react";
import { Form, Formik } from "formik";

import { InputField, StyledText, Header } from "../../components/utilities.jsx";
import { Wrapper } from "../../components/containers.jsx";
import { StyledButton } from "../../components/button.jsx";
import { useHistory } from "react-router-dom";
import { setCurrentUser } from "../../store/actions/userActions.js";
import { useDispatch } from "react-redux";
import Axios from "axios";
import useLoading from "../../contexts/loadingContext.jsx";
type LoginFormError = {
  user: string;
  password: string;
};
const LoginForm = () => {
  const dispatch = useDispatch();
  const { setLoading } = useLoading();
  const [error, setError] = useState("");
  const history = useHistory();
  return (
    <Wrapper maxw="600" bg="var(--grey-color)">
      <Wrapper mg="0 0 20px 0">
        <Header color="var(--white-color)">Sign In</Header>
      </Wrapper>
      <Formik
        initialValues={{
          user: "",
          password: "",
        }}
        validate={(values) => {
          const errors = {} as LoginFormError;
          if (!values.user) errors.user = "Required";
          if (!values.password) errors.password = "Required";
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true);
          await Axios.post(
            "https://cafetoria-backend.herokuapp.com/user/login",
            { user: values.user, password: values.password },
            { withCredentials: true }
          )
            .then((res) => {
              setLoading(false);
              dispatch(setCurrentUser(values.user));
              history.push("/");
            })
            .catch((err) => {
              setLoading(false);
              setError(err.response.data[Object.keys(err.response.data)[0]]);
            });
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              type="text"
              name="user"
              placeholder="Username"
              label="Username"
            ></InputField>
            <InputField
              type="password"
              name="password"
              placeholder="Password"
              label="Password"
            ></InputField>
            <div className="mt-2 mb-2">
              <StyledText color="red">{error}</StyledText>
            </div>
            <StyledButton
              bg="var(--green-color)"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </StyledButton>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};
export default LoginForm;
