using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class CityController : Controller
    {
        // GET: City
        public ActionResult Index()
        {
            return View();
        }

        
        public JsonResult City(BLCity obj)
        {
            return Json(CityMainLogic.AddorUpdate(obj), JsonRequestBehavior.AllowGet);
        }
        
        public JsonResult Delete(int ID)
        {
            return Json(CityMainLogic.Delete(ID),JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetData(int? ID)
        {
            if (ID == null)
                return Json(CityMainLogic.GetData(), JsonRequestBehavior.AllowGet);
            else 
            return Json(CityMainLogic.GetData().Find(x => x.CityID.Equals(ID)), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCities(int ID)
        {
            var data = CityMainLogic.GetData(ID);
            return Json(data, JsonRequestBehavior.AllowGet);
        }


    }
}