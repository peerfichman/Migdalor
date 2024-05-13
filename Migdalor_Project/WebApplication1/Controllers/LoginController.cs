using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();

        //Check the username and password of the user how trying to login
        [HttpPost]
        [Route("Authenticate")]
        public IActionResult Authenticate(TblUser userInput)
        {
            // Find the user in the database based on the provided username
            var user = db.TblUsers.FirstOrDefault(u => u.Username == userInput.Username);

            if (user == null || user.Password != userInput.Password)
            {
                // Username or password is incorrect
                return BadRequest("Incorrect username or password");
            }

            // Authentication successful
            return Ok("Login successful");
        }

        //Gets all users in the DB
        [HttpGet]
        [Route("GetUsers")]
        public IActionResult GetUsers()
        {
            try
            {
                // Retrieve users from the database
                var users = db.TblUsers.ToList();

                // Check if any users were found
                if (users == null || users.Count == 0)
                {
                    return NotFound("No users found");
                }

                // Return the list of users
                return Ok(users);
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return StatusCode(500, "Internal server error");
            }
        }

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

        //Update user to tblUsers
        [HttpPut]
        [Route("UpdateUser/{id}")]
        public IActionResult UpdateUser(int id, TblUser userInput)
        {
            var userToUpdate = db.TblUsers.FirstOrDefault(u => u.UserId == id);

            if (userToUpdate == null)
            {
                return NotFound();
            }

            // Update the user properties with the new values
            userToUpdate.Username = userInput.Username;
            userToUpdate.Password = userInput.Password;
            userToUpdate.RoleNumber = userInput.RoleNumber;
            userToUpdate.RoleName = userInput.RoleName;

            db.SaveChanges();

            return Ok("User updated successfully");
        }
    }
}

