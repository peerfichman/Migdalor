import React, {useState, useEffect} from "react";
import {getAllActivities} from "../Requests/Activity/activitiesRequests.jsx";
import ActivityTable from "./ActivityTable.jsx";
import CreateActivity from "./CreateActivity.jsx";
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LinearProgress from '@mui/material/LinearProgress';
const Activities = () =>{
    const [activities, setActivities] = useState([]);
    const [openCreate, setOpenCreate] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getAllActivities().then(as =>{
            setActivities(as)
        })
    });

    return(
        <div style={{display:'flex', flexDirection:'column', width:'75%'}}>
            <IconButton size='medium' sx={{alignSelf: 'start' ,borderRadius: 3,border:3, borderColor:'white', marginBottom:'3%'}}  onClick={ (e)=> setOpenCreate(true)}>
                <AddIcon fontSize='large' sx={{color:'white'}} />
                <Typography color='white' fontSize='Large'>צור פעילות</Typography>
            </IconButton>
            {loading? <LinearProgress sx={{width:"75%", alignSelf:'center', marginTop:"5%", marginBottom:"5%"}}/> :  <ActivityTable activities={activities}/>}
            {openCreate && <CreateActivity isEdit={false} activityNumber={null} setModalOpen={setOpenCreate}/>}
        </div>
    )

}

export default Activities;