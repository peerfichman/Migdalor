import * as departmentRequests from './deparmentRequests.jsx'

const index = {
    create: departmentRequests.createDepartment ,
    edit: departmentRequests.editDepartment ,
    delete: departmentRequests.deleteDepartment,
    getAll:departmentRequests.getAllDepartments,
    getById: departmentRequests.getDepartmentById

}

export default index;