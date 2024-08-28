import axios from 'axios'

const BASE_URL = `https://localhost:7149/api/Announcement/`
export const getAllAnnouncements = async()=>{
    const {data} =  await axios.get(BASE_URL + 'GetAllAnnouncements/');
    return data;
}

export const getAnnouncementById = async (Id) => {

    const {data} = await axios.get(BASE_URL + `GetAnnouncementById/${Id}`)
    return data;
}

export const createAnnouncement = async (announcement) =>{
    return await axios.post(BASE_URL + 'CreateAnnouncement/', announcement);
}
export const editAnnouncement = async (announcement) => {

    const {data} = await axios.put(BASE_URL + 'EditAnnouncement/', announcement)
    return data;
}
export const deleteAnnouncement = async (number) => {

    const {data} = await axios.delete(BASE_URL + `DeleteAnnouncement/${number}`)
    return data;
}

