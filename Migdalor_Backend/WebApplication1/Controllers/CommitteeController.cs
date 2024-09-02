using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CommitteeController : ControllerBase
    {

        MigdalorContext db = new MigdalorContext();
        [HttpGet]
        [Route("GetCommitteeById/{id}")]
        public ActionResult<TblResidentCommittee> GetCommitteeById(int id)
        {

            var committeeWithManager = (from committee in db.TblResidentCommittee
                                       join resident in db.TblResidents
                                       on committee.ResidentManager equals resident.Id
                                       where committee.CommitteeId == id // Filter by specific committee ID
                                       select new
                                       {
                                           Committee = committee,  // Select committee details
                                           ResidentManager = resident  // Select resident manager details
                                       }
                            ).FirstOrDefault();
            return Ok(committeeWithManager);
        }





        [HttpGet]
        [Route("GetAllCommittees")]

        public ActionResult<IEnumerable<TblResidentCommittee>> GetAllCommittees()
        {
            try
            {
                var committeesWithManagers = (
                         from committees in db.TblResidentCommittee
                          join residents in db.TblResidents
                          on committees.ResidentManager equals residents.Id
                          select new
                                {
                                     Committee = committees,  // or select specific fields from committees
                                     ResidentManager = residents  // or select specific fields from residents
                                  }
              ).ToList();


                return Ok(committeesWithManagers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }


        }

            [HttpPost]
        [Route("CreateCommittee")]
        public IActionResult CreateCommittee([FromBody] CommitteeDTO input)
        {
            try
            {
                if (input == null)
                {
                    return BadRequest("User input is null");
                }

   
                int randomCommitteeId= new Random().Next(0, 2147483647);

                var committee = new TblResidentCommittee
                {
                    CommitteeId = randomCommitteeId,
                    ResidentManager = input.ResidentManager,
                    CommitteeName = input.CommitteeName,
                    ResponsibilityDescription = input.ResponsibilityDescription
                };

                var addCommitteeManager = new TblResidentPartOfResidentCommittee
                {
                    CommitteeId = committee.CommitteeId,
                    ResidentNumber = committee.ResidentManager
                };

                db.TblResidentCommittee.Add(committee);
                db.TblResidentPartOfResidentCommittees.Add(addCommitteeManager);
                

                db.SaveChanges();

                return Ok(committee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpPut]
        [Route("EditCommittee")]
        public IActionResult EditCommittee([FromBody] CommitteeDTO input)
        {

            try
            {
                var committee = new TblResidentCommittee
                {
                    CommitteeId= input.CommitteeId,
                    ResponsibilityDescription= input.ResponsibilityDescription,
                    ResidentManager= input.ResidentManager,
                    CommitteeName= input.CommitteeName,
               
                };

                var addCommitteeManager = new TblResidentPartOfResidentCommittee
                {
                    CommitteeId = committee.CommitteeId,
                    ResidentNumber = committee.ResidentManager
                };

                db.TblResidentCommittee.Update(committee);
                db.TblResidentPartOfResidentCommittees.Add(addCommitteeManager); 
                db.SaveChanges();

                return Ok(committee);


            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
               
                }
        }



        [HttpDelete]
        [Route("DeleteCommittee/{id}")]
        public IActionResult DeleteCommittee(int id)
        {
            try
            {

                var entityToDelete = new TblResidentCommittee { CommitteeId = id };
                db.TblResidentCommittee.Attach(entityToDelete);
                db.TblResidentCommittee.Remove(entityToDelete);
                db.SaveChanges();


                return Ok("Committee Deleted successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }







    }
}
