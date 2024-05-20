using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblResidentPartOfResidentCommittee
{
    public int CommitteeId { get; set; }

    public int ResidentNumber { get; set; }

    public bool? IsActive { get; set; }

    public virtual TblResidentCommittee Committee { get; set; } = null!;

    public virtual TblResident ResidentNumberNavigation { get; set; } = null!;
}
