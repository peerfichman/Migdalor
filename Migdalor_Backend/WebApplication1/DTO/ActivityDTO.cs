namespace WebApplication1.DTO
{
    public class ActivityDTO
    {
        public int ActivityNumber { get; set; }

        public DateTime? Date { get; set; }

        public string? ActivityName { get; set; }

        public DateTime? Time { get; set; } //it was TimeSpan?

        public int? MaxParticipants { get; set; }
    }
}
