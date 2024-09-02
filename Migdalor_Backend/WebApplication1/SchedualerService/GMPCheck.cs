
using Quartz;
using ClassLibrary1.Models;
using System.Text.Json;
using WebApplication1.MailService;

namespace WebApplication1.SchedualerService

{

    public class GMPCheck : IJob
    {
        private readonly IMailService _mailService;
        MigdalorContext db = new MigdalorContext();

        public GMPCheck(IMailService emailService)
        {
            _mailService = emailService;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            var residentsNotReported = (
               from resident in db.TblResidents
               join reports in db.TblGoodMorningPolicies
               on resident.Id equals reports.ResidentNumber into rr
               from r in rr.DefaultIfEmpty()
               where r == null || r.Date != DateTime.Today
               select resident).ToList();

            // Send emails to these residents
            foreach (var resident in residentsNotReported)
            {
                var mailData = new MailData
                {
                    EmailToId = resident.Email, // Assuming you have an Email field
                    EmailToName = resident.FirstName + " " + resident.LastName,
                    EmailSubject = "דיווח נוהל בוקר טוב",
                    EmailBody = $"היי {resident.FirstName + " " + resident.LastName},\n" +
                    $"טרם דיווחת נוהל בוקר טוב להיום.\n" +
                    $"\nנא לדווח במערכת הדיירים" +
                    $"\nתודה והמשך יום טוב" +
                    $"צוות מגדלור\n"
                };
                try
                {
                    _mailService.SendMail(mailData);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.ToString());
                }

            }

        }
    }
}