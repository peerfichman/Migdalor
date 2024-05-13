using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblAnnouncement
{
    public int AnnouncementId { get; set; }

    public DateTime? Date { get; set; }

    public string? Content { get; set; }

    public int? DepartmentId { get; set; }

    public virtual TblDepartment? Department { get; set; }
}
