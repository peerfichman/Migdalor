import * as  announcementRequests from './announcementsRequests.jsx'

const index = {
    create: announcementRequests.createAnnouncement ,
    edit: announcementRequests.editAnnouncement ,
    delete: announcementRequests.deleteAnnouncement,
    getAll:announcementRequests.getAllAnnouncements,
    getById: announcementRequests.getAnnouncementById

}

export default index;