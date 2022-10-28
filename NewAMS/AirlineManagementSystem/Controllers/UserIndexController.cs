using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Controllers.UserControllers
{
    public class UserIndexController : Controller
    {
        // GET: UserIndex
        public ActionResult Index()
        {
            return View();
        }
    }
}