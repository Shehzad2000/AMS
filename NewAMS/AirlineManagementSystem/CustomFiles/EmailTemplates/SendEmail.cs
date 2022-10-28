using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Web;

namespace AirLineSystem.Controllers
{
    public class SendEmail
    {
        public static string sendemail(string ToEmail,string subject,string body)
        {
            try
            {
                MailMessage mail = new MailMessage();
                mail.To.Add(ToEmail);
                mail.From = new MailAddress("m.shehzad8642@gmail.com","Here is your fucking password keep secrret in your ass");
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;

                SmtpClient smtp = new SmtpClient();
                smtp.Host = "smtp.gmail.com";
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = new NetworkCredential("m.shehzad8642@gmail.com","Taichi555");
                smtp.Send(mail);
                smtp.EnableSsl = true;
                return "Email has been sent successfully";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }
    }
}