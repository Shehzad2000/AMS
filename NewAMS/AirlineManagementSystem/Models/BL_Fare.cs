using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class BL_Fare
    {
        public int FareID { get; set; }
        public int RouteID { get; set; }
        public int CabinID { get; set; }
        public decimal Fare { get; set; }
    
    }
    public class FareMainLogic
    {
        static string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
        public static int AddorUpdate(BL_Fare obj)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForFare", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                if (obj.FareID == 0)
                    cmd.Parameters.AddWithValue("@Type", Types.Insert);
                else
                    cmd.Parameters.AddWithValue("@Type", Types.Update);
                cmd.Parameters.AddWithValue("@FareID", obj.FareID);
                cmd.Parameters.AddWithValue("@RouteID", obj.RouteID);
                cmd.Parameters.AddWithValue("@CabinID", obj.CabinID);
                cmd.Parameters.AddWithValue("@Fare", obj.Fare);
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
                SqlCommand cmd = new SqlCommand("sp_ForFare", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Delete);
                cmd.Parameters.AddWithValue("@FareID", ID);
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static List<BL_Fare> GetData()
        {
            List<BL_Fare> list = new List<BL_Fare>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForFare", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_Fare
                    {
                        FareID = Convert.ToInt32(sdr["FareID"]),
                        RouteID = Convert.ToInt32(sdr["RouteID"]),
                        CabinID = Convert.ToInt32(sdr["CabinID"]),
                        Fare = Convert.ToDecimal(sdr["Fare"]),

                    });
                }
            }
            return list;

        }

        public static List<BL_Fare> GetData(int ID)
        {
            List<BL_Fare> list = new List<BL_Fare>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForFare", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                cmd.Parameters.AddWithValue("@CabinID", ID);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_Fare
                    {
                        FareID = Convert.ToInt32(sdr["FareID"]),
                        RouteID = Convert.ToInt32(sdr["RouteID"]),
                        CabinID = Convert.ToInt32(sdr["CabinID"]),
                        Fare = Convert.ToDecimal(sdr["Fare"]),

                    });
                }
            }
            return list;

        }

    }
}