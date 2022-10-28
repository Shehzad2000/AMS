using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class FareController : Controller
    {
        // GET: Fare
        public ActionResult FareView()
        {
            return View();
        }
        public JsonResult Fare(BL_Fare obj)
        {
            return Json(FareMainLogic.AddorUpdate(obj), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(FareMainLogic.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int?ID)
        {
            if (ID == null)
                return Json(FareMainLogic.GetData(), JsonRequestBehavior.AllowGet);
            else
                return Json(FareMainLogic.GetData().Find(x=>x.FareID.Equals(ID)), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadRoute()
        {
            return Json(RouteMainLogic.GetRouteName(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadCabin()
        {
            return Json(CabinMainLogic.GetData(), JsonRequestBehavior.AllowGet);
        }
    }
}