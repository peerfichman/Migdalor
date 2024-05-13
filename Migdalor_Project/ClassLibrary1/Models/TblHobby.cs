using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblHobby
{
    public int HobbyNumber { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<TblResident> ResidentNumbers { get; set; } = new List<TblResident>();
}
