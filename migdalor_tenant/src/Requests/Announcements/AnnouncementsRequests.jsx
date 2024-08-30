import axios from "axios";

const BASE_URL = 'https://localhost:7149/'
export const getAllAnnouncements = async () => {

    const {data} = await axios.get(BASE_URL + 'api/Announcement/GetAllAnnouncements')
    return data;
}