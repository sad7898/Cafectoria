export interface NavbarItem {
  name: string
  path: string
  shouldBeAuth?: boolean
}
export const data: NavbarItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Forum",
    path: "/forum/main",
  },
  {
    name: "Dashboard",
    path: "/user/dashboard",
    shouldBeAuth: true,
  },
  {
    name: "About",
    path: "/about",
  },
  {
    name: "Contact",
    path: "/contact",
  },
]
