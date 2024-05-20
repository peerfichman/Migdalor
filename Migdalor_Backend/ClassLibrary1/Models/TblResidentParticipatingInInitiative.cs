using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblResidentParticipatingInInitiative
{
    public int InitiativeNumber { get; set; }

    public int ResidentNumber { get; set; }

    public bool? IsActive { get; set; }

    public virtual TblInitiative InitiativeNumberNavigation { get; set; } = null!;

    public virtual TblResident ResidentNumberNavigation { get; set; } = null!;
}
