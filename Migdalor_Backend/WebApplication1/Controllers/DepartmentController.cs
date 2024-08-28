using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ClassLibrary1.Models;
using WebApplication1.DTO;


namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase {
     Random random = new Random();
     MigdalorContext db = new MigdalorContext();

    [HttpGet]
    [Route("GetAllDepartments")]
    public ActionResult<IEnumerable<TblDepartment>> GetDepartments()
    {
        var departments = db.TblDepartments.ToList();
        return Ok(departments);
    }
    [HttpGet]
    [Route("GetDepartmentById/{id}")]
    public ActionResult<TblDepartment> GetActivityById(int id)
    {

        var department = db.TblDepartments.Find(id);
        return Ok(department);
    }


    [HttpPost]
    [Route("AddDepartment")]
    public IActionResult AddDepartment([FromBody] DepartmentDTO departmentInput)
    {
        try
        {
            if (departmentInput == null)
            {
                return BadRequest("Department input is null");
            }
                int randomDepartmentNumber = random.Next(0, 10001);

                var department = new TblDepartment
                {
                Id = randomDepartmentNumber,
                DepartmentName = departmentInput.DepartmentName,
                ManagerPhoneNumber = departmentInput.ManagerPhoneNumber,
                DepartmentManager = departmentInput.DepartmentManager,
                DepartmentDays = departmentInput.DepartmentDays,
                DepartmentHours = departmentInput.DepartmentHours,
                Description = departmentInput.Description,

            };

            // Add the user to the context
            db.TblDepartments.Add(department);

            // Save changes to the database
            db.SaveChanges();

            return Ok("Department added successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut]
    [Route("EditDepartment")]
    public IActionResult EditDepartment([FromBody] DepartmentDTO departmentInput)
    {
        try
        {
            if (departmentInput == null)
            {
                return BadRequest("Department input is null");
            }

                var department = new TblDepartment
                {
                    Id = departmentInput.Id,
                    DepartmentName = departmentInput.DepartmentName,
                    ManagerPhoneNumber = departmentInput.ManagerPhoneNumber,
                    DepartmentManager = departmentInput.DepartmentManager,
                    DepartmentDays = departmentInput.DepartmentDays,
                    DepartmentHours = departmentInput.DepartmentHours,
                    Description = departmentInput.Description,
                };

                // Add the user to the context
                db.TblDepartments.Update(department);

            // Save changes to the database
            db.SaveChanges();

            return Ok("Department Edited successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    [HttpDelete]
    [Route("DeleteDepartment/{id}")]
    public IActionResult DeleteDepartment(int id)
    {
        try
        {
 
            var entityToDelete = new TblDepartment { Id = id };
            db.TblDepartments.Attach(entityToDelete);
            db.TblDepartments.Remove(entityToDelete);
            db.SaveChanges();


            return Ok("Department Deleted successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}
}
