using ClassLibrary1.Models;

namespace WebApplication1.DTO
{
    public class ResidentDTO
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }

        public string? LastName { get; set; }

        public string? PhoneNumber { get; set; }

        public string? ResidentId { get; set; }

        public DateTime? DateOfBirth { get; set; }

        public string? PreviousAddress { get; set; }

        public string? Profession { get; set; }

        public string? Email { get; set; }

        public string? Username { get; set; }

        public string? Password { get; set; }
        public string? CurrentAddress { get; set; }
        //public virtual ICollection<TblResidentHasHobby> TblResidentHasHobbies { get; set; } = new List<TblResidentHasHobby>();



    }
}
