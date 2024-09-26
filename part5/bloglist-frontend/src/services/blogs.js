import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  console.log('setting token ', newToken)
  token = `Bearer ${newToken}`
}

const createBlog = async newObject => {
  const config = {
    headers: { Authorization: token},

  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateLikes = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  return response.data
}

const deleteBlog = async (id) => {
  console.log(id, "The id being sent")
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

export default { getAll, setToken, createBlog, updateLikes, deleteBlog }