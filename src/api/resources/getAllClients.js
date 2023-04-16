
import apiResources from "../apiResources";


 const getAllClients = async() => {

  try {
      const allClients = await apiResources.get('/clients/all',  {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })

    const clients = allClients
   
 return  clients

  } catch (e)  {
    return e.response.status
  
  }
  
}

export default getAllClients
