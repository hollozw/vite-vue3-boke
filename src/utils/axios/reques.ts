import axios from "axios"

const server = axios.create({
  baseURL: '/api',
  timeout: 10000
})

server.interceptors.request.use((config):any => {
  return config
})

server.interceptors.response.use((response):any=>{
  return response
})

export default server