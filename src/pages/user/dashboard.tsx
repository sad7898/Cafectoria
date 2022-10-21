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
const dummyPosts: PostProps[] = [
  {
    _id: "634e9f7d0bc228c4c54f2b02",
    topic: "amognus",
    author: [{ _id: "62c17b9fba9d107ea620d76f", name: "demouser99" }],
    tags: ["fruits", "veggie"],
  },
  {
    _id: "634ea3050bc228c4c54f2b16",
    topic: "awoooooooooooooooooooooooooga",
    author: [{ _id: "62c17b9fba9d107ea620d76f", name: "demouser99" }],
    tags: ["fast-food"],
  },
  {
    _id: "629b3a1fe077d29cee724d6b",
    topic: "Rustic Granite Table",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Veggie", "Fats"],
  },
  {
    _id: "629b3a1fe077d29cee724d7f",
    topic: "Unbranded Soft Shirt",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Carbohydrates"],
  },
  {
    _id: "629b3a1fe077d29cee724d7a",
    topic: "Modern Frozen Shoes",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Carbohydrates"],
  },
  {
    _id: "629b3a1fe077d29cee724d6d",
    topic: "Handcrafted Bronze Tuna",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Carbohydrates"],
  },
  {
    _id: "629b3a1fe077d29cee724d76",
    topic: "Unbranded Fresh Tuna",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Meat", "Fats"],
  },
  {
    _id: "629b3a1fe077d29cee724d6f",
    topic: "Handmade Concrete Gloves",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Veggie", "Carbohydrates"],
  },
  {
    _id: "629b3a1fe077d29cee724d77",
    topic: "Unbranded Cotton Computer",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Meat", "Veggie", "Fats"],
  },
  {
    _id: "629b3a1fe077d29cee724d6e",
    topic: "Unbranded Wooden Shoes",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Meat", "Fats", "Carbohydrates"],
  },
  {
    _id: "629b3a1fe077d29cee72426e",
    topic: "Unbranded Wooden Shoes",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Meat", "Fats", "Carbohydrates"],
  },
  {
    _id: "629b3a1fe077d29cee72436e",
    topic: "Unbranded Wooden Shoes",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Meat", "Fats", "Carbohydrates"],
  },
  {
    _id: "629b3a1fe077d293ee724d6e",
    topic: "Unbranded Wooden Shoes",
    author: [{ _id: "6287658491a854c35dcdc069", name: "siradhee" }],
    tags: ["Meat", "Fats", "Carbohydrates"],
  },
]
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
              <PostTable posts={dummyPosts}></PostTable>
            </Scrollable>
          </Wrapper>
        </DynamicBlock>
      </EyeLevel>
    </Container>
  )
}
export default withAuthGuard(Dashboard, "/login")
