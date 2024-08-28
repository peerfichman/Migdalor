using System;
using System.Collections.Generic;

namespace ClassLibrary1.Models;

public partial class TblInitiative
{
    public int InitiativeNumber { get; set; }

    public string? InitiativeName { get; set; }

    public string? Location { get; set; }

    public DateTime? Date { get; set; }

    public TimeSpan? StartHour { get; set; }

    public TimeSpan? EndHour { get; set; }

    public string? InitiativeType { get; set; }

    public int? MaxParticipants { get; set; }


    public string? InvitationDescription { get; set; }

    public int? ResidentNumber { get; set; }

}
