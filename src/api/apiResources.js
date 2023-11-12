import axios from 'axios';

const apiResources = axios.create( {
    baseURL: 'https://guero-pendejo.azurewebsites.net/api'
})


export default apiResources