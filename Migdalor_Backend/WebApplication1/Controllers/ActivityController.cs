using ClassLibrary1.Models;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();
        Random random = new Random();

        [HttpGet]
        [Route("GetAllActivities")]
        public ActionResult<IEnumerable<TblActivity>> GetActivities()
        {
            var activities = db.TblActivities.ToList();
            return Ok(activities);
        }
        [HttpGet]
        [Route("GetActivityById/{id}")]
        public ActionResult<TblActivity> GetActivityById(int id)
        {

            var activity = db.TblActivities.Find(id);
            return Ok(activity);
        }


        [HttpPost]
        [Route("AddActivity")]
        public IActionResult AddActivity([FromBody] ActivityDTO activityInput)
        {
            try
            {
                if (activityInput == null)
                {
                    return BadRequest("Activity input is null");
                }

                int randomActivityNumber = random.Next(0, 10001);
                
                var activity = new TblActivity
                {
                    Id = randomActivityNumber,
                    Date = activityInput.Date,
                    ActivityName = activityInput.ActivityName,
                    Time = activityInput.Time,
                    MaxParticipants = activityInput.MaxParticipants,
                    Description = activityInput.Description,
                    Interests = activityInput.Interests,
                };

                // Add the user to the context
                db.TblActivities.Add(activity);

                // Save changes to the database
                db.SaveChanges();

                return Ok("Activity added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut]
        [Route("EditActivity")]
        public IActionResult EditActivity([FromBody] ActivityDTO activityInput)
        {
            try
            {
                if (activityInput == null)
                {
                    return BadRequest("Activity input is null");
                }
                
                var activity = new TblActivity
                {
                    Id = activityInput.Id,
                    Date = activityInput.Date,
                    ActivityName = activityInput.ActivityName,
                    Time = activityInput.Time,
                    MaxParticipants = activityInput.MaxParticipants,
                    Description = activityInput.Description,
                    Interests = activityInput.Interests,
                };

                // Add the user to the context
                db.TblActivities.Update(activity);

                // Save changes to the database
                db.SaveChanges();

                return Ok("Activity Edited successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete]
        [Route("DeleteActivity/{id}")]
        public IActionResult DeleteActivity(int id)
        {
            try
            {

                var entityToDelete = new TblActivity { Id = id };
                db.TblActivities.Attach(entityToDelete);
                db.TblActivities.Remove(entityToDelete);
                db.SaveChanges();
  

                return Ok("Activity Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        [Route("AddParticipantToActivity")]
        public IActionResult AddParticipantToActivity([FromBody] ResidentParticipatingInActivityDTO input)
        {
            try
            {

                if (input == null)
                {
                    return BadRequest("Input is null");
                }

                var participation = new TblResidentParticipatingInActivity
                {
                    ResidentNumber = input.ResidentNumber,
                    ActivityNumber = input.ActivityNumber
                };

                db.TblResidentParticipatingInActivities.Add(participation);

                db.SaveChanges();

                return Ok("Participant added successfully to activity");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        [HttpDelete]
        [Route("RemoveParticipantFromActivity")]
        public IActionResult RemoveParticipantFromActivity([FromBody] ResidentParticipatingInActivityDTO input)
        {
            try
            {

                var entityToDelete = new TblResidentParticipatingInActivity {
                    ResidentNumber = input.ResidentNumber,
                    ActivityNumber = input.ActivityNumber
                };
                db.TblResidentParticipatingInActivities.Attach(entityToDelete);
                db.TblResidentParticipatingInActivities.Remove(entityToDelete);
                db.SaveChanges();


                return Ok("Participant removed from activity");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("GetParticiapntsInActivity/{id}")]
        public IActionResult GetParticiapntsInActivity(int id)
        {
            try
            {
                var participants = (from resident in db.TblResidents
                                    join residentActivity in db.TblResidentParticipatingInActivities
                                    on resident.Id equals residentActivity.ResidentNumber
                                    where residentActivity.ActivityNumber == id
                                    select resident).ToList();
                return Ok(participants);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }
        [HttpGet]
        [Route("GetActivitiesResidentParticipating/{id}")]
        public IActionResult GetActivitiesResidentParticipating(int id)
        {
            try
            {
                var activities = (from activity in db.TblActivities
                                    join residentActivity in db.TblResidentParticipatingInActivities
                                    on activity.Id equals residentActivity.ActivityNumber
                                    where residentActivity.ResidentNumber == id
                                    select activity).ToList();
                return Ok(activities);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }

    }
}
