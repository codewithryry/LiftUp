import axios from 'axios'

const API_URL = process.env.VUE_APP_API_URL || '/api'

const fetchForumPosts = async (filter = 'all') => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/forum/posts?filter=${filter}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const fetchUserPosts = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/forum/posts/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const fetchPostById = async (postId) => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/forum/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const createForumPost = async (postData) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(`${API_URL}/forum/posts`, postData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const updateForumPost = async ({ postId, postData }) => {
  const token = localStorage.getItem('token')
  const response = await axios.put(`${API_URL}/forum/posts/${postId}`, postData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const deleteForumPost = async (postId) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(`${API_URL}/forum/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

const addComment = async ({ postId, content, isAnonymous }) => {
  const token = localStorage.getItem('token')
  const response = await axios.post(
    `${API_URL}/forum/posts/${postId}/comments`,
    { content, isAnonymous },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

const deleteComment = async ({ postId, commentId }) => {
  const token = localStorage.getItem('token')
  const response = await axios.delete(
    `${API_URL}/forum/posts/${postId}/comments/${commentId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  )
  return response.data
}

const fetchUserStats = async () => {
  const token = localStorage.getItem('token')
  const response = await axios.get(`${API_URL}/forum/stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export {
  fetchForumPosts,
  fetchUserPosts,
  fetchPostById,
  createForumPost,
  updateForumPost,
  deleteForumPost,
  addComment,
  deleteComment,
  fetchUserStats
}