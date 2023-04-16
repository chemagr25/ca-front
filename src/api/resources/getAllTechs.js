
import apiResources from "../apiResources";


 const getAllTechs = async() => {

  try {
      const allTechs = await apiResources.get('/technicians/all',  {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })

    const services = allTechs
   
 return  services

  } catch (e)  {
    return e.response.status
  
  }
  
}

export default getAllTechs
