import * as obituaryRequests from './obituaryRequests.jsx'

const index = {
    create: obituaryRequests.createObituary,
    edit: obituaryRequests.editObituary ,
    delete: obituaryRequests.deleteObituary,
    getAll:obituaryRequests.getAllObituaries,
    getById: obituaryRequests.getObituaryById

}

export default index;