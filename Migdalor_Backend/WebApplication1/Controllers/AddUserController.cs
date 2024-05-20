using ClassLibrary1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddUserController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();

        //Add new user to tblUsers
        [HttpPost]
        [Route("AddUser")]
        [Authorize(Roles ="SuperAdmin")]
        public IActionResult AddUser([FromBody] TblUser userInput)
        {
            try
            {
                if (userInput == null)
                {
                    return BadRequest("User input is null");
                }

                // Check if the username already exists
                if (db.TblUsers.Any(u => u.Username == userInput.Username))
                {
                    return BadRequest("Username already exists");
                }

                // Map the userInput to TblUser
                var user = new TblUser
                {
                    Username = userInput.Username,
                    Password = userInput.Password,
                    RoleNumber = userInput.RoleNumber,
                    RoleName = userInput.RoleName
                };

                // Add the user to the context
                db.TblUsers.Add(user);
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
