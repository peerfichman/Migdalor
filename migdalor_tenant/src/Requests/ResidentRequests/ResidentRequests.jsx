import axios from "axios";

const BASE_URL = 'https://localhost:7149/';

export const EditResidentDetails = async (residentDetails)=>{
    await   axios.put(BASE_URL+'api/Resident/EditResident', residentDetails);
}