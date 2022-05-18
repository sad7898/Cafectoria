import React, { useState, ReactNode } from "react"
import { Header, StyledInput, StyledText } from "../../components/utilities"
import { Wrapper } from "../../components/containers"
import { StyledButton } from "../../components/button"
import { Formik, Form } from "formik"
import { Form as StyleForm } from "react-bootstrap"

import Axios from "axios"
import { useNavigate } from "react-router-dom"
import useLoading from "../../contexts/loadingContext"
interface RegProps {
  secret: string
  children?: ReactNode
}
const Reg = ({ secret }: RegProps) => {
  const { setLoading } = useLoading()
  const [error, setError] = useState()
  const validateUser = (e: string) => {
    const re = /^[A-Z][a-z0-9_]+$/
    let error
    if (!e) error = "Required"
    else if (re.test(e)) {
      error = "Invalid Username"
    } else if (e.length < 6 || e.length > 12) {
      error = "Invalid Length"
    }
    return error
  }

  const validatePassword = (e: string) => {
    const re = /^[a-z0-9_]+$/
    let error
    if (!e) error = "Required"
    else if (!re.test(e)) {
      error = "Invalid Password"
    } else if (e.length < 6 || e.length > 12) {
      error = "Invalid Length"
    }
    return error
  }
  const validateEmail = (e: string) => {
    let error
    if (!e) {
      error = "Required"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)) {
      error = "Invalid email address"
    }
    return error
  }
  const navigate = useNavigate()
  return (
    <Wrapper>
      <Wrapper mg="0 0 20px 0">
        <Header color="var(--white-color)">Sign Up</Header>
      </Wrapper>
      <Formik
        initialValues={{ email: "", user: "", password: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setLoading(true)
          await Axios.post("https://cafetoria-backend.herokuapp.com/user/signup", {
            user: values.user,
            password: values.password,
            email: values.email,
            secret: secret,
          })
            .then((res) => {
              navigate("/login")
            })
            .catch((err) => {
              setError(err.response.data[Object.keys(err.response.data)[0]])
              setLoading(false)
            })
          setLoading(false)
          setSubmitting(false)
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form>
            <StyleForm.Group>
              <StyleForm.Label>
                <StyledText color="var(--white-color)">Username</StyledText>
              </StyleForm.Label>
              <StyledInput type="text" placeholder="Username" name="user" validate={validateUser} />
              <StyleForm.Text className="text-muted">
                Username must contain atleast 6 characters and not contain special character and not exceed 12.
              </StyleForm.Text>
              {errors.user && touched.user && <StyledText color="red">{errors.user}</StyledText>}
            </StyleForm.Group>
            <StyleForm.Group>
              <StyleForm.Label>
                <StyledText color="var(--white-color)">Password</StyledText>
              </StyleForm.Label>
              <StyledInput type="password" placeholder="Password" name="password" validate={validatePassword} />
              <StyleForm.Text className="text-muted">Password must contain atleast 6 characters and not exceed 12.</StyleForm.Text>
              {errors.password && touched.password && <StyledText color="red">{errors.password}</StyledText>}
            </StyleForm.Group>
            <StyleForm.Group controlId="email">
              <StyleForm.Label>
                <StyledText color="var(--white-color)">Email</StyledText>
              </StyleForm.Label>
              <StyledInput type="email" placeholder="someone@domain.com" name="email" validate={validateEmail} />
              {errors.email && touched.email && <StyledText color="red">{errors.email}</StyledText>}
            </StyleForm.Group>
            <StyledButton bg="var(--green-color)" type="submit" disabled={isSubmitting}>
              Submit
            </StyledButton>
          </Form>
        )}
      </Formik>
      <StyledText color="red">{error}</StyledText>
    </Wrapper>
  )
}
export default Reg
