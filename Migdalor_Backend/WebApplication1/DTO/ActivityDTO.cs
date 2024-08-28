namespace WebApplication1.DTO
{
    public class ActivityDTO
    {
        public int Id { get; set; }

        public DateTime? Date { get; set; }

        public string? ActivityName { get; set; }

        public TimeSpan? Time { get; set; } 
        //it was TimeSpan?

        public int? MaxParticipants { get; set; }

        public string? Description { get; set; }

        public string? Interests { get; set; }
    }
}
