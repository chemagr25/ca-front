import apiResources from "../apiResources";

 const filterTechnicians = async (value) => {
    try {

        const filterTechnicianss = await apiResources.get(`/technicians/autocomplete?query=${value}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
console.log(filterTechnicianss)
        return filterTechnicianss

    } catch (e) {
        return console.log(e);

    }


}
 const filterClients = async (value) => {
    try {

        const filterTechnicians = await apiResources.get(`/clients/autocomplete?query=${value}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })

        console.log(filterTechnicians)
        return filterTechnicians

    } catch (e) {
        return console.log(e);

    }


}

export {filterClients, filterTechnicians}

