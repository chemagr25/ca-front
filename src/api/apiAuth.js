import axios from 'axios';

const apiAuth = axios.create( {
    baseURL: 'https://compuactual.azurewebsites.net/auth'
})


export default apiAuth