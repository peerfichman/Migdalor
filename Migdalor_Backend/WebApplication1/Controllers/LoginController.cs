using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();

        //provides methods to retrieve configuration values, typically from sources like JSON files
        private readonly IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public IActionResult Login([FromBody] UserLogin userlogin)
        {
            //IActionResult = allows you to return various types of responses from your action methods
            IActionResult response = Unauthorized();
            TblUser user = Authenticate(userlogin);
            if (user != null)
            {
                var token = GenerateJwtToken(user);
                return Ok(new { Token = token });
            }
            return response;
        }

        //Check the username and password of the user how trying to login
        [HttpPost]
        [Route("Authenticate")]
        private TblUser Authenticate(UserLogin userInput)
        {
            return db.TblUsers.FirstOrDefault(u => u.Username == userInput.Username && u.Password == userInput.Password);
        }


        private string GenerateJwtToken(TblUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var Claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,user.UserId.ToString()),
                new Claim(ClaimTypes.GivenName,user.Username),
                new Claim(ClaimTypes.Role,user.RoleName)
            };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                Claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        [HttpPost]
        [Route("ResidentLogin")]
        public IActionResult ResidentLogin([FromBody] UserLogin residentlogin)
        {
            try
            {
                //IActionResult = allows you to return various types of responses from your action methods
                IActionResult response = Unauthorized();
                TblResident resident = db.TblResidents.FirstOrDefault(u => u.Username == residentlogin.Username && u.Password == residentlogin.Password); ;
                if (resident != null)
                {
                    var token = GenerateJwtTokenForResident(resident);
                    return Ok(new { Token = token, resident = resident });
                }
                return response;
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private string GenerateJwtTokenForResident(TblResident resident)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var Claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,resident.ResidentID.ToString()),
                new Claim(ClaimTypes.GivenName,resident.Username)
            };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                Claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }


        //for future developing
        //[httpget("gnarfjt")]
        //[authorize]
        //public iactionresult getnameandrolefromjwttoken()
        //{
        //    tbluser user = getcurrntuser();
        //    return ok($"hi {user.username},you are in role {user.rolename}");
        //}



        //for future developing
        private TblUser GetCurrntUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
            {
                return null;
            }
            IEnumerable<Claim> claims = identity.Claims;

            int id = int.Parse(claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value);
            string name = claims.FirstOrDefault(c => c.Type == ClaimTypes.GivenName).Value;
            string role = claims.FirstOrDefault(c => c.Type == ClaimTypes.Role).Value;

            TblUser user = new TblUser()
            {
                UserId = id,
                Username = name,
                RoleName = role
            };
            return user;
        }



        //for future developing
        //create API for Forgot Password
        //[HttpPost]
        //[Route("ForgotPassword")]
        //public IActionResult ForgotPassword(string username)
        //{
        //    // Find the user in the database based on the provided username
        //    var user = db.TblUsers.FirstOrDefault(u => u.Username == username);

        //    if (user == null)
        //    {
        //        // User not found
        //        return BadRequest("User not found");
        //    }

        //    // Implement your logic for password reset here
        //    // For example, you could send an email to the user with a link to reset their password

        //    return Ok("Password reset instructions sent to your email");
        //}

    }
}