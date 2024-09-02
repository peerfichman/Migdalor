import * as CommittessRequests from './CommittessRequests.jsx'

const index = {
    create: CommittessRequests.createCommittee ,
    edit: CommittessRequests.editCommittee ,
    delete: CommittessRequests.deleteCommittee,
    getAll:CommittessRequests.getAllCommittees,
    getById: CommittessRequests.getCommitteeById
}

export default index;