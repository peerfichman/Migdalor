import axios from 'axios'

const BASE_URL = `https://localhost:7149/api/Resident/`
export const getAllTenants = async()=>{
    const {data} =  await axios.get(BASE_URL + 'GetAllResidents/');
    return data;
}

export const getTenantById = async (Id) => {

    const {data} = await axios.get(BASE_URL + `GetResidentById/${Id}`)
    return data;
}

export const createTenant = async (tenant) =>{
    return await axios.post(BASE_URL + 'AddResident/', tenant);
}
export const editTenant = async (tenant) => {

    const {data} = await axios.put(BASE_URL + 'EditResident/', tenant)
    return data;
}
export const deleteTenant = async (number) => {

    const {data} = await axios.delete(BASE_URL + `DeleteResident/${number}`)
    return data;
}

