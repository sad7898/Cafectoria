import { useEffect, useMemo, useState } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { DynamicBlock, EyeLevel, Scrollable, Wrapper } from "../../components/containers"
import withAuthGuard from "../../components/guards/withAuthGuard"
import { PostTable } from "../../components/postTable"
import { Crumb, Tab } from "../../components/tab/tab"
import { Header, SubHeader } from "../../components/utilities"
import { RootState } from "../../store/store"
import { PostProps } from "../post/post"

const Dashboard = () => {
  const user = useSelector((root: RootState) => root.auth)
  const [selectedCrumb, setSelectedCrumb] = useState<Crumb>()
  const createDashboardCrumb = (name: string, callback?: () => void): Crumb => {
    return {
      name,
      onSelected: (crumb) => {
        setSelectedCrumb(crumb)
        if (callback) callback()
      },
    }
  }
  const crumbs = useMemo(() => [createDashboardCrumb("Favorite Recipes"), createDashboardCrumb("Your Recipes")], [])
  useEffect(() => {
    setSelectedCrumb(crumbs[0])
  }, [crumbs])
  return (
    <Container>
      <EyeLevel>
        <DynamicBlock bg="white">
          {user && (
            <div>
              <Header sizeDesktop="1.5rem">{user.name}'s dashboard</Header>
              <SubHeader sizeDesktop="1.25rem">Role: {user.roles[0]}</SubHeader>
            </div>
          )}

          <Wrapper bg="#dedede" rborder="10px" pd="1rem 1rem 1rem 1rem" mg="1rem auto auto auto">
            {selectedCrumb && (
              <Wrapper>
                <Tab crumbs={crumbs} selectedCrumb={selectedCrumb} />
              </Wrapper>
            )}
            <Scrollable>
              <div>
                We're sorry. This page is still under construction
              </div>
              {/* <PostTable posts={dummyPosts}></PostTable> */}
            </Scrollable>
          </Wrapper>
        </DynamicBlock>
      </EyeLevel>
    </Container>
  )
}
export default withAuthGuard(Dashboard, "/login")
