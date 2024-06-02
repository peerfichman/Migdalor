using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResidentController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();
        Random random = new Random();

        [HttpPost]
        [Route("AddResident")]
        //public IActionResult AddResident([FromBody] ResidentDTO userInput)
        //{
        //    try
        //    {
        //        if (userInput == null)
        //        {
        //            return BadRequest("User input is null");
        //        }

        //        // Check if the username already exists
        //        if (db.TblResidents.Any(u => u.Username == userInput.Username))
        //        {
        //            return BadRequest("Username already exists");
        //        }
        //        int randomResidentNumber = random.Next(0, 2147483647);

        //        //
        //        // לייצר DTO
        //        var resident = new ResidentDTO
        //        {
        //            Username = userInput.Username,
        //            Password = userInput.Password,
        //            FirstName = userInput.FirstName,
        //            LastName = userInput.LastName,
        //            PhoneNumber = userInput.PhoneNumber,
        //            Id = userInput.Id,
        //            DateOfBirth = userInput.DateOfBirth,
        //            PreviousAddress = userInput.PreviousAddress,
        //            ResidentImage = userInput.ResidentImage,
        //            Profession = userInput.Profession,
        //            Email = userInput.Email
        //        };



        //        //Add the user to the context
        //        db.TblResidents.Add(resident);

        //        //Save changes to the database
        //        db.SaveChanges();

        //        return Ok("User added successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, $"Internal server error: {ex.Message}");
        //    }
        //}
        [HttpPost]
        [Route("AddResident")]
        public IActionResult AddResident([FromBody] ResidentDTO userInput)
        {
            try
            {
                if (userInput == null)
                {
                    return BadRequest("User input is null");
                }

                // Check if the username already exists
                if (db.TblResidents.Any(u => u.Username == userInput.Username))
                {
                    return BadRequest("Username already exists");
                }

                int randomResidentNumber = new Random().Next(0, 2147483647);

                var resident = new TblResident
                {
                    ResidentNumber = randomResidentNumber,
                    Username = userInput.Username,
                    Password = userInput.Password,
                    FirstName = userInput.FirstName,
                    LastName = userInput.LastName,
                    PhoneNumber = userInput.PhoneNumber,
                    Id = userInput.Id,
                    DateOfBirth = userInput.DateOfBirth,
                    PreviousAddress = userInput.PreviousAddress,
                    ResidentImage = userInput.ResidentImage,
                    Profession = userInput.Profession,
                    Email = userInput.Email
                };

                db.TblResidents.Add(resident);
                db.SaveChanges();

                //// Add selected hobbies
                //foreach (var hobbyId in userInput.SelectedHobbies)
                //{
                //    var residentHobby = new TblResidentHasHobby
                //    {
                //        ResidentNumber = resident.ResidentNumber,
                //        HobbyNumber = hobbyId
                //    };

                //    db.TblResidentHasHobbies.Add(residentHobby);
                //}

                //db.SaveChanges();

                return Ok("User added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet]
        [Route("GetResidentsWithGoodMorningPolicy")]
        public IActionResult GetResidentsWithGoodMorningPolicy()
        {
            var residents = db.TblResidents
                .Select(resident => new ResidentWithGoodMorningPolicy
                {
                    ResidentNumber = resident.ResidentNumber,
                    FirstName = resident.FirstName,
                    LastName = resident.LastName,
                    PhoneNumber = resident.PhoneNumber,
                    Id = resident.Id,
                    DateOfGoodMorningPolicy = db.TblGoodMorningPolicies
                .Where(gmp => gmp.ResidentNumber == resident.ResidentNumber)
                .Select(gmp => gmp.DateTime)
                .FirstOrDefault(),
                    HasGoodMorningPolicy = db.TblGoodMorningPolicies
                        .Any(gmp => gmp.ResidentNumber == resident.ResidentNumber)
                })
                .ToList();

            return Ok(residents);
        }
    }
}
