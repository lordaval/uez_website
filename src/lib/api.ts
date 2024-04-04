import axios from "axios"

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333/api"

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
})

export default api
