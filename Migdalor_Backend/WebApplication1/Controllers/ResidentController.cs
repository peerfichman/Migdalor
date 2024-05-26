using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                    Password = userInput.Password
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
    }
}
