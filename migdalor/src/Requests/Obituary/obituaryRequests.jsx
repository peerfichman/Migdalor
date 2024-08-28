import axios from 'axios'

const BASE_URL = `https://localhost:7149/api/Obituary/`
export const getAllObituaries = async()=>{
    const {data} =  await axios.get(BASE_URL + 'GetAllObituaries/');
    return data;
}

export const getObituaryById = async (Id) => {

    const {data} = await axios.get(BASE_URL + `GetObituaryById/${Id}`)
    return data;
}

export const createObituary = async (obituary) =>{
    return await axios.post(BASE_URL + 'AddObituary/', obituary);
}
export const editObituary = async (obituary) => {

    const {data} = await axios.put(BASE_URL + 'EditObituary/', obituary)
    return data;
}
export const deleteObituary = async (number) => {

    const {data} = await axios.delete(BASE_URL + `DeleteObituary/${number}`)
    return data;
}

