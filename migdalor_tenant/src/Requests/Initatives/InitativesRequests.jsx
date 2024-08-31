import axios from "axios";

const BASE_URL = 'https://localhost:7149/'
export const GetAllInitiatives = async () => {

    const {data} = await axios.get(BASE_URL + 'api/Initiative/GetAllInitaitives')
    return data;
}
export const GetInitiativeById = async (id) => {

    const {data} = await axios.get(BASE_URL + `api/Initiative/GetInitiativeById/${id}`)
    return data;
}
export const GetParticipantsInInitiative = async (id) => {

    const {data} = await axios.get(BASE_URL + `api/Initiative/GetParticiapntsInInitiative/${id}`)
    return data;
}

export const GetInitiativeResidentParticipating = async (id) => {

    const {data} = await axios.get(`${BASE_URL}api/Initiative/GetInitiativeResidentParticipating/${id}`)
    return data;
}

export const RemoveFromInitiative = async (initiativeNumber, residentNumber) => {

    const {data} = await axios.delete(`${BASE_URL}api/Initiative/RemoveParticipantFromInitiative`,
        {
            headers: {
            },
            data: {
                initiativeNumber,
                residentNumber
            }
        }
    )
    return data;
}