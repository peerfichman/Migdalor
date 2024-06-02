using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();
        private readonly IConfiguration _configuration;

        //Check the username and password of the user how trying to login
        [HttpPost]
        [Route("Authenticate")]
        public IActionResult Authenticate(TblUser userInput)
        {
            var user = db.TblUsers.FirstOrDefault(u => u.Username == userInput.Username && u.Password == userInput.Password);

            if (user == null)
            {
                return BadRequest("Username or password is incorrect");
            }

            var token = GenerateJwtToken(user);

            return Ok(new { Token = token });
        }
        private string GenerateJwtToken(TblUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Role, user.RoleName) // You can include additional claims as needed
                }),
                Expires = DateTime.UtcNow.AddHours(1), // Token expiration time
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        //create API for Forgot Password
        [HttpPost]
        [Route("ForgotPassword")]
        public IActionResult ForgotPassword(string username)
        {
            // Find the user in the database based on the provided username
            var user = db.TblUsers.FirstOrDefault(u => u.Username == username);

            if (user == null)
            {
                // User not found
                return BadRequest("User not found");
            }

            // Implement your logic for password reset here
            // For example, you could send an email to the user with a link to reset their password

            return Ok("Password reset instructions sent to your email");
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

