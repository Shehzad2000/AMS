using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class CountryController : Controller
    {
        // GET: Country
        public ActionResult CountryView()
        {
            return View();
        }

        public JsonResult Country(BLCountry obj)
        {
            if (obj.CountryID==0)
                return Json(MainLogic.AddAndUpdate(obj), JsonRequestBehavior.AllowGet);
            else
                return Json(MainLogic.AddAndUpdate(obj), JsonRequestBehavior.AllowGet);

        }
      

        public JsonResult Delete(int ID)
        {
            return Json(MainLogic.Delete(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int? ID)
        {
            if (ID>0)
                return Json(MainLogic.ListAll().Find(x => x.CountryID.Equals(ID)), JsonRequestBehavior.AllowGet);
            else
                return Json(MainLogic.ListAll(), JsonRequestBehavior.AllowGet);
        }

    }
}