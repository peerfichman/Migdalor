﻿using Microsoft.AspNetCore.Mvc;
using WebApplication1.MailService;

namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MailController : ControllerBase
    {
        IMailService Mail_Service = null;
        //injecting the IMailService into the constructor
        public MailController(IMailService _MailService)
        {
            Mail_Service = _MailService;
        }
        [HttpPost]
        public bool SendMail(MailData Mail_Data)
        {
            return Mail_Service.SendMail(Mail_Data);
        }
    }
}
