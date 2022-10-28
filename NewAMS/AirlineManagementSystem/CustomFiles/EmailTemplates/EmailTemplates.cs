using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AirLineSystem.Controllers
{
    public class EmailTemplates
    {
        public static string SendRegistrationEmail(string Name, string Username, string Email, string Password)
        {
            string EmailBody;
            EmailBody = @"Dear @Name,<br/>
            Your account has been created.<br/>
            User Name = <b>@Username</b><br/>
            Email = <b>@Email</b><br/>
            Password = <b>@Password<b><br/>
            This is auto generated email. Please don't reply,<br/>
            Thank you.";
            EmailBody.Replace("@Name", Name);
            EmailBody.Replace("@Username", Username);
            EmailBody.Replace("@Email", Email);
            EmailBody.Replace("@Password", Password);
            return SendEmail.sendemail(Email, "Email Confirmation", EmailBody);
        }
        public static void SendActivationLink(string Name, string Email)
        {
            string EmailBody;
            EmailBody = @"Dear @Name,<br/>
            Your account has been created.<br/>
            Please click on <a href='AccountActivation.aspx?Email=@Email'></a><br/>
            This is auto generated email. Please don't reply,<br/>
            Thank you.";
            EmailBody.Replace("@Name", Name);
            EmailBody.Replace("@Email", Email);
            SendEmail.sendemail(Email, "Email Confirmation", EmailBody);
        }
        public static void SendLeaveDetails(string LeaveID, string LeaveFrom, string LeaveTo, string LeaveType, string LeaveStatus, string EmployeeEmail)
        {
            string emailBody = string.Format(@"
            LeaveID is @LeaveID <br/>
            LeaveFrom is @LeaveFrom <br/>
            LeaveTo is @LeaveTo <br/>
            LeaveType is @LeaveType <br/>
            LeaveStatus is @LeaveStatus. <br/>");
            emailBody = emailBody.Replace("@LeaveID", LeaveID);
            emailBody = emailBody.Replace("@LeaveFrom", LeaveFrom);
            emailBody = emailBody.Replace("@LeaveTo", LeaveTo);
            emailBody = emailBody.Replace("@LeaveType", LeaveType);
            emailBody = emailBody.Replace("@LeaveStatus", LeaveStatus);
            emailBody = emailBody.Replace("@EmployeeEmail", EmployeeEmail);

            SendEmail.sendemail(EmployeeEmail, "Employee Leave Information", emailBody);
        }
    }
}