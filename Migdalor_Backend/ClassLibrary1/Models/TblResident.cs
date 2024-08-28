using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblResident
{
    public int Id { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? PhoneNumber { get; set; }

    public string? ResidentID { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? PreviousAddress { get; set; }

    public int? Seniority { get; set; }

    public string? CurrentAddress { get; set; }

    public string? Profession { get; set; }

    public string? Email { get; set; }

    public string? AboutMe { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public int? DepartmentId { get; set; }

    }
