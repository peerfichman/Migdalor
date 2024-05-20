using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblHobby
{
    public int HobbyNumber { get; set; }

    public string? Name { get; set; }

    public virtual ICollection<TblResidentHasHobby> TblResidentHasHobbies { get; set; } = new List<TblResidentHasHobby>();
}
