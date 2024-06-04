using ClassLibrary1.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.DTO;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacilityController : ControllerBase
    {
        MigdalorContext db = new MigdalorContext();
        private static readonly Random _random = new Random();

        [HttpPost]
        [Route("CreateFacility")]
        public IActionResult CreateFacility([FromBody] FacilityDTO facility)
        {
            if (facility == null)
            {
                return BadRequest("Request body is null.");
            }

            var newFacility = new TblFacility
            {
                FacilityId = _random.Next(1, int.MaxValue),
                FacilityName = facility.FacilityName,
                OpeningHours = facility.OpeningHours,
                ClosingHours = facility.ClosingHours,
                OperatingDays = facility.OperatingDays,
                PhoneNumber = facility.PhoneNumber
            };

            db.TblFacilities.Add(newFacility);
            db.SaveChanges();

            return Ok(newFacility);
        }


        [HttpPut]
        [Route("UpdateFacility/{id}")]
        public IActionResult UpdateFacility(int id, [FromBody] FacilityDTO updateDto)
        {
            if (updateDto == null)
            {
                return BadRequest("Request body is null.");
            }

            var facility = db.TblFacilities.FirstOrDefault(f => f.FacilityId == id);
            if (facility == null)
            {
                return NotFound($"Facility with ID {id} not found.");
            }

            if (updateDto.FacilityName != null) facility.FacilityName = updateDto.FacilityName;
            if (updateDto.OpeningHours.HasValue) facility.OpeningHours = updateDto.OpeningHours.Value;
            if (updateDto.ClosingHours.HasValue) facility.ClosingHours = updateDto.ClosingHours.Value;
            if (updateDto.OperatingDays != null) facility.OperatingDays = updateDto.OperatingDays;
            if (updateDto.PhoneNumber != null) facility.PhoneNumber = updateDto.PhoneNumber;

            db.SaveChanges();

            return Ok(facility);
        }



        [HttpGet]
        [Route("GetAllFacilities")]
        public IActionResult GetAllFacilities()
        {
            var facilities = db.TblFacilities.ToList();
            if (facilities == null || !facilities.Any())
            {
                return NotFound("No facilities found.");
            }

            return Ok(facilities);
        }
    }
}
