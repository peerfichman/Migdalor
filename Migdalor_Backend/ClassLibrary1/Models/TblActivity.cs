using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblActivity
{
    public int ActivityNumber { get; set; }

    public DateTime? Date { get; set; }

    public string? ActivityName { get; set; }

    public DateTime? Time { get; set; } //it was TimeSpan?

    public int? MaxParticipants { get; set; }

    public int? DepartmentId { get; set; }

    public virtual TblDepartment? Department { get; set; }

    public virtual ICollection<TblResidentParticipatingInActivity> TblResidentParticipatingInActivities { get; set; } = new List<TblResidentParticipatingInActivity>();
}
