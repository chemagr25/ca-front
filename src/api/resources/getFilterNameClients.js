import apiResources from "../apiResources";

 const filterTechnicians = async (value) => {
    try {

        const filterTechnicians = await apiResources.get(`/technicians/search?query=${value}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return filterTechnicians

    } catch (e) {
        return console.log(e);

    }


}
 const filterClients = async (value) => {
    try {

        const filterTechnicians = await apiResources.get(`/clients/search?query=${value}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        return filterTechnicians

    } catch (e) {
        return console.log(e);

    }


}

export {filterClients, filterTechnicians}

