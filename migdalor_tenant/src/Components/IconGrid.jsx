import React from 'react';
import { useNavigate } from 'react-router-dom';
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
import AddBoxIcon from '@mui/icons-material/AddBox';


const items = [
  { icon: <PersonIcon style={{  fontSize: 40 }} />, text: 'אזור', subtext: 'אישי', route: '/profile' },
  { icon: <WbSunnyIcon style={{ fontSize: 40 }} />, text: 'נוהל', subtext: 'בוקר טוב', route: '/goodMorningProtocol' },
  { icon: <NotificationsIcon style={{ fontSize: 40 }} />, text: 'הודעות', subtext: 'שוטפות', route: '/messages' },
  { icon: <EventIcon style={{ fontSize: 40 }} />, text: 'יומן', subtext: 'אירועים', route: '/activitiesRegistration' },
  { icon: <AddBoxIcon style={{ fontSize: 40 }} />, text: 'צור', subtext: 'יוזמה', route: '/creatingInitiative' },
  { icon: <ContactPhoneIcon style={{ fontSize: 40 }} />, text: 'אנשי', subtext: 'קשר', route: '/contacts' },
  { icon: <AccessTimeIcon style={{ fontSize: 40 }} />, text: 'שעות', subtext: 'פתיחה', route: '/openingHours' },
  { icon: <GroupIcon style={{ fontSize: 40 }} />, text: 'ועד', subtext: 'דיירים', route: '/tenantCommittee' },
  { icon: <AnnouncementIcon style={{ fontSize: 40 }} />, text: 'מודעות', subtext: 'אבל', route: '/obituaries' },
  // { icon: <MapIcon style={{ fontSize: 40 }} />, text: 'מפת', subtext: 'הבית', route: '/' }
];

const IconGrid = () => {
  const navigate = useNavigate();
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)'; //
  }

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'scale(1)'; //
  }

  const handleItemClick = (route) => {
    if (route) {
      navigate(route);
    }
  }

  return (
    <div>
      <Grid container spacing={2} justifyContent="center">
      {items.map((item, index) => (
        <Grid item xs={4} key={index}>
          <Paper 
            elevation={6}
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              padding: 16,
              color: '#38588e',
              cursor: item.route ? 'pointer' : 'default'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleItemClick(item.route)

          }
          >
            {item.icon}
            <Typography variant="h6" className="welcom-header" style={{ marginTop: 8, color: '#000', fontWeight: 'bold', fontSize: 22 }}>
              {item.text}
            </Typography>
            <Typography variant="h6" style={{ color: '#000', fontWeight: 'bold', fontSize: 22 }}>
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
