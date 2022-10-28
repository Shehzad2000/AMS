using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class BL_Route
    {
        public int RouteID { get; set; }
        public int FromCountryID { get; set; }
        public int FromCity { get; set; }
        public int FromAirport { get; set; }
        public int ToCountry { get; set; }
        public int ToCity { get; set; }
        public int ToAirPort { get; set; }
        public int Status { get; set; }
        public string RouteName { get; set; }
        public string FromRoute { get; set; }
        public string ToRoute { get; set; }
    }
    public class RouteMainLogic
    {
        static string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
        public static int AddorUpdate(BL_Route obj)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForRoute", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                if (obj.RouteID == 0)
                    cmd.Parameters.AddWithValue("@Type", Types.Insert);
                else
                    cmd.Parameters.AddWithValue("@Type", Types.Update);
                cmd.Parameters.AddWithValue("@RouteID", obj.RouteID);
                cmd.Parameters.AddWithValue("@FromCountryID", obj.FromCountryID);
                cmd.Parameters.AddWithValue("@FromCity", obj.FromCity);
                cmd.Parameters.AddWithValue("@FromAirport", obj.FromAirport);
                cmd.Parameters.AddWithValue("@ToCountry", obj.ToCountry);
                cmd.Parameters.AddWithValue("@ToCity", obj.ToCity);
                cmd.Parameters.AddWithValue("@ToAirPort", obj.ToAirPort);
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
                SqlCommand cmd = new SqlCommand("sp_ForRoute", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Delete);
                cmd.Parameters.AddWithValue("@RouteID", ID);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static List<BL_Route> GetData()
        {
            List<BL_Route> list = new List<BL_Route>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForRoute", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_Route
                    {
                        RouteID = Convert.ToInt32(sdr["RouteID"]),
                        FromCountryID = Convert.ToInt32(sdr["FromCountryID"]),
                        FromCity = Convert.ToInt32(sdr["FromCity"]),
                        FromAirport = Convert.ToInt32(sdr["FromAirport"]),
                        ToCountry = Convert.ToInt32(sdr["ToCountry"]),
                        ToCity = Convert.ToInt32(sdr["ToCity"]),
                        ToAirPort = Convert.ToInt32(sdr["ToAirPort"]),
                        Status= Convert.ToInt32(sdr["Status"]),
                    });
                }
                return list;
            }
        }

        public static List<BL_Route> GetRouteName()
        {
            List<BL_Route> list = new List<BL_Route>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForRoute", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", 4);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_Route
                    {
                        RouteName = sdr["RouteName"].ToString(),
                        RouteID = Convert.ToInt32(sdr["RouteID"])

                    }) ;
                }
                return list;
            }
        }
        public static List<BL_Route> SearchRoute()
        {
            List<BL_Route> list = new List<BL_Route>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForRoute", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", 5);
             
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_Route
                    {
                        FromRoute = sdr["FromRoute"].ToString(),
                        RouteID = Convert.ToInt32(sdr["RouteID"]),
                       
                    });
                }
                return list;
            }
        }
        public static List<BL_Route> SearchRoute(int ID)
        {
            List<BL_Route> list = new List<BL_Route>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForRoute", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", 6);
                cmd.Parameters.AddWithValue("@RouteID", ID);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_Route
                    {
                        RouteID = Convert.ToInt32(sdr["RouteID"]),
                        ToRoute = sdr["ToRoute"].ToString()
                    });
                }
                return list;
            }
        }


    }


}