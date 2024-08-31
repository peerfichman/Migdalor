using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;
using WebApplication1.Socket;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();

        private static readonly Random _random = new Random();

        [HttpPost]
        [Route("CreateAnnouncement")]
        public async Task<IActionResult> CreateAnnouncement([FromBody] AnnouncementDTO input)
        {
            if (input == null || string.IsNullOrEmpty(input.Content))
            {
                return BadRequest("Announcement content is required.");
            }

            var announcement = new TblAnnouncement
            {
                Content = input.Content,
                Subject = input.Subject,
                Date = DateTime.UtcNow,
                Id = _random.Next(1, int.MaxValue)
            };


            db.TblAnnouncements.Add(announcement);
            db.SaveChanges();

             await WebSocketHandler.BroadcastMessageAsync("הודעה חדשה");

            return Ok(announcement);
        }


        [HttpGet]
        [Route("GetAllAnnouncements")]
        public IActionResult GetAnnouncements()
        {
            var announcements = db.TblAnnouncements.ToList();
            if (announcements == null)
            {
                return NotFound("No announcements found.");
            }

            return Ok(announcements);
        }
        [HttpGet]
        [Route("GetAnnouncementById/{id}")]
        public ActionResult<TblAnnouncement> GetActivityById(int id)
        {

            var announcement = db.TblAnnouncements.Find(id);
            return Ok(announcement);
        }


        [HttpPut]
        [Route("EditAnnouncement")]
        public IActionResult EditAnnouncement([FromBody] AnnouncementDTO announcementInput)
        {
            try
            {
                if (announcementInput == null)
                {
                    return BadRequest("Announcement input is null");
                }

                var announcement = new TblAnnouncement
                {
                    Id = announcementInput.Id,
                    Subject = announcementInput.Subject,
                    Content = announcementInput.Content,
                    Date = DateTime.UtcNow

                };

                // Add the user to the context
                db.TblAnnouncements.Update(announcement);

                // Save changes to the database
                db.SaveChanges();

                return Ok("Announcement Edited successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete]
        [Route("DeleteAnnouncement/{id}")]
        public IActionResult DeleteActivity(int id)
        {
            try
            {

                var entityToDelete = new TblAnnouncement { Id = id };
                db.TblAnnouncements.Attach(entityToDelete);
                db.TblAnnouncements.Remove(entityToDelete);
                db.SaveChanges();


                return Ok("Announcement Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
