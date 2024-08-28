import axios from 'axios'

const BASE_URL = `https://localhost:7149/api/Department/`
export const getAllDepartments = async()=>{
    const {data} =  await axios.get(BASE_URL + 'GetAllDepartments/');
    return data;
}

export const getDepartmentById = async (Id) => {

    const {data} = await axios.get(BASE_URL + `GetDepartmentById/${Id}`)
    return data;
}

export const createDepartment = async (activity) =>{
    return await axios.post(BASE_URL + 'AddDepartment/', activity);
}
export const editDepartment = async (activity) => {

    const {data} = await axios.put(BASE_URL + 'EditDepartment/', activity)
    return data;
}
export const deleteDepartment = async (number) => {

    const {data} = await axios.delete(BASE_URL + `DeleteDepartment/${number}`)
    return data;
}

