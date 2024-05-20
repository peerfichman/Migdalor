using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblGoodMorningPolicy
{
    public int IdentificationNumber { get; set; }

    public DateTime? DateTime { get; set; }

    public int? DepartmentId { get; set; }

    public int? ResidentNumber { get; set; }

    public virtual TblDepartment? Department { get; set; }
}
