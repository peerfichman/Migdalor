using Microsoft.AspNetCore.Mvc;
using WebApplication1.MailService;
using Quartz;
using System.Text.Json;
using WebApplication1.SchedualerService;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MailController : ControllerBase
    {
        private readonly ISchedulerFactory _schedulerFactory;
        IMailService Mail_Service = null;
        //injecting the IMailService into the constructor
        public MailController(IMailService _MailService, ISchedulerFactory schedulerFactory) 
        {
            Mail_Service = _MailService;
            _schedulerFactory = schedulerFactory;

        }
        [HttpPost("SendMail")]
        public bool SendMail(MailData Mail_Data)
        {
            return Mail_Service.SendMail(Mail_Data);
        }
        [HttpPost("SchedualMail")]
        public async Task<IActionResult> ScheduleEmail([FromBody] EmailRequest request)
        {
            var scheduler = await _schedulerFactory.GetScheduler();

            // Convert EmailRequest to MailData
            var mailData = new MailData
            {
                EmailToId = request.Email,
                EmailSubject = request.Subject,
                EmailBody = request.Body,
                EmailToName = request.EmailToName,
            };

            // Serialize the MailData object to JSON
            var mailDataJson = JsonSerializer.Serialize(mailData);

            // Define the job and pass the serialized MailData JSON string as a parameter
            var job = JobBuilder.Create<EmailJob>()
                .UsingJobData("mailData", mailDataJson)
                .WithIdentity("EmailJob", "EmailGroup")
                .Build();

            // Define the trigger to execute the job at the specified time
            var trigger = TriggerBuilder.Create()
                .WithIdentity("EmailJobTrigger", "EmailGroup")
                .StartAt(request.ExecutionTime)
                .Build();

            await scheduler.ScheduleJob(job, trigger);

            return Ok("Email scheduled successfully!");
        }
    }

    public class EmailRequest
    {
        public string Email { get; set; }
        public string EmailToName { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public DateTime ExecutionTime { get; set; }
    }
}

