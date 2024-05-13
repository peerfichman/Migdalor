using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblObituary
{
    public int ObituaryNumber { get; set; }

    public DateTime? Date { get; set; }

    public string? Description { get; set; }

    public int? ResidentNumber { get; set; }

    public int? DepartmentId { get; set; }

    public virtual TblDepartment? Department { get; set; }

    public virtual TblResident? ResidentNumberNavigation { get; set; }
}
