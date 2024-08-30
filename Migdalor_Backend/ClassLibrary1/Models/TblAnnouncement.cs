using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblAnnouncement
{
    public int? Id { get; set; }

    public DateTime? Date { get; set; }

    public string? Content { get; set; }
    public string? Subject { get; set; }

    public int? DepartmentId { get; set; }

}
