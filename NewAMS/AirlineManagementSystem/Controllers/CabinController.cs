using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class CabinController : Controller
    {
        // GET: Cabin
        public ActionResult CabinView()
        {
            return View();
        }
        public JsonResult Cabin(BLCabin obj)
        {
                return Json(CabinMainLogic.AddorUpdate(obj), JsonRequestBehavior.AllowGet); 
        }
        public JsonResult Delete(int ID)
        {
            return Json(CabinMainLogic.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int?ID)
        {
            if (ID == null)
                return Json(CabinMainLogic.GetData(), JsonRequestBehavior.AllowGet);
            else
                return Json(CabinMainLogic.GetData().Find(x => x.CabinID.Equals(ID)), JsonRequestBehavior.AllowGet);
        }

    }
}