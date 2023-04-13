import axios from 'axios';

const apiResources = axios.create( {
    baseURL: 'https://compuactual.azurewebsites.net/api'
})


export default apiResources