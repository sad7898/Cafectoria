import Axios from "axios"
export const client = Axios.create({
  baseURL: process.env.REACT_APP_API_CLIENT,
})
client.interceptors.request.use((confg) => {
  const token = localStorage.getItem("token")
  if (token) {
    confg.headers["Authorization"] = `Bearer ${token}`
  }
  return confg
})
