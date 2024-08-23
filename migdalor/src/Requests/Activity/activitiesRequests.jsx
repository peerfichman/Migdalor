import axios from 'axios'

const BASE_URL = `https://localhost:7149/api/Activity/`
export const getAllActivities = async()=>{
    const {data} =  await axios.get(BASE_URL + 'GetAllActivities/');
    return data;
}

export const getActivityById = async (Id) => {

    const {data} = await axios.get(BASE_URL + `GetActivityById/${Id}`)
    return data;
}

export const createActivity = async (activity) =>{
    return await axios.post(BASE_URL + 'AddActivity/', activity);
}
export const editActivity = async (activity) => {

    const {data} = await axios.put(BASE_URL + 'EditActivity/', activity)
    return data;
}
export const deleteActivity = async (number) => {

    const {data} = await axios.delete(BASE_URL + `DeleteActivity/${number}`)
    return data;
}

