import React from "react";
import ActivityRequestsIndex from '../../Requests/Activity/index.jsx'
import CommitteeRequestsIndex from '../../Requests/Committes/index.jsx'
import DepartmentRequestsIndex from '../../Requests/Department/index.jsx'
import TenantRequests from '../../Requests/Tenant/index.jsx'
import AnnouncementsRequests from '../../Requests/Announcements/index.jsx'
import ObituaryRequests from '../../Requests/Obituary/index.jsx'
import CreateActivity from "../CreatePages/CreateActivity.jsx";
import CreateDepartment from "../CreatePages/CreateDepartment.jsx";
import AddTenant from "../CreatePages/AddTenant.jsx";
import SendMessage from "../CreatePages/SendMeassge.jsx";
import TennantCommittee from "../CreatePages/TenantCommittee.jsx";
import AddObituaryNotice from "../CreatePages/AddObituaryNotice.jsx";

const EntitiesMap = {
    Activity: {
        primaryKey: "id",
        requests: {
            ...ActivityRequestsIndex
        },
        columns: new Map([
                ['activityName', "שם"],
                ['date', "תאריך"],
                ['time', "שעה"],
                ['maxParticipants', "מס' משתתפים"]
            ]
        ),
        createLabel: "צור פעילות",
        createPage: (setOpenCreate, onUpdate) => {
            return <CreateActivity isEdit={false} activityNumber={null} setModalOpen={setOpenCreate} onUpdate={onUpdate}/>
        },
        editPage: (activityId, setOpenEdit, onUpdate) => {
            return <CreateActivity isEdit={true} activityNumber={activityId} setModalOpen={setOpenEdit} onUpdate={onUpdate}/>
        }

    },
    Tenant: {
        primaryKey: "id",
        requests: {
            ...TenantRequests
        }
        , columns: new Map([
                ['firstName', "שם פרטי"],
                ['lastName', "שם משפחה"],
                ['dateOfBirth', "תאריך לידה"],
                ['email', "כתובת מייל"],
                ['phoneNumber', "טלפון"],
            ]
        ),
        createLabel: "דייר חדש",
        createPage: (setOpenCreate, onUpdate) => {
            return <AddTenant isEdit={false} tenantId={null} setModalOpen={setOpenCreate} onUpdate={onUpdate}/>
        },
        editPage: (tenantId, setOpenEdit, onUpdate) => {
            // return <AddTenant isEdit={true} tenantId={tenantId} setModalOpen={setOpenEdit} onUpdate={onUpdate}/>
            return <di></di>
        }
    },
    Department: {
        primaryKey: "id",
        requests: {
            ...DepartmentRequestsIndex
        }
        , columns: new Map([
                ['departmentName', "שם מחלקה"],
                ['departmentManager', "מנהל מחלקה"],
                ['managerPhoneNumber', "טלפון מנהל"],
                ['departmentDays', "ימי פעילות"],
                ['departmentHours', "שעות פעילות"],
            ]
        ),
        createLabel: "צור מחלקה",
        createPage: (setOpenCreate, onUpdate) => {
            return <CreateDepartment isEdit={false} departmentNumber={null} setModalOpen={setOpenCreate} onUpdate={onUpdate}/>
        },
        editPage: (departmentId, setOpenEdit, onUpdate) => {
            return <CreateDepartment isEdit={true} departmentNumber={departmentId} setModalOpen={setOpenEdit} onUpdate={onUpdate}/>
        }
    },
    Message: {
        primaryKey: "id",
        requests: {
            ...AnnouncementsRequests
        }
        , columns: new Map([
                ['date', "תאריך"],
                ['subject', "נושא"]
            ]
        ),
        createLabel: "שלח הודעה לדיירים",
        createPage: (setOpenCreate, onUpdate) => {
            return <SendMessage isEdit={false} messageNumber={null} setModalOpen={setOpenCreate} onUpdate={onUpdate}/>
        },
        editPage: (messageId, setOpenEdit, onUpdate) => {
            return <SendMessage isEdit={true} messageNumber={messageId} setModalOpen={setOpenEdit} onUpdate={onUpdate}/>
        }
    },
    Obituary: {
        primaryKey: "obituaryNumber",
        requests: {
            ...ObituaryRequests
        }
        , columns: new Map([
                ['date', "תאריך"],
                ['deceasedName', 'שם הנפטר'],
                ['residentId', 'ת.ז הנפטר'],
                ['cemeteryName', 'בית עלמין'],
                ['description', 'תיאור'],
                ['shivaAddress', 'כתובת השבעה']
            ]
        ),
        createLabel: "פרסם מודעת אבל",
        createPage: (setOpenCreate, onUpdate) => {
            return <AddObituaryNotice isEdit={false} obituaryNumber={null} setModalOpen={setOpenCreate} onUpdate={onUpdate}/>
        },
        editPage: (obituaryNumber, setOpenEdit, onUpdate) => {
            return <AddObituaryNotice isEdit={true} obituaryNumber={obituaryNumber} setModalOpen={setOpenEdit} onUpdate={onUpdate}/>
        }
    } ,
    Committee: {
        primaryKey: "committeeId",
        requests: {
            ...CommitteeRequestsIndex
        }
        , columns: new Map([
                ['committeeName', 'שם הוועד'],
                ['residentManager', 'מנהל אחראי'],

            ]
        ),
        createLabel: "צור וועד חדש",
        createPage: (setOpenCreate ,onUpdate) => {
            return <TennantCommittee isEdit={false} obituaryNumber={null} setModalOpen={setOpenCreate} onUpdate={onUpdate}/>
        },
        editPage: (obituaryNumber, setOpenEdit, onUpdate) => {
            return <TennantCommittee isEdit={true} obituaryNumber={obituaryNumber} setModalOpen={setOpenEdit} onUpdate={onUpdate}/>
        }
    }
}

export default EntitiesMap;