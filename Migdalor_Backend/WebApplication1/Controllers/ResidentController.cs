using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplication1.DTO;
using WebApplication1.MailService;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ResidentController : ControllerBase
    {

        IMailService Mail_Service = null;

        MigdalorContext db = new MigdalorContext();

        public ResidentController(IMailService _MailService)
        {
            Mail_Service = _MailService;

        }


        [HttpPost]
        [Route("AddResident")]
        public IActionResult AddResident([FromBody] ResidentDTO userInput)
        {
            try
            {
                if (userInput == null)
                {
                    return BadRequest("User input is null");
                }

                // Check if the username already exists
                if (db.TblResidents.Any(u => u.Username == userInput.Username))
                {
                    return BadRequest("Username already exists");
                }

                int randomResidentNumber = new Random().Next(0, 2147483647);

                var resident = new TblResident
                {
                    Id = randomResidentNumber,
                    Username = userInput.Username,
                    Password = userInput.Password,
                    FirstName = userInput.FirstName,
                    LastName = userInput.LastName,
                    PhoneNumber = userInput.PhoneNumber,
                    ResidentID = userInput.ResidentId,
                    DateOfBirth = userInput.DateOfBirth,
                    PreviousAddress = userInput.PreviousAddress,
                    Profession = userInput.Profession,
                    Email = userInput.Email
                };

                db.TblResidents.Add(resident);
                db.SaveChanges();

                var mailData = new MailData
                {
                    EmailToId = resident.Email,
                    EmailSubject = "ברוך הבא למגדולר",
                    EmailBody = $"הי, {resident.FirstName +" " + resident.LastName} \n" +
                    $"ברוך הבא למגדלור\n" +
                    $"פרטי ההזדהות במערכת\n" +
                    $"שם משתמש:\n" +
                    $" {resident.Username}\n" +
                    $"סיסמה: \n " +
                    $"{resident.Password}\n" +
                    $"בברכה,\n" +
                    $" צוות מגדלור",
                    EmailToName = resident.FirstName + " " +resident.LastName
                };


                Mail_Service.SendMail(mailData);

                return Ok("User added successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpGet]
        [Route("GetAllResidents")]

        public ActionResult<IEnumerable<TblResident>> GetResidents()
        {
            var residents = db.TblResidents.ToList();
            return Ok(residents);
        }

        [HttpGet]
        [Route("GetResidentById/{id}")]

        public ActionResult<TblResident> GetResident(int id)
        {
            var resident = db.TblResidents.Find(id);
            return Ok(resident);
        }


        [HttpPut]
        [Route("EditResident")]
        public IActionResult UpdateResident([FromBody] ResidentDTO residentInput)
        {

            try
            {
                var resident = new TblResident {
                Id = residentInput.Id,
                FirstName = residentInput.FirstName,
                LastName = residentInput.LastName,
                PhoneNumber = residentInput.PhoneNumber,
                CurrentAddress = residentInput.CurrentAddress,
                Profession = residentInput.Profession,
                ResidentID = residentInput.ResidentId,
                Email = residentInput.Email,
                Username = residentInput.Username,
                Password = residentInput.Password,
            };
            
                db.TblResidents.Update(resident);
                db.SaveChanges();

                return Ok(resident);


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
            
       

        [HttpDelete]
        [Route("DeleteResident/{id}")]
        public IActionResult DeleteResident(int id)
        {
            try
            {

                var entityToDelete = new TblResident { Id = id };
                db.TblResidents.Attach(entityToDelete);
                db.TblResidents.Remove(entityToDelete);
                db.SaveChanges();


                return Ok("Resident Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
