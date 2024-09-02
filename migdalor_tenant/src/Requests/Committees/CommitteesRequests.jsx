import axios from "axios";

const BASE_URL = 'https://localhost:7149/'
export const getAllCommittees = async () => {

    const {data} = await axios.get(BASE_URL + 'api/Committee/GetAllCommittees')
    return data.map(({committee, residentManager})=> {
        return {...committee,residentManager : residentManager}
    })
}