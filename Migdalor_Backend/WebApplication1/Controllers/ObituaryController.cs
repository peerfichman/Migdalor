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
        Random random = new Random();

        [HttpGet]
        [Route("GetAllObituaries")]
        public ActionResult<IEnumerable<TblObituary>> GetObituaries()
        {
            var obituaries = db.TblObituaries.ToList();
            return Ok(obituaries);
        }
        [HttpGet]
        [Route("GetObituaryById/{id}")]
        public ActionResult<TblActivity> GetActivityById(int id)
        {

            var obituary = db.TblObituaries.Find(id);
            return Ok(obituary);
        }


        [HttpPost]
        [Route("AddObituary")]
        public IActionResult AddActivity([FromBody] ObituaryDTO obituaryInput)
        {
          try
                {
                if (obituaryInput == null)
                {
                    return BadRequest("Obituary input is null");
                }

                int randomObituaryNumber = random.Next(0, 10001);

                var obituary = new TblObituary
                {
                    ObituaryNumber = randomObituaryNumber,
                    Date = obituaryInput.Date,
                    DeceasedName = obituaryInput.DeceasedName,
                    CemeteryName = obituaryInput.CemeteryName,
                    ResidentId = obituaryInput.ResidentId,
                    ShivaAddress = obituaryInput.ShivaAddress,
                    Description = obituaryInput.Description,

                };

                db.TblObituaries.Add(obituary);

                db.SaveChanges();

             return Ok("Obituary added successfully");
           }
           catch (Exception ex)
           {
               return StatusCode(500, $"Internal server error: {ex.Message}");
           }
        }

        [HttpPut]
        [Route("EditObituary")]
        public IActionResult EditActivity([FromBody] ObituaryDTO obituaryInput)
        {
            try
            {
                if (obituaryInput == null)
                {
                    return BadRequest("Obituary input is null");
                }

                var obituary = new TblObituary
                {
                    ObituaryNumber = obituaryInput.ObituaryNumber,
                    Date = obituaryInput.Date,
                    DeceasedName = obituaryInput.DeceasedName,
                    CemeteryName = obituaryInput.CemeteryName,
                    ResidentId = obituaryInput.ResidentId,
                    ShivaAddress = obituaryInput.ShivaAddress,
                    Description = obituaryInput.Description,
                };

                // Add the user to the context
                db.TblObituaries.Update(obituary);

                // Save changes to the database
                db.SaveChanges();

                return Ok("Obituary Edited successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete]
        [Route("DeleteObituary/{id}")]
        public IActionResult DeleteObituary(int id)
        {
            try
            {

                var entityToDelete = new TblObituary { ObituaryNumber = id };
                db.TblObituaries.Attach(entityToDelete);
                db.TblObituaries.Remove(entityToDelete);
                db.SaveChanges();


                return Ok("Activity Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

