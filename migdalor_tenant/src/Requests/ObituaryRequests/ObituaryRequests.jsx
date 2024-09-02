import axios from "axios";

const BASE_URL = 'https://localhost:7149/'

export const GetAllObituaries = async () => {
    const {data} = await axios.get(BASE_URL+ 'api/Obituary/GetAllObituaries')
    return data;
}