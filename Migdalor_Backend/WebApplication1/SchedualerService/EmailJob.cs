using Quartz;
using System.Text.Json;
using WebApplication1.MailService;

namespace WebApplication1.SchedualerService
{
    public class EmailJob : IJob
    {

        private readonly IMailService _mailService;

        public EmailJob(IMailService emailService)
        {
            _mailService = emailService;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var mailDataJson = context.MergedJobDataMap.GetString("mailData");

            // Deserialize the JSON string to a MailData object
            var mailData = JsonSerializer.Deserialize<MailData>(mailDataJson);


            // Send the email using MailKit
            try
            {
                // Use the injected email service to send the email
                 _mailService.SendMail(mailData);
            }
            catch (Exception ex)
            {
                
                // Handle exceptions (e.g., log them)
            }
        }
    }
}
