import * as tenantRequests from './tenantRequests.jsx'

const index = {
    create: tenantRequests.createTenant,
    edit: tenantRequests.editTenant ,
    delete: tenantRequests.deleteTenant,
    getAll:tenantRequests.getAllTenants,
    getById: tenantRequests.getTenantById

}

export default index;