using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;

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
        public IActionResult CreateAnnouncement([FromBody] AnnouncementDTO input)
        {
            if (input == null || string.IsNullOrEmpty(input.Content))
            {
                return BadRequest("Announcement content is required.");
            }

            var announcement = new TblAnnouncement
            {
                Content = input.Content,
                Date = DateTime.UtcNow,
                AnnouncementId = _random.Next(1, int.MaxValue)
            };

            
            db.TblAnnouncements.Add(announcement);
            db.SaveChanges();

            return Ok(announcement);
        }


        [HttpGet]
        [Route("GetAnnouncements")]
        public IActionResult GetAnnouncements()
        {
            var announcements = db.TblAnnouncements.ToList();
            if (announcements == null || !announcements.Any())
            {
                return NotFound("No announcements found.");
            }

            return Ok(announcements);
        }
    }
}
