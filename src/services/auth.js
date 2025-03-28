import axios from 'axios'
import router from '@/router'

const API_URL = process.env.VUE_APP_API_URL || '/api'

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/register`, userData)
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('token', response.data.token)
  }
  
  return response.data
}

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/auth/login`, userData)
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data.user))
    localStorage.setItem('token', response.data.token)
  }
  
  return response.data
}

const logout = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  router.push('/login')
}

const updateProfile = async (userData) => {
  const token = localStorage.getItem('token')
  const response = await axios.put(`${API_URL}/users/profile`, userData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  
  return response.data
}

export default {
  register,
  login,
  logout,
  updateProfile
}