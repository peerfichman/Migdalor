import * as activityRequests from './activitiesRequests.jsx'

const index = {
    create: activityRequests.createActivity ,
    edit: activityRequests.editActivity ,
    delete: activityRequests.deleteActivity,
    getAll:activityRequests.getAllActivities,
    getById: activityRequests.getActivityById
}

export default index;