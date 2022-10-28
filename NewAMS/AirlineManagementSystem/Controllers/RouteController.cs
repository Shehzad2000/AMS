using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class RouteController : Controller
    {
        // GET: Route
        public ActionResult RouteView()
        {
            return View();
        }
        public JsonResult Route(BL_Route obj) 
        {
            return Json(RouteMainLogic.AddorUpdate(obj), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ID)
        {
            return Json(RouteMainLogic.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int? ID)
        {
            if (ID == null)
                return Json(RouteMainLogic.GetRouteName(), JsonRequestBehavior.AllowGet);
            else
                return Json(RouteMainLogic.GetData().Find(x => x.RouteID.Equals(ID)), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadCountry()
        {
            return Json(MainLogic.ListAll(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadCity(int ID)
        {
            return Json(CityMainLogic.GetData(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadAirport(int ID)
        {
            return Json(AirPortMainLogic.GetData(ID), JsonRequestBehavior.AllowGet);
        }

    }
}