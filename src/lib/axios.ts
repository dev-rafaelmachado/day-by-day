import axios from 'axios'

const BaseApi = axios.create({
  baseURL: 'http://192.168.1.11:3000/api/',
})

export default BaseApi
