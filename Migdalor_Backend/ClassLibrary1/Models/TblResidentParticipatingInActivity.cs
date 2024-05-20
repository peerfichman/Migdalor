using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblResidentParticipatingInActivity
{
    public int ActivityNumber { get; set; }

    public int ResidentNumber { get; set; }

    public bool? IsActive { get; set; }

    public virtual TblActivity ActivityNumberNavigation { get; set; } = null!;

    public virtual TblResident ResidentNumberNavigation { get; set; } = null!;
}
