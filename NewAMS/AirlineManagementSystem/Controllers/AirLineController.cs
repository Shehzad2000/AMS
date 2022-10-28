using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class AirLineController : Controller
    {
        // GET: AirLine
        public ActionResult AirLineView()
        {
            return View();
        }
        public JsonResult AirLine(BL_AirLine obj)
        {
            return Json(AirLineMainLogic.AddorUpdate(obj), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(AirLineMainLogic.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int?ID)
        {
            if (ID == null)
                return Json(AirLineMainLogic.GetData(),JsonRequestBehavior.AllowGet);
            else
                return Json(AirLineMainLogic.GetData().Find(x => x.AirLineID.Equals(ID)), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetAirport()
        {
            return Json(AirPortMainLogic.GetData(), JsonRequestBehavior.AllowGet);
        }
    }
}