import axios from "axios";

const baseUrl = 'http://localhost:3001/notes';
const getData = request => request.then(response => response.data)


const getAll = () => getData(axios.get(baseUrl))
const create = newObject => getData(axios.post(baseUrl, newObject))
const update = (id, changedNote) => getData(axios.put(`${baseUrl}/${id}`, changedNote))


export default {getAll, create, update}
