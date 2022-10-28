using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class AirPortController : Controller
    {
        // GET: AirPort
        public ActionResult AirPortView()
        {
            return View();
        }
        public JsonResult AirPort(BL_AirPort obj)
        {
            return Json(AirPortMainLogic.AddorUpdate(obj), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(AirPortMainLogic.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int?ID)
        {
            if (ID == null)
                return Json(AirPortMainLogic.GetData(), JsonRequestBehavior.AllowGet);
            else
                return Json(AirPortMainLogic.GetData().Find(x => x.AirPortID.Equals(ID)), JsonRequestBehavior.AllowGet);
        }
      
    }
}