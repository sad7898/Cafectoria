import Axios, { AxiosError } from "axios"
import { AuthPayload, AuthStatus } from "./store/actions/userActions"
import { initialAuthState } from "./store/reducers/authReducer"
export const client = Axios.create({
  baseURL: process.env.REACT_APP_API_CLIENT || "http://localhost:8080",
})
client.interceptors.request.use((confg) => {
  const token = localStorage.getItem("token")
  if (token) {
    confg.headers["Authorization"] = `Bearer ${token}`
  }
  return confg
})
client.interceptors.response.use(undefined, (error: AxiosError) => {
  if (error.response?.status === 401) {
    localStorage.removeItem("token")
  }
  return Promise.reject(error)
})
