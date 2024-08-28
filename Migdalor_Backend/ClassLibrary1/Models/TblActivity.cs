using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblActivity
{
    public int Id { get; set; }

    public DateTime? Date { get; set; }

    public string? ActivityName { get; set; }

    public TimeSpan? Time { get; set; } 
    //it was TimeSpan

    public int? MaxParticipants { get; set; }

    public int? DepartmentId { get; set; }
    
    public string? Description { get; set; }

    public string? Interests { get; set; }
    public virtual TblDepartment? Department { get; set; }

    
}
