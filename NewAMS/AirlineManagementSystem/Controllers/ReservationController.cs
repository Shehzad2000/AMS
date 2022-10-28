using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class ReservationController : Controller
    {
        // GET: Reservation
        public ActionResult ReservationView()
        {
            return View();
        }
        public JsonResult Reservation(BL_Reservation obj)
        {
            return Json(ReservationMainLogic.AddorUpdate(obj), JsonRequestBehavior.AllowGet);
            //return Json("");
        }
        public JsonResult LoadRouteDt(int ID)
        {
          
            return Json(RouteMainLogic.SearchRoute(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadRouteDt1()
        {
            return Json(RouteMainLogic.SearchRoute(), JsonRequestBehavior.AllowGet);

        }
        public JsonResult LoadCabin()
        {
            return Json(CabinMainLogic.GetData(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadFare(int ID)
        {
            return Json(FareMainLogic.GetData(ID), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadShedule(int ID) 
        {
            return Json(ScheduleMainLogic.GetData(ID), JsonRequestBehavior.AllowGet);
        }
        
       
    }
}