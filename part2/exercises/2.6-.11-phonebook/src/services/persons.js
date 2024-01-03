import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject);
  console.log(newObject, 'going to place');

  return request.then(response => response.data).catch(error => {
    console.error('Error in create:', error);
    throw error; // Rethrow the error to propagate it to the calling code
  });
};

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { 
    getAll, 
    create, 
    update,
    remove 
}