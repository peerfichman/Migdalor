using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();
        Random random = new Random();

        [HttpPost]
        [Route("AddActivity")]
        public IActionResult AddActivity([FromBody] TblActivity activityInput)
        {
            try
            {
                if (activityInput == null)
                {
                    return BadRequest("activity input is null");
                }

                int randomActivityNumber = random.Next(0, 10001);
                // Map the userInput to TblUser
                var activity = new TblActivity
                {
                    ActivityNumber= randomActivityNumber,
                    Date =activityInput.Date,
                    ActivityName=activityInput.ActivityName,
                    Time =activityInput.Time,
                    MaxParticipants=activityInput.MaxParticipants
    };

                // Add the user to the context
                db.TblActivities.Add(activity);

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
