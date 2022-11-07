import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: {Authorization: token},
  }

  console.log(token)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const updateLikes = (id, newObject) => {
  console.log(id, 'is here')
  console.log(newObject, 'works!')
 const request = axios.put(`${baseUrl}/${id}`, newObject)
 return request.then(response => response.data)
}

const remove = async (id) => {

  const config = {
    headers: {Authorization: token},
  }

  console.log(token)

  const response = await axios.delete(`${baseUrl}/${id}`, config)

  return response.data
}

export default { getAll, setToken, create, updateLikes, remove }