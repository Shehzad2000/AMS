using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class BL_AirLine
    {
        public int AirLineID { get; set; }
        public string AirLineName { get; set; }
        public int AirPortID { get; set; }

        public int BusinessSeat { get; set; }
        public int EconomicSeat { get; set; }
        public int Status { get; set; }
    }
    public class AirLineMainLogic
    {

        static string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
        public static int AddorUpdate(BL_AirLine obj)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForAirLIne", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                if (obj.AirLineID == 0)
                    cmd.Parameters.AddWithValue("@Type", Types.Insert);
                else
                    cmd.Parameters.AddWithValue("@Type", Types.Update);
                cmd.Parameters.AddWithValue("@AirLineID", obj.AirLineID);
                cmd.Parameters.AddWithValue("@AirLineName", obj.AirLineName);
                cmd.Parameters.AddWithValue("@AirPortID", obj.AirPortID);
                cmd.Parameters.AddWithValue("@BusinessSeat", obj.BusinessSeat);
                cmd.Parameters.AddWithValue("@EconomicSeat", obj.EconomicSeat);
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
                SqlCommand cmd = new SqlCommand("sp_ForAirLIne", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Delete);
                cmd.Parameters.AddWithValue("@AirLineID", ID);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static List<BL_AirLine> GetData()
        {
            List<BL_AirLine> list = new List<BL_AirLine>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForAirLine", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_AirLine
                    {
                        AirLineID = Convert.ToInt32(sdr["AirLineID"]),
                        AirPortID = Convert.ToInt32(sdr["AirPortID"]),
                        AirLineName = sdr["AirLineName"].ToString(),
                        BusinessSeat = Convert.ToInt32(sdr["BusinessSeat"]),
                        EconomicSeat = Convert.ToInt32(sdr["EconomicSeat"]),
                        Status = Convert.ToInt32(sdr["Status"])

                    }) ;
                }
            }
            return list;

        }

    }
}