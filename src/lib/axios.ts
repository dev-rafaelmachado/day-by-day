import axios from 'axios'

const BaseApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
})

export default BaseApi
