import React, {useState, useEffect} from "react";
import EntitiesMap from "./EntitiesMap.jsx";
import AddIcon from '@mui/icons-material/Add';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import EntitiesTable from "./EntitiesTable.jsx";
const Entities = ({EntityName}) =>{
    const [entities, setEntities] = useState([]);
    const [openCreate, setOpenCreate] = useState(false)

    useEffect(() => {
       EntitiesMap[EntityName].requests.getAll().then(as =>{
            setEntities(as)
        })
    },[]);

    return(
        <div style={{display:'flex', flexDirection:'column', width:'75%'}}>
            <IconButton size='medium' sx={{alignSelf: 'start' ,borderRadius: 3,border:3, borderColor:'white', marginBottom:'3%'}}  onClick={ (e)=> setOpenCreate(true)}>
                <AddIcon fontSize='large' sx={{color:'white'}} />
                <Typography color='white' fontSize='Large'>{EntitiesMap[EntityName].createLabel}</Typography>
            </IconButton>
            <EntitiesTable entities={entities} entityName={EntityName}></EntitiesTable>
            {openCreate && EntitiesMap[EntityName].createPage(setOpenCreate)}
        </div>
    )

}

export default Entities;