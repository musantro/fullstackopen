import axios from "axios";

const baseUrl = 'http://localhost:3001/persons';
const getData = request => request.then(response => response.data)

const getAll = () => getData(axios.get(baseUrl))
const create = newObject => getData(axios.post(baseUrl, newObject))
const deletePerson = (id) => axios.delete(`${baseUrl}/${id}`)
const update = (id, changedPerson) => getData(axios.put(`${baseUrl}/${id}`, changedPerson))



export default {getAll, create, deletePerson, update}
