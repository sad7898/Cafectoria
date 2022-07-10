import React, { useState } from "react"
import { Form, Formik } from "formik"

import { InputField, StyledText, Header } from "../../components/utilities"
import { Wrapper } from "../../components/containers"
import { StyledButton } from "../../components/button"
import { AuthPayload, AuthStatus, setCurrentUser } from "../../store/actions/userActions"
import { useDispatch } from "react-redux"
import { client } from "../../axiosClient"
import useLoading from "../../contexts/loadingContext"
import { useNavigate } from "react-router-dom"
type LoginFormError = {
  user: string
  password: string
}
export interface SignInResponse {
  token: string
  user: AuthPayload
}
const LoginForm = () => {
  const dispatch = useDispatch()
  const { setLoading } = useLoading()
  const [error, setError] = useState("")
  const navigate = useNavigate()
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
          const errors = {} as LoginFormError
          if (!values.user) errors.user = "Required"
          if (!values.password) errors.password = "Required"
          return errors
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true)
          await client
            .post<SignInResponse>("/user/login", { userId: values.user, password: values.password })
            .then(({ data }) => {
              const { user } = data
              localStorage.setItem("token", data.token)
              setLoading(false)
              dispatch(setCurrentUser({ name: user.name, email: user.email, roles: user.roles, status: AuthStatus.AUTH }))
              navigate("/")
            })
            .catch((err) => {
              setLoading(false)
              setError(err.response.data[Object.keys(err.response.data)[0]])
            })
          setSubmitting(false)
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField type="text" name="user" placeholder="Username" label="Username"></InputField>
            <InputField type="password" name="password" placeholder="Password" label="Password"></InputField>
            <div className="mt-2 mb-2">
              <StyledText color="red">{error}</StyledText>
            </div>
            <StyledButton bg="var(--green-color)" type="submit" disabled={isSubmitting}>
              Login
            </StyledButton>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}
export default LoginForm
