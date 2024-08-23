import ActivityRequestsIndex from '../../Requests/Activity/index.jsx'


const EntitiesMap = {
    Activity : {
        requests: {
            ...ActivityRequestsIndex
        },
        columns: new Map([
            ['activityName', "שם"],
            ['date', "תאריך"],
            ['time', "שעה"],
            ['maxParticipants', "מס' משתתפים"]
            ]
        )
    }
}

export default EntitiesMap;