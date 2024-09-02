using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblResidentCommittee
{
    public int CommitteeId { get; set; }

    public string? CommitteeName { get; set; }

    public int   ResidentManager { get; set; }

    public string? ResponsibilityDescription { get; set; }


}
