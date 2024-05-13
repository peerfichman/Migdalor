using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblUser
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public int? RoleNumber { get; set; }

    public string? RoleName { get; set; }
}
