import React from 'react';
import { Grid, Paper, Typography } from '@mui/material';


const ActivitiesRegistration =()=>{

    const items = [
        {text: ':שם הפעילות', subtext: 'סיור במפעלי ים המלח' },
        {text: ':תאריך', subtext: '04/09/2024' },
        {text: ':שעות', subtext: '8:30-16:00' },
        {text: ':מקומות שנותרו', subtext: '13' },
        {text: ':תחומי עניין', subtext: 'ארץ ישראל, טיולים' },
        {text: ':תיאור הפעילות ', subtext: 'נצא לסיור במפעלי ים המלח יחד עם מורה הדרך אבשלום יונתן' }
      ]

  return (
    <Grid container spacing={2} justifyContent="center">
      {items1.map((item, index) => (
        <Grid item xs={4} key={index}>
          <Paper 
            elevation={3} 
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'flex', 
              padding: 16 ,
              color:'#38588e'
            }}
          >
          <div style={{ display: 'flex', alignItems: 'flex', direction: 'rtl'}}>
            <Typography variant="h6" className="welcom-header" style={{ marginTop: 8,color:'#000',fontWeight: 'bold',fontSize: 15}}>
              {item.text}
            </Typography>
            <Typography variant="h6" style={{ color: '#000',fontSize: 15}}>
              {item.subtext}
            </Typography>
          </div>
          </Paper>
        </Grid>
      ))} 
      

    </Grid>
  );
}

export default ActivitiesRegistration;
