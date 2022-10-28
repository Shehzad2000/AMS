using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class BL_Schedule
    {
        public int ScheduleID { get; set; }
        public int AirLineID { get; set; }
        public int RouteID { get; set; }
        public DateTime DepartureTime { get; set; }
        public DateTime ArrivalTime { get; set; }
        public DateTime Date { get; set; }
        public int Status { get; set; }
        public string AirLineName { get; set; }
        public string RouteName { get; set; }
      
    }

    public class ScheduleMainLogic
    {
        static string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
        public static int AddOrUpdate(BL_Schedule obj)
        {
            int i;
            using(SqlConnection con=new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForSchedule", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                if (obj.ScheduleID > 0)
                    cmd.Parameters.AddWithValue("@Type", Types.Update);
                else
                    cmd.Parameters.AddWithValue("@Type", Types.Insert);
                cmd.Parameters.AddWithValue("@AirLineID", obj.AirLineID);
                cmd.Parameters.AddWithValue("@RouteID", obj.RouteID);
                cmd.Parameters.AddWithValue("@DepartureTime", obj.DepartureTime);
                cmd.Parameters.AddWithValue("@ArrivalTime", obj.ArrivalTime);
                cmd.Parameters.AddWithValue("@Date", obj.Date);
                cmd.Parameters.AddWithValue("@Status", obj.Status);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static int Delete(int ID)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForSchedule", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Delete);
                cmd.Parameters.AddWithValue("@ScheduleID", ID);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static List<BL_Schedule> GetData()
        {
            List<BL_Schedule> list = new List<BL_Schedule>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForSchedule", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_Schedule
                    {
                        ScheduleID = Convert.ToInt32(sdr["ScheduleID"]),
                        RouteID = Convert.ToInt32(sdr["RouteID"]),
                        AirLineID = Convert.ToInt32(sdr["AirLineID"]),
                        DepartureTime = Convert.ToDateTime(sdr["DepartureTime"]),
                        ArrivalTime = Convert.ToDateTime(sdr["ArrivalTime"]),
                        Date = Convert.ToDateTime(sdr["Date"]),
                        Status = Convert.ToInt32(sdr["Status"]),
                        
                    });
                }
                return list;
            }
        }
        public static List<BL_Schedule> GetData(int ID)
        {
            List<BL_Schedule> list = new List<BL_Schedule>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForSchedule", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                cmd.Parameters.AddWithValue("@RouteID", ID);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_Schedule
                    {
                        ScheduleID = Convert.ToInt32(sdr["ScheduleID"]),
                        RouteID=Convert.ToInt32(sdr["RouteID"]),
                        AirLineID=Convert.ToInt32(sdr["AirLineID"]),
                        AirLineName = Convert.ToString(sdr["AirLineName"]),
                        DepartureTime = Convert.ToDateTime(sdr["DepartureTime"]),
                        ArrivalTime = Convert.ToDateTime(sdr["ArrivalTime"]),
                        Date = Convert.ToDateTime(sdr["Date"]),
                        Status = Convert.ToInt32(sdr["Status"]),
                    });
                }
                return list;
            }
        }

    }
}