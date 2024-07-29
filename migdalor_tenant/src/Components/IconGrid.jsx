// src/components/IconGrid.js
import React from 'react';
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

const items = [
  { icon: <PersonIcon />, text: 'אזור', subtext: 'אישי' },
  { icon: <WbSunnyIcon />, text: 'נוהל', subtext: 'בוקר טוב' },
  { icon: <NotificationsIcon />, text: 'הודעות', subtext: 'שוטפות' },
  { icon: <LocalActivityIcon  />, text: 'רישום', subtext: 'לפעילויות' },
  { icon: <EventIcon />, text: 'צור', subtext: 'אירוע' },
  { icon: <ContactPhoneIcon />, text: 'אנשי', subtext: 'קשר' },
  { icon: <AccessTimeIcon />, text: 'שעות', subtext: 'פתיחה' },
  { icon: <GroupIcon />, text: 'ועד', subtext: 'דיירים' },
  { icon: <AnnouncementIcon />, text: 'הודעות', subtext: 'אבל' },
  { icon: <MapIcon />, text: 'מפת', subtext: 'הבית' }
];

const IconGrid = () => {
  return (
    <Grid container spacing={2} justifyContent="center">
      {items.map((item, index) => (
        <Grid item xs={4} key={index}>
          <Paper 
            elevation={3} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              padding: 16 
            }}
          >
            {item.icon}
            <Typography variant="h6" style={{ marginTop: 8 }}>
              {item.text}
            </Typography>
            <Typography variant="h6">
              {item.subtext}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default IconGrid;
