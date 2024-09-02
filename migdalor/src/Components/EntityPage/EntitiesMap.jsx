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
        createPage: (setOpenCreate) => {
            return <CreateActivity isEdit={false} activityNumber={null} setModalOpen={setOpenCreate}/>
        },
        editPage: (activityId, setOpenEdit) => {
            return <CreateActivity isEdit={true} activityNumber={activityId} setModalOpen={setOpenEdit}/>
        }

    },
    Tenant: {
        primaryKey: "id",
        requests: {
            ...TenantRequests
        }
        , columns: new Map([
                ['firstName', "שפ פרטי"],
                ['lastName', "שם משפחה"],
                ['dateOfBirth', "תאריך לידה"],
                ['email', "כתובת מייל"],
                ['phoneNumber', "טלפון"],
            ]
        ),
        createLabel: "דייר חדש",
        createPage: (setOpenCreate) => {
            return <AddTenant isEdit={false} tenantId={null} setModalOpen={setOpenCreate}/>
        },
        editPage: (tenantId, setOpenEdit) => {
            return <AddTenant isEdit={true} tenantId={tenantId} setModalOpen={setOpenEdit}/>
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
        createPage: (setOpenCreate) => {
            return <CreateDepartment isEdit={false} departmentNumber={null} setModalOpen={setOpenCreate}/>
        },
        editPage: (departmentId, setOpenEdit) => {
            return <CreateDepartment isEdit={true} departmentNumber={departmentId} setModalOpen={setOpenEdit}/>
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
        createPage: (setOpenCreate) => {
            return <SendMessage isEdit={false} messageNumber={null} setModalOpen={setOpenCreate}/>
        },
        editPage: (messageId, setOpenEdit) => {
            return <SendMessage isEdit={true} messageNumber={messageId} setModalOpen={setOpenEdit}/>
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
        createPage: (setOpenCreate) => {
            return <AddObituaryNotice isEdit={false} obituaryNumber={null} setModalOpen={setOpenCreate}/>
        },
        editPage: (obituaryNumber, setOpenEdit) => {
            return <AddObituaryNotice isEdit={true} obituaryNumber={obituaryNumber} setModalOpen={setOpenEdit}/>
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
        createPage: (setOpenCreate) => {
            return <TennantCommittee isEdit={false} obituaryNumber={null} setModalOpen={setOpenCreate}/>
        },
        editPage: (obituaryNumber, setOpenEdit) => {
            return <TennantCommittee isEdit={true} obituaryNumber={obituaryNumber} setModalOpen={setOpenEdit}/>
        }
    }
}

export default EntitiesMap;