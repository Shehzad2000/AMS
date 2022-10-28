using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AirlineManagementSystem.Models;

namespace AirlineManagementSystem.Controllers
{
    public class ReservationAndFlightDetailController : Controller
    {
        // GET: ReservationAndFlightDetail
        public ActionResult ReservationAndFlightDetailView()
        {
            return View();
        }
        public JsonResult LoadData(int RID,int AID)
        {
            return Json(SearchReservationMainLogic.GetData(RID,AID),JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadRoute()
        {
            return Json(RouteMainLogic.GetRouteName(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult LoadAirLine()
        {
            return Json(AirLineMainLogic.GetData(), JsonRequestBehavior.AllowGet);
        }

    }
}