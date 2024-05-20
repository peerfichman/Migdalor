using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblResidentHasHobby
{
    public int HobbyNumber { get; set; }

    public int ResidentNumber { get; set; }

    public bool? IsActive { get; set; }

    public virtual TblHobby HobbyNumberNavigation { get; set; } = null!;

    public virtual TblResident ResidentNumberNavigation { get; set; } = null!;
}
