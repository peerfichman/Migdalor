//using ClassLibrary1.Models;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;

//namespace WebApplication1.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class LoginController : ControllerBase
//    {
//        MigdalorContext db = new MigdalorContext();

//        [HttpGet]
//        [Route("GetUsers")]
//        public IActionResult GetUsers()
//        {
//            try
//            {
//                // Retrieve users from the database
//                var users = db.TblUsers.ToList();

//                // Check if any users were found
//                if (users == null || users.Count == 0)
//                {
//                    return NotFound("No users found");
//                }

//                // Return the list of users
//                return Ok(users);
//            }
//            catch (Exception ex)
//            {
//                // Log the exception or handle it appropriately
//                return StatusCode(500, "Internal server error");
//            }
//        }
//    }
//}
