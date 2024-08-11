// src/components/IconGrid.js
import React from 'react';
import '../CSS/Home.css';
import { Grid, Paper, Typography } from '@mui/material';
import { 
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  Event as EventIcon,
  ContactPhone as ContactPhoneIcon,
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Announcement as AnnouncementIcon,
  Map as MapIcon,
  LocalActivity as LocalActivityIcon,
  WbSunny as WbSunnyIcon 
} from '@mui/icons-material';
import { Link } from 'react-router-dom';


const items = [
  { icon: <PersonIcon style={{ fontSize: 40 }} />, text: 'אזור', subtext: 'אישי' },
  { icon: <WbSunnyIcon style={{ fontSize: 40 }} />, text: 'נוהל', subtext: 'בוקר טוב', link: <Link to="/good-morning-protocol">לך לנוהל בוקר טוב</Link> },
  { icon: <NotificationsIcon style={{ fontSize: 40 }} />, text: 'הודעות', subtext: 'שוטפות' },
  { icon: <LocalActivityIcon style={{ fontSize: 40 }} />, text: 'רישום', subtext: 'לפעילויות' },
  { icon: <EventIcon style={{ fontSize: 40 }} />, text: 'צור', subtext: 'אירוע' },
  { icon: <ContactPhoneIcon style={{ fontSize: 40 }} />, text: 'אנשי', subtext: 'קשר' },
  { icon: <AccessTimeIcon style={{ fontSize: 40 }} />, text: 'שעות', subtext: 'פתיחה' },
  { icon: <GroupIcon style={{ fontSize: 40 }} />, text: 'ועד', subtext: 'דיירים' },
  { icon: <AnnouncementIcon style={{ fontSize: 40 }} />, text: 'הודעות', subtext: 'אבל' },
  { icon: <MapIcon style={{ fontSize: 40 }} />, text: 'מפת', subtext: 'הבית' }
];

const IconGrid = () => {    
  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
      {items.map((item, index) => (
        <Grid item xs={4} key={index}>
          <Paper 
            elevation={3} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              padding: 16 ,
              color:'#38588e'
            }}
          >
            {item.icon}
            <Typography variant="h6" className="welcom-header" style={{ marginTop: 8,color:'#000',fontWeight: 'bold',fontSize: 22, fontFamily: 'Arial'}}>
              {item.text}
            </Typography>
            <Typography variant="h6" style={{ color: '#000' ,fontWeight: 'bold',fontSize: 22}}>
              {item.subtext}
            </Typography>
          </Paper>
        </Grid>
      ))} 
      

    </Grid>
    </div>
    
  );
}

export default IconGrid;
