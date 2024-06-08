import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/'
})

export const getUsers = () => api.get('users')
export const getUserPosts = (userId: number) => api.get(`users/${userId}/posts`)
