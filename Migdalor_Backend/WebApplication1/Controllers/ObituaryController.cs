using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObituaryController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();

        // Create Obituary
        [HttpPost]
        [Route("CreateObituary")]
        public IActionResult CreateObituary([FromBody] ObituaryDTO input)
        {
            if (input == null)
            {
                return BadRequest("Request body is null.");
            }

            var newObituary = new TblObituary
            {
                Date = input.Date,
                Description = input.Description,
            };

            db.TblObituaries.Add(newObituary);
            db.SaveChanges();

            return Ok(newObituary);
        }

        // Get All Obituaries
        [HttpGet]
        [Route("GetAllObituaries")]
        public IActionResult GetAllObituaries()
        {
            var obituaries = db.TblObituaries.ToList();
            if (obituaries == null || !obituaries.Any())
            {
                return NotFound("No obituaries found.");
            }

            return Ok(obituaries);
        }
    }
}
