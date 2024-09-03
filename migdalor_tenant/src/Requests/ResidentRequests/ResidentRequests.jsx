import axios from "axios";

const BASE_URL = 'https://localhost:7149/';

export const EditResidentDetails = async (residentDetails)=>{
    await   axios.put(BASE_URL+'api/Resident/EditResident', residentDetails);
}

export const GetAllResidents = async ()=>{
    const {data} =   await axios.get(BASE_URL+'api/Resident/GetAllResidents');
    return data;
}

export const ForgotPassword =async (userId)=>{
    const response = await axios.post(BASE_URL +'api/Resident/forgotpassword', {residentID: userId})
        .catch((badResponse)=> badResponse)
    return response
}