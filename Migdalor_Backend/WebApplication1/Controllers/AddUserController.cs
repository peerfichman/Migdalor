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
        //for future developing

        MigdalorContext db = new MigdalorContext();

        //Add new user to tblUsers
        [HttpPost]
        [Route("AddUser")]
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


        [HttpPut]
        [Route("UpdateUser/{username}")]
        public IActionResult UpdateUser(string username, [FromBody] TblUser updateDto)
        {
            try
            {
                if (updateDto == null)
                {
                    return BadRequest("Update information is null");
                }

                // Find the user by username
                var user = db.TblUsers.FirstOrDefault(u => u.Username == username);
                if (user == null)
                {
                    return NotFound($"User with username {username} not found");
                }

                // Update user information
                if (!string.IsNullOrEmpty(updateDto.Password)) user.Password = updateDto.Password;
                if (updateDto.RoleNumber.HasValue) user.RoleNumber = updateDto.RoleNumber.Value;
                if (!string.IsNullOrEmpty(updateDto.RoleName)) user.RoleName = updateDto.RoleName;

                // Save changes to the database
                db.SaveChanges();

                return Ok("User updated successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
