using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblFacility
{
    public int FacilityId { get; set; }

    public string? FacilityName { get; set; }

    public TimeSpan? OpeningHours { get; set; }

    public TimeSpan? ClosingHours { get; set; }

    public string? OperatingDays { get; set; }

    public string? PhoneNumber { get; set; }

    public int? DepartmentId { get; set; }

    public virtual TblDepartment? Department { get; set; }
}
