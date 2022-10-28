using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace AirlineManagementSystem.Models
{
    public class BL_AirPort
    {
        public int AirPortID { get; set; }
        public int CountryID { get; set; }
        public int CityID { get; set; }
        public string AirPortName { get; set; }
    }
    public class AirPortMainLogic
    {
        static string cs = ConfigurationManager.ConnectionStrings["con"].ConnectionString;
        public static int AddorUpdate(BL_AirPort obj)
        {
            int i;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForAirPort", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                if (obj.AirPortID == 0)
                    cmd.Parameters.AddWithValue("@Type", Types.Insert);
                else
                    cmd.Parameters.AddWithValue("@Type", Types.Update);
                cmd.Parameters.AddWithValue("@AirPortID", obj.AirPortID);
                cmd.Parameters.AddWithValue("@CountryID", obj.CountryID);
                cmd.Parameters.AddWithValue("@CityID", obj.CityID);
                cmd.Parameters.AddWithValue("@AirPortName", obj.AirPortName);
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
                SqlCommand cmd = new SqlCommand("sp_ForAirPort", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Delete);
                cmd.Parameters.AddWithValue("@AirPortID", ID);
                con.Open();
                i = cmd.ExecuteNonQuery();
            }
            return i;
        }
        public static List<BL_AirPort> GetData()
        {
            List<BL_AirPort> list = new List<BL_AirPort>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForAirPort", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_AirPort
                    {
                        AirPortID = Convert.ToInt32(sdr["AirPortID"]),
                        CountryID = Convert.ToInt32(sdr["CountryID"]),
                        CityID = Convert.ToInt32(sdr["CityID"]),
                        AirPortName = Convert.ToString(sdr["AirPortName"]),
                       
                    });
                }
            }
            return list;

        }
        public static List<BL_AirPort> GetData(int ID)
        {
            List<BL_AirPort> list = new List<BL_AirPort>();
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("sp_ForAirPort", con);
                cmd.CommandType = System.Data.CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Type", Types.Select);
                cmd.Parameters.AddWithValue("@CityID", ID);
                con.Open();
                SqlDataReader sdr = cmd.ExecuteReader();
                while (sdr.Read())
                {
                    list.Add(new BL_AirPort
                    {
                        AirPortID = Convert.ToInt32(sdr["AirPortID"]),
                        CountryID = Convert.ToInt32(sdr["CountryID"]),
                        CityID = Convert.ToInt32(sdr["CityID"]),
                        AirPortName = Convert.ToString(sdr["AirPortName"]),

                    });
                }
            }
            return list;

        }
    }
}