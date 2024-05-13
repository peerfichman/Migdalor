using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblDepartment
{
    public int DepartmentId { get; set; }

    public string? DepartmentName { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public virtual ICollection<TblActivity> TblActivities { get; set; } = new List<TblActivity>();

    public virtual ICollection<TblAnnouncement> TblAnnouncements { get; set; } = new List<TblAnnouncement>();

    public virtual ICollection<TblFacility> TblFacilities { get; set; } = new List<TblFacility>();

    public virtual ICollection<TblGoodMorningPolicy> TblGoodMorningPolicies { get; set; } = new List<TblGoodMorningPolicy>();

    public virtual ICollection<TblObituary> TblObituaries { get; set; } = new List<TblObituary>();

    public virtual ICollection<TblResidentCommittee> TblResidentCommittees { get; set; } = new List<TblResidentCommittee>();

    public virtual ICollection<TblResident> TblResidents { get; set; } = new List<TblResident>();
}
