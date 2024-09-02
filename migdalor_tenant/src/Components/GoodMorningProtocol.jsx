import React, {useState, useEffect, useContext} from 'react';
import {Button, Typography, Box, CircularProgress, Container} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import moment from 'moment';
// Assuming you have a UserContext that provides userId
import {UserContext} from '../Auth/Auth.jsx';
import axios from "axios";
import {styled} from "@mui/system";
import theme from "../Theme/Theme.jsx";
import BackButton from "./BackButton.jsx";
import ArrowBackIcon from "@mui/icons-material/ArrowBack.js";
import IconButton from "@mui/material/IconButton";

const StyledBox = styled('Box')({
    display: 'flex',
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    width: '75%',
    height: '75%',
    borderRadius: 20

});


const CheckInPage = () => {
    const {user} = useContext(UserContext); // Retrieve the user ID from context
    const [isCheckedIn, setIsCheckedIn] = useState(null); // To track check-in status
    const [loading, setLoading] = useState(true); // To track loading state

    const theme = useTheme();


    // Effect to check if the user is already checked in
    useEffect(() => {
        const checkUserStatus = async () => {
            try {
                const response = await axios.get(`https://localhost:7149/api/GMPolicy/CheckResidnent/${user.id}`);
                const data = await response.data;
                setIsCheckedIn(data);
            } catch (error) {
                console.error('Error fetching check-in status:', error);
            } finally {
                setLoading(false);
            }
        };

        checkUserStatus();
    }, [user]);

    // Function to handle user check-in
    const handleCheckIn = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://localhost:7149/api/GMPolicy/', {
                date: new moment().format('YYYY-MM-DDT00:00:00'),
                residentNumber: user.id
            })

            if (response.status === 200) {
                setIsCheckedIn(true);
            } else {
                console.error('Failed to check in');
            }
        } catch (error) {
            console.error('Error during check-in:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container sx={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <BackButton/>
            {loading ? (
                <CircularProgress color="inherit"/>
            ) : (
                <>
                    {isCheckedIn ? (

                        <StyledBox>
                            <Typography variant="h2" sx={{marginTop: -5}}> היי {user.firstName}, </Typography>
                            <Typography variant="h2" sx={{marginTop: 5}}> נוהל בוקר טוב דווח בהצלחה</Typography>
                            <Typography variant="h2" sx={{marginTop: 5}}>המשך יום טוב!</Typography>
                        </StyledBox>
                    ) : (
                        <StyledBox>
                            <Typography variant="h2" sx={{marginTop: 5}}> בוקר טוב {user.firstName}, </Typography>
                            <Typography variant="h2" sx={{marginTop: 5}}> אנא דווח על נוהל בוקר טוב </Typography>
                            <IconButton
                                onClick={handleCheckIn}
                                sx={{
                                margin: 'auto auto',
                                width: 200,
                                height: 200,
                                backgroundColor: theme.palette.secondary.main,
                                border: '3px solid white',
                            }}
                            >
                                <Typography variant={'h3'} noWrap={true}>דיווח נוהל בוקר טוב</Typography>
                            </IconButton>
                        </StyledBox>
                    )}
                </>
            )}
        </Container>
    );
};

export default CheckInPage;
