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

        [HttpPost]
        [Route("AddResident")]
        public IActionResult AddResident([FromBody] TblResident userInput)
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

                // Map the userInput to TblUser
                var resident = new TblResident
                {
                    Username = userInput.Username,
                    Password = userInput.Password,
                    ResidentNumber = userInput.ResidentNumber,
                    FirstName = userInput.FirstName,
                    LastName = userInput.LastName,
                    PhoneNumber = userInput.PhoneNumber,
                    Id = userInput.Id,
                    DateOfBirth = userInput.DateOfBirth,
                    PreviousAddress = userInput.PreviousAddress,
                    Seniority = userInput.Seniority,
                    CurrentAddress = userInput.CurrentAddress,
                    ResidentImage = userInput.ResidentImage,
                    Profession = userInput.Profession,
                    Email = userInput.Email,
                    TblResidentHasHobbies = userInput.TblResidentHasHobbies
                };

                // Add the user to the context
                db.TblResidents.Add(resident);

                // Save changes to the database
                db.SaveChanges();

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
