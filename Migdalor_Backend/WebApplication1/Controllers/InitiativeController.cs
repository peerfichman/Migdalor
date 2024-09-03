using ClassLibrary1.Models;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InitiativeController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();
        Random random = new Random();

        [HttpGet]
        [Route("GetAllInitaitives")]
        public ActionResult<IEnumerable<TblInitiative>> GetInitiatives()
        {
            var initiative = db.TblInitiatives.ToList();
            return Ok(initiative);
        }


        [HttpGet]
        [Route("GetInitiativeById/{id}")]
        public ActionResult<TblInitiative> GetInitiativeById(int id)
        {

            var initiative = db.TblInitiatives.Find(id);
            return Ok(initiative);
        }


        [HttpPost]
        [Route("AddInitiative")]
        public IActionResult AddInitiative ([FromBody] InitiativeDTO initiativeInput)
        {
            try
            {
                if (initiativeInput == null)
                {
                    return BadRequest("Initiative input is null");
                }

                int randomInitiativeNumber = random.Next(0, 10001);

                var initiative = new TblInitiative
                {
                   InitiativeNumber = randomInitiativeNumber,
                   InitiativeName = initiativeInput.InitiativeName,
                   MaxParticipants = initiativeInput.MaxParticipants,
                    Location =initiativeInput.Location,
                    Date = initiativeInput.Date,
                    StartHour = initiativeInput.StartHour,
                    EndHour = initiativeInput.EndHour,  
                    InitiativeType = initiativeInput.InitiativeType,
                    InvitationDescription = initiativeInput.InvitationDescription,
                    ResidentNumber = initiativeInput.ResidentNumber,
                   };



                // Add the user to the context
                db.TblInitiatives.Add(initiative);

                // Save changes to the database
                db.SaveChanges();

                return Ok(initiative);
        }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

        [HttpPut]
        [Route("EditInitiative")]
        public IActionResult EditInitiative([FromBody] InitiativeDTO initiativeInput)
        {
            try
            {
                if (initiativeInput == null)
                {
                    return BadRequest("Activity input is null");
                }

                var initiative = new TblInitiative
                {

                    InitiativeNumber = initiativeInput.InitiativeNumber,
                    MaxParticipants = initiativeInput.MaxParticipants,
                    InitiativeName = initiativeInput.InitiativeName,
                    Location = initiativeInput.Location,
                    Date = initiativeInput.Date,
                    StartHour = initiativeInput.StartHour,
                    EndHour = initiativeInput.EndHour,
                    InitiativeType = initiativeInput.InitiativeType,
                    InvitationDescription = initiativeInput.InvitationDescription,
                    ResidentNumber = initiativeInput.ResidentNumber,
                };

                // Add the user to the context
                db.TblInitiatives.Update(initiative);

                // Save changes to the database
                db.SaveChanges();

                return Ok("Initiative Edited successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpDelete]
        [Route("DeleteInitiative/{id}")]
        public IActionResult DeleteInitiative(int id)
        {
            try
            {

                var entityToDelete = new TblInitiative { InitiativeNumber = id };
                db.TblInitiatives.Attach(entityToDelete);
                db.TblInitiatives.Remove(entityToDelete);
                db.SaveChanges();


                return Ok("Initiative Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPost]
        [Route("AddParticipantToInitiative")]
        public IActionResult AddParticipantToInitiative([FromBody] ResidentParticipatingInInitiativeDTO input)
        {
            try
            {

                if (input == null)
                {
                    return BadRequest("Input is null");
                }

                var participation = new TblResidentParticipatingInInitiative
                {
                    ResidentNumber = input.ResidentNumber,
                    InitiativeNumber = input.InitiativeNumber
                };

                db.TblResidentParticipatingInInitiatives.Add(participation);

                db.SaveChanges();

                return Ok("Participant added successfully to initiative");
        }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
    }

}

        [HttpDelete]
        [Route("RemoveParticipantFromInitiative")]
        public IActionResult RemoveParticipantFromInitiative([FromBody] ResidentParticipatingInInitiativeDTO input)
        {
            try
            {

                var entityToDelete = new TblResidentParticipatingInInitiative
                {
                    ResidentNumber = input.ResidentNumber,
                    InitiativeNumber = input.InitiativeNumber
                };
                db.TblResidentParticipatingInInitiatives.Attach(entityToDelete);
                db.TblResidentParticipatingInInitiatives.Remove(entityToDelete);
                db.SaveChanges();


                return Ok("Participant removed from initiative");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("GetParticiapntsInInitiative/{id}")]
        public IActionResult GetParticiapntsInInitiative(int id)
        {
            try
            {
                var participants = (from resident in db.TblResidents
                                    join residentInitaive in db.TblResidentParticipatingInInitiatives
                                    on resident.Id equals residentInitaive.ResidentNumber
                                    where residentInitaive.InitiativeNumber == id
                                    select resident).ToList();
                return Ok(participants);
            }
            catch(Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }

        [HttpGet]
        [Route("GetInitiativeResidentParticipating/{id}")]
        public IActionResult GetInitiativeResidentParticipating(int id)
        {
            try
            {
                var initatives = (from initative in db.TblInitiatives
                                  join residentInitiative in db.TblResidentParticipatingInInitiatives
                                  on initative.InitiativeNumber equals residentInitiative.InitiativeNumber
                                  where residentInitiative.ResidentNumber == id
                                  select initative).ToList();
                return Ok(initatives);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }
        }
    }
}
