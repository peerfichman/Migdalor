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

export const JoinInitiative = async (initiativeNumber, residentNumber) => {

    const {data} = await axios.post(`${BASE_URL}api/Initiative/AddParticipantToInitiative/`,
        {
            initiativeNumber,
            residentNumber
        })
    return data;
}

export const CreatInitiative = async (initiative) => {
    const {data} =  await axios.post(BASE_URL + 'api/Initiative/AddInitiative', initiative)
    return data;
}

export const EditInitiative = async (initative) => {

    const response = await axios.put(BASE_URL +'api/Initiative/EditInitiative', initative)
    return response;

}

export const DeleteInitiative = async (initiativeNumber) => {
    const response = await axios.delete(BASE_URL + 'api/Initiative/DeleteInitiative/' + initiativeNumber);
    return response;
}