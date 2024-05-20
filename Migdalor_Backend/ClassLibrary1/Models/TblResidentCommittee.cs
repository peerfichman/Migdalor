using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblResidentCommittee
{
    public int CommitteeId { get; set; }

    public string? CommitteeName { get; set; }

    public string? MeetingSummery { get; set; }

    public int? DepartmentId { get; set; }

    public virtual TblDepartment? Department { get; set; }

    public virtual ICollection<TblResidentPartOfResidentCommittee> TblResidentPartOfResidentCommittees { get; set; } = new List<TblResidentPartOfResidentCommittee>();
}
