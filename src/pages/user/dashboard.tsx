import React, { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { client } from "../../axiosClient"
import { DynamicBlock, EyeLevel, Wrapper } from "../../components/containers"
import withAuthGuard from "../../components/guards/withAuthGuard"
import { Header, SubHeader } from "../../components/utilities"
import { AuthPayload } from "../../store/actions/userActions"
import { RootState } from "../../store/store"
const Dashboard = () => {
  const [profile, setProfile] = useState<AuthPayload>()
  const user = useSelector((root: RootState) => root.auth)
  useEffect(() => {
    setProfile(user)
  }, [user])
  return (
    <Container>
      <EyeLevel>
        <DynamicBlock bg="white">
          {profile && (
            <div>
              <Header sizeDesktop="1.5rem">{profile.name}'s dashboard</Header>
              <SubHeader sizeDesktop="1.25rem">Role: {profile.roles[0]}</SubHeader>
              <SubHeader sizeDesktop="1.25rem">Email: {profile.email}</SubHeader>
            </div>
          )}
          <Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
            <SubHeader sizeDesktop="1.25rem">Favorite Recipes</SubHeader>
          </Wrapper>
        </DynamicBlock>
      </EyeLevel>
    </Container>
  )
}
export default withAuthGuard(Dashboard, "/login")
