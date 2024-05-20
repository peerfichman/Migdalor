using System;
using System.Collections.Generic;

namespace ConsoleApp1.Models;

public partial class TblResidentHasHobby
{
    public int HobbyNumber { get; set; }

    public int ResidentNumber { get; set; }

    public bool? IsActive { get; set; }
}
