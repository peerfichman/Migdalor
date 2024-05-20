using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblResident
{
    public int ResidentNumber { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }

    public string? PhoneNumber { get; set; }

    public string? Id { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? PreviousAddress { get; set; }

    public int? Seniority { get; set; }

    public string? CurrentAddress { get; set; }

    public byte[]? ResidentImage { get; set; }

    public string? Profession { get; set; }

    public string? Email { get; set; }

    public string? AboutMe { get; set; }

    public string? Username { get; set; }

    public string? Password { get; set; }

    public int? DepartmentId { get; set; }

    public virtual TblDepartment? Department { get; set; }

    public virtual ICollection<TblInitiative> TblInitiatives { get; set; } = new List<TblInitiative>();

    public virtual ICollection<TblObituary> TblObituaries { get; set; } = new List<TblObituary>();

    public virtual ICollection<TblResidentHasHobby> TblResidentHasHobbies { get; set; } = new List<TblResidentHasHobby>();

    public virtual ICollection<TblResidentPartOfResidentCommittee> TblResidentPartOfResidentCommittees { get; set; } = new List<TblResidentPartOfResidentCommittee>();

    public virtual ICollection<TblResidentParticipatingInActivity> TblResidentParticipatingInActivities { get; set; } = new List<TblResidentParticipatingInActivity>();

    public virtual ICollection<TblResidentParticipatingInInitiative> TblResidentParticipatingInInitiatives { get; set; } = new List<TblResidentParticipatingInInitiative>();
}
