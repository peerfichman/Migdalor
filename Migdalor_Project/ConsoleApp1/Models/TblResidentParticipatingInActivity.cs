using System;
using System.Collections.Generic;

namespace ConsoleApp1.Models;

public partial class TblResidentParticipatingInActivity
{
    public int ActivityNumber { get; set; }

    public int ResidentNumber { get; set; }

    public bool? IsActive { get; set; }
}
