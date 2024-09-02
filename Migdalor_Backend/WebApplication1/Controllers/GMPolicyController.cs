using ClassLibrary1.Models;
using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class
        GMPolicyController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();

        [HttpGet("ReportedResidents")]
        public IActionResult GetResidentsWithGoodMorningPolicy()
        {
            try
            {
                var reportedResidents = (
                from GMPolicy in db.TblGoodMorningPolicies
                join resident in db.TblResidents
                on GMPolicy.ResidentNumber equals resident.Id
                where GMPolicy.Date == DateTime.Today
                select resident).ToList();

                return Ok(reportedResidents);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }

        }
        [HttpGet("ResidentsNotReported")]
        public IActionResult GetResidentsNotRepoortedWithGoodMorningPolicy()
        {
            try
            {
                var residentsNotReported = (
                  from resident in db.TblResidents
                  join reports in db.TblGoodMorningPolicies
                  on resident.Id equals reports.ResidentNumber into rr
                  from r in rr.DefaultIfEmpty()
                  where r == null 
                  select resident).ToList();

                return Ok(residentsNotReported);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");

            }

        }
        [HttpGet("CheckResidnent/{id}")]
        public IActionResult CheckIfResidentHasReportedGMP(int id)
        {
            try
            {
                var checkedIn = db.TblGoodMorningPolicies.Any(report =>
                                                                report.ResidentNumber == id &&
                                                                   report.Date == DateTime.Today);

                return Ok(checkedIn);

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }






        [HttpPost]
        public IActionResult UpdateGoodMorningPolicy([FromBody] GoodMorningPolicyDTO input)
        {
            try
            {
                var reportResident = new TblGoodMorningPolicy
                {
                    ResidentNumber = input.ResidentNumber,
                    Date = input.Date,
                };

                db.TblGoodMorningPolicies.Add(reportResident);
                db.SaveChanges();
                return Ok("Resident successfully registerd for GMP");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}

