



import apiResources from "../apiResources";


 const getAllServices = async() => {

  try {
      const allServices = await apiResources.get('/services/all',  {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    })

    const {data, status } = allServices
    const services = {
      data,
      status
    }
 return  services

  } catch (e)  {
    return e.response.status
  
  }
  
}

export default getAllServices

