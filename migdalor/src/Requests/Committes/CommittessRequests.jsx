import axios from 'axios'

const BASE_URL = `https://localhost:7149/api/Committee/`
export const getAllCommittees = async()=>{
    const {data} =  await axios.get(BASE_URL + 'GetAllCommittees/');
    return   data.map(({committee, residentManager}) => { return{...committee, residentManager : residentManager}});
}

export const getCommitteeById= async (Id) => {

    const {data} = await axios.get(BASE_URL + `GetCommitteeById//${Id}`)
    const {committee, residentManager} = data
    return {...committee, ...residentManager};}

export const createCommittee = async (committee) =>{
    return await axios.post(BASE_URL + 'CreateCommittee/', committee);
}
export const editCommittee = async (committee) => {

    const {data} = await axios.put(BASE_URL + 'EditCommittee/', committee)
    return data;
}
export const deleteCommittee = async (id) => {

    const {data} = await axios.delete(BASE_URL + `DeleteCommittee/${id}`)
    return data;
}

