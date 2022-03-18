using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Net.Mail;
using BlogWebAPI.Dtos;

namespace BlogWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HelperController : ControllerBase
    {

        public HelperController()
        {

        }

        [HttpPost("SendContactEmail")]
        public IActionResult SendContactEmail(Contact contact)
        {
            MailMessage mailMessage = new MailMessage();
            
            mailMessage.From = new MailAddress("blog_97@outlook.com");
            mailMessage.To.Add("port_o@hotmail.com");
            mailMessage.Subject = contact.Subject;
            mailMessage.Body = contact.Message;
            mailMessage.IsBodyHtml = true;

            SmtpClient smtpClient = new SmtpClient();

            smtpClient.Credentials = new System.Net.NetworkCredential("blog_97@outlook.com", "Producer1");
            smtpClient.Host = "smtp-mail.outlook.com";
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;
            smtpClient.Send(mailMessage);

            return Ok();
            
        }


    }
}
