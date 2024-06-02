using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GMPolicyController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();

        [HttpGet]
        public IActionResult GetResidentsWithGoodMorningPolicy()
        {
            var residents = db.TblResidents
                .Select(resident => new ResidentWithGoodMorningPolicy
                {
                    ResidentNumber = resident.ResidentNumber,
                    FirstName = resident.FirstName,
                    LastName = resident.LastName,
                    PhoneNumber = resident.PhoneNumber,
                    Id = resident.Id,
                    DateOfGoodMorningPolicy = db.TblGoodMorningPolicies
                .Where(gmp => gmp.ResidentNumber == resident.ResidentNumber)
                .Select(gmp => gmp.DateTime)
                .FirstOrDefault(),
                    HasGoodMorningPolicy = db.TblGoodMorningPolicies
                        .Any(gmp => gmp.ResidentNumber == resident.ResidentNumber)
                })
                .ToList();

            return Ok(residents);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateGoodMorningPolicy(int id, [FromBody] bool hasGoodMorningPolicy)
        {
            // 1. Retrieve the resident from the database based on the provided id
            var resident = db.TblResidents.FirstOrDefault(r => r.ResidentNumber == id);
            if (resident == null)
            {
                // 2. If the resident does not exist, return a 404 Not Found response
                return NotFound();
            }

            // 3. Retrieve any existing policy for the resident from the database
            var existingPolicy = db.TblGoodMorningPolicies.FirstOrDefault(gmp => gmp.ResidentNumber == id);

            // 4. If the new status is true (indicating the resident has a good morning policy)
            if (hasGoodMorningPolicy)
            {
                // 5. If no existing policy is found, add a new policy for the resident
                if (existingPolicy == null)
                {
                    db.TblGoodMorningPolicies.Add(new TblGoodMorningPolicy
                    {
                        ResidentNumber = id,
                        DateTime = DateTime.Now // Set the current date and time for the new policy
                    });
                }
            }
            
            db.SaveChanges();
            //Return a 204 No Content response to indicate successful completion of the operation
            return NoContent();
        }

    }
}
