import axios from 'axios';

const apiAuth = axios.create( {
    baseURL: 'https://guero-pendejo.azurewebsites.net/auth'
})


export default apiAuth