import Axios from "axios"
export const client = Axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:8080" : process.env.API_URL,
})
