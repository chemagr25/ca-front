
import apiResources from "../apiResources";


 const getAllServices = async() => {

  try {
      const allServices = await apiResources.get('/services/all',  {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })

    const services = allServices
   
 return  services

  } catch (e)  {
    return e.response.status
  
  }
  
}

export default getAllServices

