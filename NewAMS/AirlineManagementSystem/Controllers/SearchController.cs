using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers.UserControllers
{
    public class SearchController : Controller
    {
        // GET: Search
        public ActionResult SearchView()
        {
            return View();
        }
        public JsonResult FetchResult(int ID)
        {    
            return Json(ScheduleMainLogic.GetData(ID), JsonRequestBehavior.AllowGet);  
        }
        public JsonResult FetchResult()
        {
            return Json(ScheduleMainLogic.GetData(), JsonRequestBehavior.AllowGet);
        }
    }
}