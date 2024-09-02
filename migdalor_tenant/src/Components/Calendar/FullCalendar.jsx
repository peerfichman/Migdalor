import React, {useContext, useEffect, useState} from "react";
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import 'moment/locale/he.js';
import * as ActivitiesRequests from '../../Requests/Activities/ActivitiesRequests.jsx'
import * as InitativesRequests from '../../Requests/Initatives/InitativesRequests.jsx'
import {CircularProgress, Typography, Box} from "@mui/material";
import {styled} from "@mui/system";
import theme from "../../Theme/Theme.jsx";
import BackButton from "../BackButton.jsx";
import EventsTable from "./EventsTable.jsx";
import InitiativesTable from "../InitiativesTable.jsx";
import ActivityModal from "./ActivityModal.jsx";
import {UserContext} from "../../Auth/Auth.jsx";
import InitiativeModal from "./initiativeModal.jsx";

moment.locale("he");
const localizer = momentLocalizer(moment);

const StyledBox = styled('Box')({
    position: 'static',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    marginTop: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: theme.palette.primary.main,
    width: '75%',
    height: '500px',
    borderRadius: 20

});
const Event = ({event, onClick}) => {

    const {type} = event.event;
    return (
        <Box sx={{
            height: 20, display: 'flex', alignItems: 'start',
            color: type === 'activity' ? 'blue' : 'red'
        }}>
            <Typography>
                {event.title}
            </Typography>
        </Box>
    )
}

