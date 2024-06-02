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

                return Ok("User added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpGet]
        public ActionResult<IEnumerable<TblResident>> GetResidents()
        {
            var residents = db.TblResidents.ToList();
            return Ok(residents);
        }

    }
}
