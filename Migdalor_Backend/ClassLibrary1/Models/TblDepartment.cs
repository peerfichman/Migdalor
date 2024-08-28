using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblDepartment
{
    public int? Id { get; set; }

    public string? DepartmentName { get; set; }

    public string? ManagerPhoneNumber { get; set; }
    public string? DepartmentManager { get; set; }
    public string? DepartmentDays { get; set; }
    public string? DepartmentHours { get; set; }
    public string? Description { get; set; }

}