const ReactBigCalendar = () => {
    const [eventsData, setEventsData] = useState([]);
    const [activities, setActivities] = useState([]);
    const [initiatives, setInitiatives] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState(0);
    const [selectedInitiative, setSelectedInitiative] = useState(0);
    const [participatedActivities, setParticipatedActivities] = useState([]);
    const [participatedInitiatives, setParticipatedInitiatives] = useState([]);
    const [ participatedEvents, setParticipatedEvents] = useState([]);

    const {user} = useContext(UserContext);


    useEffect(() => {
        setLoading(true);

        ActivitiesRequests.GetAllActivities().then(acts => setActivities(acts));
        InitativesRequests.GetAllInitiatives().then(inits => setInitiatives(inits));
        ActivitiesRequests.GetActivitiesResidentParticipating(user.id).then(acts => setParticipatedActivities(acts));
        InitativesRequests.GetInitiativeResidentParticipating(user.id).then(inits => setParticipatedInitiatives(inits));

    }, []);

    useEffect(() => {

        const activityEvents = activities.map(act => {
            const actDate = act.date.split('T')[0];
            const startTime = new Date(`${actDate}T${act.time}`);
            const endTime = moment(startTime).add(1, 'h').toDate();

            return {
                ...act,
                id: act.id,
                type: "activity",
                title: act.activityName,
                start: startTime,
                end: endTime,
            }
        })

        const initiativeEvents = initiatives.map(init => {
            const initDate = init.date.split('T')[0];
            const startTime = new Date(`${initDate}T${init.startHour}`);
            const endTime = new Date(`${initDate}T${init.endHour}`);

            return {
                ...init,
                id: init.initiativeNumber,
                type: "initiative",
                title: init.initiativeName,
                start: startTime,
                end: endTime
            }
        })
        setEventsData([...activityEvents, ...initiativeEvents]);


    }, [activities, initiatives]);


    useEffect(() => {
        setParticipatedEvents( [...participatedInitiatives, ...participatedActivities].map((e)=> {
            return {
                type: e.activityName ? "activity" : "initiative",
                id: e.id || e.initiativeNumber,
                date: e.date,
                name: e.activityName || e.initiativeName,
                time : e.startHour || e.time,
                maxParticipants: e.maxParticipants,
                description: e.invitationDescription || e.description
            }
        }));
        setLoading(false)


    }, [participatedInitiatives, participatedActivities]);


    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    }

    const handleOpenCloseModal = () => {
        setSelectedActivity(0)
        setSelectedInitiative(0)
    }

    const handleSelectEvent = (e) => {
        if (e.type === 'activity') setSelectedActivity(e.id);
        else if (e.type === 'initiative') setSelectedInitiative(e.id);
    }
    const handleSelect = ({start, end}) => {
        const title = window.prompt("New Event name");
        if (title)
            setEventsData([
                ...eventsData,
                {
                    start,
                    end,
                    title
                }
            ]);
    };

    const handelActivityJoin = async () => {
        await ActivitiesRequests.GetActivitiesResidentParticipating(user.id).then(acts => setParticipatedActivities(acts));
    }
    const handelInitiativeJoin = async () => {
        await InitativesRequests.GetInitiativeResidentParticipating(user.id).then(inits => setParticipatedInitiatives(inits));
    }

    return (
        <Box sx={{
            display: "flex", alignItems: "center", flexDirection: "column"
        }}>
            <BackButton/>

            <StyledBox>
                <Typography variant={"h2"} sx={{marginTop:0}}
                >יומן אירועים</Typography>
                {loading ?
                    <CircularProgress color="secondary"/> :
                        <Calendar
                            views={["day", "week", "month"]}
                            selectable
                            components={{event: (e) => <Event event={e} onClick={handleSelect}/>}}
                            localizer={localizer}
                            defaultDate={new Date()}
                            defaultView="week"
                            events={eventsData}
                            style={{
                                backgroundColor: "white", width: "95%",
                                height: "90%",
                                border: ' 1rem solid #38588E'
                            }}
                            onSelectEvent={(event) => handleSelectEvent(event)}
                            // onSelectSlot={handleSelect}
                            eventPropGetter={eventStyleGetter}
                            messages={{
                                next: "הבא",
                                previous: "הקודם",
                                today: "היום",
                                month: "חודש",
                                week: "שבוע",
                                day: "יום",
                            }}

                        />

                }
            </StyledBox>
            <Box
                sx={{
                    marginTop: '3rem',
                    marginBottom: '3rem',
                    display: 'flex',
                    // justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    backgroundColor: theme.palette.primary.main,
                    width: '75%',
                    height: '500px',
                    borderRadius: 5
                }}


            >
                <Typography variant={"h2"} sx={{
                    alignSelf: "center",
                    marginTop: '1rem',
                    marginRight: '2.5rem',
                    marginBottom: '1rem'
                }}>האירועים שלי</Typography>

                <EventsTable events={participatedEvents} handleSelectEvent={handleSelectEvent}/>

            </Box>
            {/*<Box*/}
            {/*    sx={{*/}
            {/*        marginTop: '3rem',*/}
            {/*        marginBottom: '3rem',*/}
            {/*        display: 'flex',*/}
            {/*        // justifyContent: 'center',*/}
            {/*        alignItems: 'center',*/}
            {/*        flexDirection: 'column',*/}
            {/*        backgroundColor: theme.palette.primary.main,*/}
            {/*        width: '75%',*/}
            {/*        height: '500px',*/}
            {/*        borderRadius: 5*/}
            {/*    }}*/}


            {/*>*/}
            {/*    <Typography variant={"h2"} sx={{*/}
            {/*        alignSelf: "start",*/}
            {/*        marginTop: '1rem',*/}
            {/*        marginRight: '2.5rem',*/}
            {/*        marginBottom: '1rem'*/}

            {/*    }}>היוזמות שלי</Typography>*/}
            {/*    <InitiativesTable initiatives={participatedInitiatives} handelSelctedEvent={handleSelectEvent}/>*/}
            {/*</Box>*/}
            <ActivityModal isParticipating={participatedActivities.some((a) => {
                return a.id === selectedActivity
            })}
                           initiativeNumber={selectedActivity} open={selectedActivity !== 0}
                           onClose={handleOpenCloseModal}
                           onActivityJoined={handelActivityJoin}/>
            <InitiativeModal isParticipating={participatedInitiatives.some((i) => {
                return i.initiativeNumber === selectedInitiative
            })}
                             initiativeNumber={selectedInitiative} open={selectedInitiative !== 0}
                             onClose={handleOpenCloseModal}
                             onInitiativeJoined={handelInitiativeJoin}/>
        </Box>
    );
}


export default ReactBigCalendar;
