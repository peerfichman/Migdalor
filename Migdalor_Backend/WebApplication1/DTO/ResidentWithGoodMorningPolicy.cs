namespace WebApplication1.DTO
{
    public class ResidentWithGoodMorningPolicy
    {
        public int ResidentNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Id { get; set; }
        public DateTime? DateOfGoodMorningPolicy { get; set; }
        public bool HasGoodMorningPolicy { get; set; }
    }
}
