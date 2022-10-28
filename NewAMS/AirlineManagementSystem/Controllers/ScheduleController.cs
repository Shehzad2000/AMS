using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class ScheduleController : Controller
    {
        // GET: Schedule
        public ActionResult ScheduleView()
        {
            return View();
        }
        public JsonResult Schedule(BL_Schedule obj)
        {
            return Json(ScheduleMainLogic.AddOrUpdate(obj), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(ScheduleMainLogic.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int? ID=null)
        {
            if (ID == null)
                return Json(ScheduleMainLogic.GetData(), JsonRequestBehavior.AllowGet);
            else
            {
                BL_Schedule obj = ScheduleMainLogic.GetData().Find(x => x.ScheduleID.Equals(ID));
                return Json(obj, JsonRequestBehavior.AllowGet);
            }
        }
        public JsonResult GetRoute()
        {
            return Json(RouteMainLogic.GetRouteName(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAirLine()
        {
            return Json(AirLineMainLogic.GetData(), JsonRequestBehavior.AllowGet);
        }
    }
}