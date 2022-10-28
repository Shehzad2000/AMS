using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AirlineManagementSystem.Models
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
        public JsonResult GetData(int?ID)
        {
            if (ID == null)
                return Json(RouteMainLogic.GetData(), JsonRequestBehavior.AllowGet);
            else
                return Json(RouteMainLogic.GetData().Find(x => x.RouteID.Equals(ID)),JsonRequestBehavior.AllowGet);
        }
    }
}