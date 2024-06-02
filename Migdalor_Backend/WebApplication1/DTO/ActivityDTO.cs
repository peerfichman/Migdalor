namespace WebApplication1.DTO
{
    public class ActivityDTO
    {
        public int ActivityNumber { get; set; }

        public DateTime? Date { get; set; }

        public string? ActivityName { get; set; }

        public TimeSpan? Time { get; set; }

        public int? MaxParticipants { get; set; }
    }
}
